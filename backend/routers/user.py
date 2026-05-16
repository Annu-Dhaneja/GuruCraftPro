from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from typing import Optional, List
from jose import JWTError, jwt

from core import auth, database, models
from schemas import user as user_schemas
from services.user import user_service
from core.config import settings

router = APIRouter()

@router.post("/login")
async def login_for_access_token(
    response: Response,
    db: Session = Depends(database.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    # Throttling
    auth.throttle_login(form_data.username)
    
    user = user_service.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        auth.record_login_failure(form_data.username)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Clear throttling on success
    auth.clear_login_attempts(form_data.username)

    access_token = auth.create_access_token(
        data={"sub": user.username, "role": user.role}
    )
    refresh_token = auth.create_refresh_token(
        data={"sub": user.username}
    )

    # Set Secure HttpOnly Cookies
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=True # Set to False for local dev if not using https
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=7 * 24 * 60 * 60, # 7 days
        samesite="lax",
        secure=True
    )

    return {
        "access_token": access_token, 
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "username": user.username,
            "name": user.name,
            "role": user.role
        }
    }

@router.post("/refresh")
async def refresh_token(
    request: Request,
    response: Response,
    db: Session = Depends(database.get_db)
):
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")

    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        username = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    new_access_token = auth.create_access_token(data={"sub": user.username, "role": user.role})
    
    response.set_cookie(
        key="access_token",
        value=f"Bearer {new_access_token}",
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=True
    )

    return {"access_token": new_access_token, "token_type": "bearer"}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    body: user_schemas.UserCreate,
    db: Session = Depends(database.get_db),
):
    existing = db.query(models.User).filter(models.User.username == body.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")

    if body.email:
        existing_email = db.query(models.User).filter(models.User.email == body.email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already registered")

    user_count = db.query(models.User).count()
    
    # SECURITY RULE 1: Default Role = USER
    assigned_role_name = "USER"
    is_approved = False

    # First user = SUPER_ADMIN (Bootstrap logic)
    if user_count == 0:
        assigned_role_name = "SUPER_ADMIN"
        is_approved = True # Bootstrap admin is auto-approved
    
    role_obj = db.query(models.Role).filter(models.Role.name == assigned_role_name).first()
    role_id = role_obj.id if role_obj else None

    hashed = auth.get_password_hash(body.password)
    new_user = models.User(
        username=body.username,
        hashed_password=hashed,
        name=body.name or body.username,
        email=body.email,
        role=assigned_role_name,
        role_id=role_id,
        is_approved=is_approved,
        created_at=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "status": "success",
        "message": f"Account created successfully as '{new_user.role}'. Approval pending." if not is_approved else "Super-Admin created.",
    }

@router.get("/users", response_model=List[user_schemas.UserOut])
async def list_users(
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(auth.require_admin)
):
    return db.query(models.User).all()

@router.get("/me", response_model=user_schemas.UserOut)
async def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# ── Admin Role & Approval APIs ──────────────────────────────────────

@router.post("/{user_id}/approve")
async def approve_user(
    user_id: int,
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(auth.require_super_admin)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_approved = True
    db.commit()
    return {"message": f"User {user.username} has been approved."}

@router.put("/{user_id}/role")
async def update_user_role(
    user_id: int,
    role_data: dict, # {"role": "ADMIN"}
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(auth.require_super_admin)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_role = role_data.get("role")
    if new_role not in ["SUPER_ADMIN", "ADMIN", "EDITOR", "USER"]:
        raise HTTPException(status_code=400, detail="Invalid role specified")
    
    user.role = new_role
    
    # Sync role_id if possible
    role_obj = db.query(models.Role).filter(models.Role.name == new_role.lower()).first()
    if role_obj:
        user.role_id = role_obj.id

    db.commit()
    return {"message": f"User {user.username} role updated to {new_role}."}
