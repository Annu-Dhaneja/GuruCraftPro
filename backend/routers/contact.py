from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.contact import ContactCreate, ContactResponse
from core.database import get_db
from core.models import ContactSubmission

from repositories.contact import contact_repository

router = APIRouter()

from services.email_service import email_service
import asyncio

@router.post("/", response_model=ContactResponse)
async def submit_contact_form(contact: ContactCreate, db: Session = Depends(get_db)):
    """
    Handle new contact form submissions.
    """
    new_submission = ContactSubmission(**contact.dict())
    db_contact = contact_repository.create(db, new_submission)
    
    # Send email notification asynchronously
    asyncio.create_task(asyncio.to_thread(
        email_service.send_contact_notification,
        name=contact.name,
        email=contact.email,
        message_body=contact.message,
        inquiry_type=contact.inquiry_type
    ))

    return {
        "id": db_contact.id,
        "message": "Thank you for reaching out! We received your request."
    }
