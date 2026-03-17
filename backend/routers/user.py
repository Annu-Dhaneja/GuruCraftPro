from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from pydantic import BaseModel
from typing import Optional
from core import auth, database, models

from services.user import user_service

router = APIRouter()


# ── Schemas ──────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    username: str
    password: str
    name: Optional[str] = None
    email: Optional[str] = None


# ── Auth Routes ──────────────────────────────────────────────────────

@router.get("/login")
def login_get_guide():
    return {"message": "Login endpoint is active. Use POST with username & password."}


@router.post("/login")
async def login_for_access_token(
    db: Session = Depends(database.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    try:
        user = user_service.authenticate_user(
            db, form_data.username, form_data.password
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = auth.create_access_token(
            data={"sub": user.username},
            expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return {"access_token": token, "token_type": "bearer"}

    except HTTPException:
        raise
    except Exception as exc:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {exc}",
        )


@router.post("/signup")
async def signup(
    body: SignupRequest,
    db: Session = Depends(database.get_db),
):
    """Create a new user account."""
    try:
        # Check if username already exists
        existing = db.query(models.User).filter(models.User.username == body.username).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken",
            )

        # Check if email already exists (if provided and not empty)
        if body.email:
            existing_email = db.query(models.User).filter(models.User.email == body.email).first()
            if existing_email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered",
                )

        # Create user
        hashed = auth.get_password_hash(body.password)
        new_user = models.User(
            username=body.username,
            hashed_password=hashed,
            name=body.name or body.username,
            email=body.email if body.email else None,
            role="admin",
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Auto-login: return token
        token = auth.create_access_token(
            data={"sub": new_user.username},
            expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return {
            "access_token": token,
            "token_type": "bearer",
            "message": f"Account '{body.username}' created successfully",
        }

    except HTTPException:
        raise
    except Exception as exc:
        db.rollback()
        import traceback
        traceback.print_exc()
        
        # Diagnostic logging (server-side only, will be in Render logs)
        try:
            p_len = len(body.password) if body.password else 0
            p_bytes = len(body.password.encode('utf-8')) if body.password else 0
            print(f"SIGNUP ERROR DIAGNOSTIC: uname={body.username}, p_len={p_len}, p_bytes={p_bytes}, error={exc}")
        except:
            pass
            
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Signup failed: {exc}",
        )


@router.get("/users")
async def list_users(db: Session = Depends(database.get_db)):
    return db.query(models.User).all()
