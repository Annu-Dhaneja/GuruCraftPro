from fastapi import APIRouter, HTTPException, Depends, Form, UploadFile, File, BackgroundTasks, Request
from sqlalchemy.orm import Session
from schemas.contact import ContactResponse
from core.database import get_db
from core.models import ContactSubmission
from repositories.contact import contact_repository
import os
import uuid
import time
from pathlib import Path
from typing import Dict, Tuple

router = APIRouter()

# In-memory rate limiting map: {ip: [(timestamp, count)]}
rate_limit_map: Dict[str, list] = {}

def is_rate_limited(ip: str) -> bool:
    """Return True if IP has made > 5 requests in the last 60 seconds."""
    now = time.time()
    if ip not in rate_limit_map:
        rate_limit_map[ip] = []
    
    # Filter out requests older than 60 seconds
    rate_limit_map[ip] = [t for t in rate_limit_map[ip] if now - t < 60]
    
    if len(rate_limit_map[ip]) >= 5:
        return True
    
    rate_limit_map[ip].append(now)
    return False

def _send_email_background(name: str, email: str, message: str, inquiry_type: str, company: str = None, budget: str = None, deadline: str = None, attachment_filename: str = None, attachment_data: bytes = None):
    """Run email sending in a background task safely catching exceptions."""
    try:
        from services.email_service import email_service
        # Send notification to admin
        admin_sent = email_service.send_contact_notification(
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
        print(f"Admin contact notification status: {admin_sent}")
        
        # Send auto-reply to user
        user_sent = email_service.send_user_confirmation(
            name=name,
            to_email=email,
            inquiry_type=inquiry_type,
            message_body=message
        )
        print(f"User confirmation auto-reply status: {user_sent}")
    except Exception as e:
        print(f"Background email task error: {e}")

@router.post("/", response_model=ContactResponse)
async def submit_contact_form(
    request: Request,
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    company: str = Form(None),
    inquiry_type: str = Form(...),
    message: str = Form(...),
    budget: str = Form(None),
    deadline: str = Form(None),
    page_source: str = Form(None),
    website: str = Form(None),  # Honeypot spam protection field
    attachment: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """
    Handle new contact form submissions with validation, honeypot protection,
    rate limiting, meta-tracking, and dual-alert email delivery.
    """
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    
    # 1. Rate Limiting Check
    if is_rate_limited(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Too many submissions. Please wait a moment before trying again."
        )

    # 2. Honeypot Spam Protection
    # If the hidden field 'website' is filled, it was submitted by a bot.
    # We save it to the DB with status 'spam' and skip email alerts to protect SMTP reputation.
    is_spam = bool(website and len(website.strip()) > 0)
    status_val = "spam" if is_spam else "new"

    new_submission = ContactSubmission(
        name=name,
        email=email,
        phone=phone,
        company=company,
        inquiry_type=inquiry_type,
        message=message,
        budget=budget,
        deadline=deadline,
        attachment_url=None,
        page_source=page_source,
        status=status_val,
        ip_address=client_ip,
        device_metadata=user_agent[:250]  # Truncate to fit column size safely
    )
    
    attachment_filename = None
    attachment_data = None
    
    if attachment and attachment.filename:
        upload_dir = Path("static/uploads/contact")
        upload_dir.mkdir(parents=True, exist_ok=True)
        
        file_extension = Path(attachment.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = upload_dir / unique_filename
        
        attachment_data = await attachment.read()
        
        try:
            with open(file_path, "wb") as f:
                f.write(attachment_data)
            new_submission.attachment_url = f"/images/uploads/contact/{unique_filename}"
        except Exception as e:
            print(f"Skipping disk save (likely Vercel/Read-only): {e}")
            new_submission.attachment_url = None
        
        attachment_filename = attachment.filename

    # Save to Database (Single Source of Truth)
    db_contact = contact_repository.create(db, new_submission)
    
    # 3. Trigger email dispatches only if NOT spam
    if not is_spam:
        # We queue it as a background task to keep API response times ultra-fast, 
        # but safely captured.
        background_tasks.add_task(
            _send_email_background,
            name=name,
            email=email,
            message=message,
            inquiry_type=inquiry_type,
            company=company,
            budget=budget,
            deadline=deadline,
            attachment_filename=attachment_filename,
            attachment_data=attachment_data
        )

    return {
        "id": db_contact.id,
        "message": "Thank you for reaching out! We received your request."
    }

@router.get("/test-smtp")
async def test_smtp_connection():
    """
    Debug endpoint to explicitly test SMTP credentials and connectivity.
    """
    try:
        from services.email_service import email_service
        import smtplib
        
        server = smtplib.SMTP(email_service.smtp_server, email_service.smtp_port, timeout=10)
        server.set_debuglevel(1)
        server.starttls()
        
        clean_password = email_service.sender_password.replace(" ", "")
        if not clean_password:
            return {"status": "error", "message": "SMTP_PASSWORD environment variable is MISSING!"}
            
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
            "hint": "Verify your credentials and mail settings."
        }
