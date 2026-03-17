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

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "b39883528b9a4c8a8e1e8e8e8e8e8e8e")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# SWITCHING TO pbkdf2_sha256 as the primary scheme to completely bypass 
# the bcrypt 72-byte limit that is persistently causing issues on production.
pwd_context = CryptContext(
    schemes=["pbkdf2_sha256", "bcrypt"], 
    deprecated="auto", 
    bcrypt__rounds=12,
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")


def _safe_password(password: str) -> str:
    """
    Truncate password if using bcrypt, but pbkdf2 doesn't need it.
    Providing a base truncation for safety in case of extreme input.
    """
    if not password:
        return ""
    
    # pbkdf2 doesn't have a 72-byte limit, so we can be much more generous.
    # We still truncate at 256 for basic DDoS/Memory protection.
    LIMIT = 256
    
    try:
        if len(password) <= LIMIT:
            return password
        return password[:LIMIT]
    except Exception:
        return password


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not plain_password or not hashed_password:
        return False
    
    # Handle the existing bcrypt hashes or new pbkdf2 hashes automatically
    # passlib will use the correct scheme based on the hash prefix
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception as e:
        print(f"Auth: Verification error: {e}")
        # Fallback for manual truncation if it's an old bcrypt hash and failing
        if hashed_password.startswith("$2"):
            try:
                return pwd_context.verify(plain_password[:71], hashed_password)
            except:
                return False
        return False


def get_password_hash(password: str) -> str:
    # This will now use pbkdf2_sha256 by default (first in schemes list)
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
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
