import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .database import get_db
from . import models

# SECRET_KEY should be kept secret in production, use environment variable
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "b39883528b9a4c8a8e1e8e8e8e8e8e8e") # Fallback for local
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

def verify_password(plain_password, hashed_password):
    if not hashed_password or not plain_password:
        return False
    
    # Bcrypt strictly limits password to 72 bytes. Some backends are even stricter.
    # We truncate to 50 bytes (very safe) to ensure no '72 byte' errors ever occur.
    try:
        # Use a very safe 50-byte truncation
        safe_pwd = plain_password.encode('utf-8')[:50].decode('utf-8', 'ignore')
        return pwd_context.verify(safe_pwd, hashed_password)
    except Exception as e:
        # Final fallback: if it still fails due to length, use even smaller slice
        if "72 bytes" in str(e):
            return pwd_context.verify(plain_password[:40], hashed_password)
        raise e

def get_password_hash(password):
    if not password:
        return None
    # Truncate to 50 bytes for perfect compatibility
    safe_pwd = password.encode('utf-8')[:50].decode('utf-8', 'ignore')
    return pwd_context.hash(safe_pwd)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user
