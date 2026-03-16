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

def _truncate_password_bytes(password: str, max_bytes: int) -> str:
    if not password:
        return ""

    encoded = password.encode("utf-8")
    if len(encoded) <= max_bytes:
        return password

    truncated = encoded[:max_bytes]
    while truncated:
        try:
            return truncated.decode("utf-8")
        except UnicodeDecodeError:
            truncated = truncated[:-1]
    return ""

def verify_password(plain_password, hashed_password):
    if not hashed_password or not plain_password:
        return False

    # Support both existing truncated hashes and bcrypt's 72-byte limit.
    candidates = []
    for max_bytes in (72, 50, 40):
        candidate = _truncate_password_bytes(plain_password, max_bytes)
        if candidate and candidate not in candidates:
            candidates.append(candidate)

    try:
        for candidate in candidates:
            if pwd_context.verify(candidate, hashed_password):
                return True
        return False
    except Exception as e:
        if "72 bytes" in str(e):
            for candidate in candidates[1:]:
                if pwd_context.verify(candidate, hashed_password):
                    return True
            return False
        raise e

def get_password_hash(password):
    if not password:
        return None
    safe_pwd = _truncate_password_bytes(password, 72)
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
