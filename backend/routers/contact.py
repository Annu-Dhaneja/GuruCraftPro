from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas.contact import ContactCreate, ContactResponse
from core.database import get_db
from core.models import ContactSubmission
from repositories.contact import contact_repository
import asyncio
import threading

router = APIRouter()

def _send_email_background(name, email, message, inquiry_type):
    """Run email sending in a background thread so it doesn't block the response."""
    try:
        # Import here to ensure env vars are already loaded by main.py
        from services.email_service import EmailService
        svc = EmailService()
        svc.send_contact_notification(
            name=name,
            email=email,
            message_body=message,
            inquiry_type=inquiry_type
        )
    except Exception as e:
        print(f"Background email thread error: {e}")

@router.post("/", response_model=ContactResponse)
async def submit_contact_form(contact: ContactCreate, db: Session = Depends(get_db)):
    """
    Handle new contact form submissions.
    """
    new_submission = ContactSubmission(**contact.dict())
    db_contact = contact_repository.create(db, new_submission)
    
    # Fire-and-forget in a real background thread (safe, doesn't block response)
    thread = threading.Thread(
        target=_send_email_background,
        args=(contact.name, contact.email, contact.message, contact.inquiry_type),
        daemon=True
    )
    thread.start()

    return {
        "id": db_contact.id,
        "message": "Thank you for reaching out! We received your request."
    }
