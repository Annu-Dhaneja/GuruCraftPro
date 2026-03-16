from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from core import auth, database, models

from services.user import user_service

router = APIRouter()

@router.post("/login")
async def login_for_access_token(
    db: Session = Depends(database.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = user_service.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users", summary="List All Administrative Users")
async def list_users(
    db: Session = Depends(database.get_db),
    # current_user: models.User = Depends(auth.get_current_active_user) # We need to ensure authentication is enforced
):
    """
    Retrieve a list of all administrative personnel registered in the database.
    """
    # For now, return all users. In production, we'd check if current_user.role == 'admin'
    return db.query(models.User).all()
