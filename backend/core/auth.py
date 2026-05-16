from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session, joinedload
import json
import time

from .database import get_db
from . import models
from .config import settings

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["pbkdf2_sha256", "bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login", auto_error=False)

# ── Login Throttling (In-Memory Simple Implementation) ────────────────
# In production, use Redis for this.
login_attempts: Dict[str, Dict[str, Any]] = {}

def throttle_login(username: str):
    now = time.time()
    attempt = login_attempts.get(username, {"count": 0, "last_attempt": 0})
    
    # If last attempt was more than 15 mins ago, reset
    if now - attempt["last_attempt"] > 900:
        attempt = {"count": 0, "last_attempt": 0}
        
    if attempt["count"] >= 50:
        # Wait 15 minutes after 5 failed attempts
        if now - attempt["last_attempt"] < 900:
             raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many failed login attempts. Please wait 15 minutes."
            )
            
    return attempt

def record_login_failure(username: str):
    attempt = login_attempts.get(username, {"count": 0, "last_attempt": 0})
    attempt["count"] += 1
    attempt["last_attempt"] = time.time()
    login_attempts[username] = attempt

def clear_login_attempts(username: str):
    if username in login_attempts:
        del login_attempts[username]

def reset_all_throttling():
    global login_attempts
    login_attempts = {}

# ── Password Utilities ────────────────────────────────────────────────

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# ── JWT Orchestration ─────────────────────────────────────────────────

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(
    request: Request,
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    # Support both Bearer token and Cookie-based Auth
    if not token:
        token = request.cookies.get("access_token")
        if token and token.startswith("Bearer "):
            token = token.replace("Bearer ", "")

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if not token:
        raise credentials_exception

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            raise credentials_exception
            
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = (
        db.query(models.User)
        .options(joinedload(models.User.role_rel))
        .filter(models.User.username == username)
        .first()
    )
    if user is None:
        raise credentials_exception
    return user

async def get_optional_user(
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[models.User]:
    try:
        return await get_current_user(request, token, db)
    except HTTPException:
        return None

# ── Authorization & RBAC ─────────────────────────────────────────────

def has_permission(user: models.User, module: str, action: str = "read") -> bool:
    if user.role == "SUPER_ADMIN":
        return True
    
    # Non-approved users have NO permissions beyond basic profile
    if not user.is_approved and user.role != "USER":
        return False

    if user.role_rel and user.role_rel.permissions_json:
        try:
            perms = json.loads(user.role_rel.permissions_json)
            module_perms = perms.get(module, [])
            return "*" in module_perms or action in module_perms
        except Exception:
            return False
            
    if user.role in ["ADMIN", "EDITOR"] and module in ["cms", "contact", "media", "dashboard"]:
        return True

    return False

async def require_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role not in ["ADMIN", "SUPER_ADMIN"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrative privileges required.",
        )
    if not current_user.is_approved:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin approval pending. Please contact system owner.",
        )
    return current_user

async def require_super_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "SUPER_ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super-Admin privileges required.",
        )
    if not current_user.is_approved:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Super-Admin approval pending.",
        )
    return current_user

async def require_editor(current_user: models.User = Depends(get_current_user)):
    if current_user.role not in ["EDITOR", "ADMIN", "SUPER_ADMIN"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Editor privileges required.",
        )
    return current_user

def require_permission(module: str, action: str = "read"):
    async def permission_checker(current_user: models.User = Depends(get_current_user)):
        if not has_permission(current_user, module, action):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied: Missing '{action}' permission for '{module}'.",
            )
        return current_user
    return permission_checker
