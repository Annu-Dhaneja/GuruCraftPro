from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Optional
from core.database import get_db
from core import models, auth
from schemas.base import AuditBase
from pydantic import BaseModel, EmailStr
from datetime import datetime

router = APIRouter()

class ContactSubmissionRead(AuditBase):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    inquiry_type: str
    message: str
    budget: Optional[str] = None
    deadline: Optional[str] = None
    attachment_url: Optional[str] = None
    page_source: Optional[str] = None
    status: str
    ip_address: Optional[str] = None
    device_metadata: Optional[str] = None

    class Config:
        from_attributes = True

class StatusUpdateRequest(BaseModel):
    status: str

class ReplyRequest(BaseModel):
    message: str

def _send_reply_background(to_email: str, name: str, original_message: str, reply_text: str):
    """Deliver the reply email from the email service in a background task."""
    try:
        from services.email_service import email_service
        subject = "RE: Your inquiry to GuruCraftPro"
        
        text_body = f"""
Hello {name},

Thank you for reaching out. Here is our reply regarding your recent inquiry:

{reply_text}

--------------------------------------------------
Your original message:
"{original_message}"
"""
        html_body = f"""
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
    <div style="text-align: center; margin-bottom: 25px;">
      <h1 style="color: #4f46e5; margin: 0; font-size: 28px; font-weight: 800; tracking-tighter: -0.05em; font-style: italic;">GURUCRAFT<span style="color: #312e81;">PRO</span></h1>
      <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: bold; margin-top: 5px;">Response to Inquiry</p>
    </div>
    
    <p style="font-size: 16px; margin-top: 0;">Hello <strong>{name}</strong>,</p>
    <p style="font-size: 16px; white-space: pre-wrap; background-color: #f5f3ff; border: 1px solid #c7d2fe; padding: 20px; border-radius: 8px; color: #1e1b4b; font-weight: 500;">{reply_text}</p>
    
    <div style="background-color: #f9fafb; border-left: 4px solid #9ca3af; padding: 15px; border-radius: 6px; margin: 20px 0; font-size: 14px; color: #4b5563;">
      <h4 style="margin-top: 0; margin-bottom: 5px; color: #374151;">Your Original Brief:</h4>
      <p style="margin: 0; font-style: italic;">"{original_message}"</p>
    </div>

    <p style="font-size: 16px; margin-bottom: 30px;">Best regards,<br><strong>GuruCraftPro Support</strong></p>
    
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 20px;">
    
    <div style="text-align: center; font-size: 12px; color: #9ca3af;">
      <p style="margin: 0;">&copy; {datetime.utcnow().year} GuruCraftPro. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
"""
        email_service.send_email_orchestrator(
            to_email=to_email,
            subject=subject,
            text_body=text_body,
            html_body=html_body
        )
    except Exception as e:
        print(f"Reply background dispatch error: {e}")

@router.get("/submissions", response_model=List[ContactSubmissionRead])
async def get_contact_submissions(
    db: Session = Depends(get_db),
    editor: models.User = Depends(auth.require_editor)
):
    """List all contact submissions, sorted newest first. Accessible to Admins and Editors."""
    return db.query(models.ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).all()

@router.put("/submissions/{id}/status", response_model=ContactSubmissionRead)
async def update_submission_status(
    id: int,
    request: StatusUpdateRequest,
    db: Session = Depends(get_db),
    editor: models.User = Depends(auth.require_editor)
):
    """Update workflow status of a lead submission."""
    submission = db.query(models.ContactSubmission).filter(models.ContactSubmission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    valid_statuses = ["new", "contacted", "closed", "spam"]
    if request.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")
        
    submission.status = request.status
    db.commit()
    db.refresh(submission)
    return submission

@router.delete("/submissions/{id}")
async def delete_submission(
    id: int,
    db: Session = Depends(get_db),
    editor: models.User = Depends(auth.require_editor)
):
    """Hard-delete or archive a submission."""
    submission = db.query(models.ContactSubmission).filter(models.ContactSubmission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
        
    db.delete(submission)
    db.commit()
    return {"message": f"Submission {id} has been deleted successfully."}

@router.post("/submissions/{id}/reply")
async def reply_to_submission(
    id: int,
    request: ReplyRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    editor: models.User = Depends(auth.require_editor)
):
    """Send a reply email to the submitter and update status to contacted."""
    submission = db.query(models.ContactSubmission).filter(models.ContactSubmission.id == id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
        
    # Queue email sending as a background task to prevent blocking
    background_tasks.add_task(
        _send_reply_background,
        to_email=submission.email,
        name=submission.name,
        original_message=submission.message,
        reply_text=request.message
    )
    
    # Mark status as contacted automatically
    submission.status = "contacted"
    db.commit()
    
    return {"message": "Reply email queued for delivery."}
