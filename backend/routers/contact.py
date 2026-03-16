from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.contact import ContactCreate, ContactResponse
from core.database import get_db
from core.models import ContactSubmission

from repositories.contact import contact_repository

router = APIRouter()

@router.post("/", response_model=ContactResponse)
async def submit_contact_form(contact: ContactCreate, db: Session = Depends(get_db)):
    """
    Handle new contact form submissions.
    """
    new_submission = ContactSubmission(**contact.dict())
    db_contact = contact_repository.create(db, new_submission)
    
    return {
        "id": db_contact.id,
        "message": "Thank you for reaching out! We received your request."
    }
