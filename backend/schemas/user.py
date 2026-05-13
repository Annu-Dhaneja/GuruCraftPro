from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: str = "user"

class UserOut(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    password: str
    email: Optional[EmailStr] = None
    name: Optional[str] = None

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: Optional[str] = None
