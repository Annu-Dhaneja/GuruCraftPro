from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from schemas.contact import ContactResponse
from core.database import get_db
from core.models import ContactSubmission
from repositories.contact import contact_repository

router = APIRouter()

def _send_email_background(name: str, email: str, message: str, inquiry_type: str, attachment_filename: str = None, attachment_data: bytes = None):
    """Run email sending in a background task."""
    try:
        # Import here to ensure env vars are already loaded by main.py
        from services.email_service import email_service
        email_service.send_contact_notification(
            name=name,
            email=email,
            message_body=message,
            inquiry_type=inquiry_type,
            attachment_filename=attachment_filename,
            attachment_data=attachment_data
        )
    except Exception as e:
        print(f"Background email task error: {e}")

@router.post("/", response_model=ContactResponse)
async def submit_contact_form(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    company: str = Form(None),
    inquiry_type: str = Form(...),
    message: str = Form(...),
    budget: str = Form(None),
    deadline: str = Form(None),
    attachment: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """
    Handle new contact form submissions with optional multipart/form-data attachments.
    """
    new_submission = ContactSubmission(
        name=name,
        email=email,
        company=company,
        inquiry_type=inquiry_type,
        message=message,
        budget=budget,
        deadline=deadline
    )
    db_contact = contact_repository.create(db, new_submission)
    
    attachment_filename = None
    attachment_data = None
    if attachment and attachment.filename:
        attachment_filename = attachment.filename
        attachment_data = await attachment.read()
    
    # Use FastAPI BackgroundTasks for better life-cycle management
    background_tasks.add_task(
        _send_email_background,
        name, 
        email, 
        message, 
        inquiry_type, 
        attachment_filename, 
        attachment_data
    )

    return {
        "id": db_contact.id,
        "message": "Thank you for reaching out! We received your request."
    }
