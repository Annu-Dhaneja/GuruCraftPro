from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from core.database import get_db
from core import models, auth
from schemas.base import AuditBase
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class ContactSubmissionRead(AuditBase):
    id: int
    name: str
    email: str
    company: Optional[str] = None
    inquiry_type: str
    message: str
    budget: Optional[str] = None
    deadline: Optional[str] = None
    attachment_url: Optional[str] = None

    class Config:
        from_attributes = True

from typing import Optional

@router.get("/submissions", response_model=List[ContactSubmissionRead])
async def get_contact_submissions(
    db: Session = Depends(get_db),
    admin: models.User = Depends(auth.require_admin)
):
    return db.query(models.ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).all()
