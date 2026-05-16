from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from .base import AuditBase

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: str = "user"
    role_id: Optional[int] = None

class UserOut(UserBase, AuditBase):
    id: int

from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8)
    email: Optional[EmailStr] = None
    name: Optional[str] = None

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: Optional[str] = None
    role_id: Optional[int] = None
