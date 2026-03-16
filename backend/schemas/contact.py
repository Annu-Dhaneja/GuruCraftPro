from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    inquiry_type: str
    message: str
    budget: Optional[str] = None
    deadline: Optional[str] = None

class ContactResponse(BaseModel):
    id: int
    message: str
 