from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.database import get_db
from core.models import ContactSubmission, User
from core.auth import get_current_user
from pydantic import BaseModel
from datetime import datetime

from repositories.contact import contact_repository

router = APIRouter()

class ContactSubmissionSchema(BaseModel):
    id: int
    name: str
    email: str
    company: str | None
    inquiry_type: str
    message: str
    budget: str | None
    deadline: str | None
    created_at: datetime

    class Config:
        from_attributes = True

@router.get("/submissions", response_model=List[ContactSubmissionSchema])
async def get_contact_submissions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all contact form submissions. Protected by admin login.
    """
    return contact_repository.get_all(db)
