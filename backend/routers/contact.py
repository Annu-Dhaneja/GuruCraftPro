from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
from schemas.contact import ContactResponse
from core.database import get_db
from core.models import ContactSubmission
from repositories.contact import contact_repository
import os
import uuid
from pathlib import Path

router = APIRouter()

def _send_email_background(name: str, email: str, message: str, inquiry_type: str, company: str = None, budget: str = None, deadline: str = None, attachment_filename: str = None, attachment_data: bytes = None):
    """Run email sending in a background task."""
    try:
        # Import here to ensure env vars are already loaded by main.py
        from services.email_service import email_service
        email_service.send_contact_notification(
            name=name,
            email=email,
            message_body=message,
            inquiry_type=inquiry_type,
            company=company,
            budget=budget,
            deadline=deadline,
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
        deadline=deadline,
        attachment_url=None
    )
    
    attachment_filename = None
    attachment_data = None
    
    if attachment and attachment.filename:
        # Create upload directory if it doesn't exist
        upload_dir = Path("static/uploads/contact")
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        # Save file to disk
        file_extension = Path(attachment.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = upload_dir / unique_filename
        
        attachment_data = await attachment.read()
        
        # On Vercel/Serverless, the filesystem is read-only.
        # We try to save, but if it fails, we still send the email.
        try:
            with open(file_path, "wb") as f:
                f.write(attachment_data)
            new_submission.attachment_url = f"/images/uploads/contact/{unique_filename}"
            print(f"File saved to disk: {file_path}")
        except Exception as e:
            print(f"Skipping disk save (likely Vercel/Read-only): {e}")
            new_submission.attachment_url = None
        
        attachment_filename = attachment.filename

    db_contact = contact_repository.create(db, new_submission)
    
    # On Vercel, BackgroundTasks are unreliable because the function instance
    # might be killed immediately after the response is sent.
    # We send the email synchronously here to guarantee delivery.
    _send_email_background(
        name, 
        email, 
        message, 
        inquiry_type, 
        company,
        budget,
        deadline,
        attachment_filename, 
        attachment_data
    )

    return {
        "id": db_contact.id,
        "message": "Thank you for reaching out! We received your request."
    }

@router.get("/test-smtp")
async def test_smtp_connection():
    """
    Debug endpoint to explicitly test SMTP credentials and connectivity.
    This will reveal exactly why Vercel is failing to send emails.
    """
    try:
        from services.email_service import email_service
        import smtplib
        
        server = smtplib.SMTP(email_service.smtp_server, email_service.smtp_port, timeout=10)
        server.set_debuglevel(1)
        server.starttls()
        
        clean_password = email_service.sender_password.replace(" ", "")
        if not clean_password:
            return {"status": "error", "message": "SMTP_PASSWORD environment variable is MISSING on Vercel!"}
            
        server.login(email_service.sender_email, clean_password)
        server.quit()
        return {
            "status": "success", 
            "message": f"Successfully authenticated as {email_service.sender_email} on {email_service.smtp_server}:{email_service.smtp_port}"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "hint": "Check Vercel Environment Variables. If authentication failed, ensure you generated a Google App Password."
        }
