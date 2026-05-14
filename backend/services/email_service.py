import smtplib
import os
import json
import urllib.request
import urllib.error
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional
import base64

class EmailService:
    def __init__(self):
        # SMTP Settings
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.sender_email = os.getenv("SMTP_EMAIL", "andad622@gmail.com")
        self.sender_password = os.getenv("SMTP_PASSWORD", "")
        self.recipient_email = os.getenv("SMTP_RECEIVER", "andad622@gmail.com")
        
        # Resend API Setting (Recommended for Vercel)
        self.resend_api_key = os.getenv("RESEND_API_KEY", "")
        
        if not self.resend_api_key and not self.sender_password:
            print("WARNING: Neither RESEND_API_KEY nor SMTP_PASSWORD is set! Email will fail.")

    def send_via_resend(self, subject: str, body: str, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None):
        """Sends email using Resend HTTP API (Bypasses Vercel SMTP blocking)"""
        url = "https://api.resend.com/emails"
        
        # Resend requires the sender email to be verified on their platform, 
        # usually something like 'onboarding@resend.dev' for testing, or a custom domain.
        # If using standard Resend testing, we use onboarding@resend.dev
        from_email = "onboarding@resend.dev"
        
        payload = {
            "from": f"GuruCraftPro Contact <{from_email}>",
            "to": [self.recipient_email],
            "subject": subject,
            "text": body
        }
        
        if attachment_filename and attachment_data:
            payload["attachments"] = [
                {
                    "filename": attachment_filename,
                    "content": base64.b64encode(attachment_data).decode('utf-8')
                }
            ]

        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={
            'Authorization': f'Bearer {self.resend_api_key}',
            'Content-Type': 'application/json'
        })
        
        try:
            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read().decode('utf-8'))
                print(f"Resend Email sent successfully. ID: {result.get('id')}")
                return True
        except urllib.error.HTTPError as e:
            error_info = e.read().decode('utf-8')
            print(f"Resend API Error: {e.code} - {error_info}")
            return False
        except Exception as e:
            print(f"Failed to send via Resend: {str(e)}")
            return False

    def send_via_smtp(self, subject: str, body: str, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None):
        """Standard SMTP email sending (May timeout on Vercel)"""
        message = MIMEMultipart()
        message["From"] = self.sender_email
        message["To"] = self.recipient_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))
        
        if attachment_filename and attachment_data:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment_data)
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f"attachment; filename= {attachment_filename}")
            message.attach(part)

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            clean_password = self.sender_password.replace(" ", "")
            server.login(self.sender_email, clean_password)
            text = message.as_string()
            server.sendmail(self.sender_email, self.recipient_email, text)
            server.quit()
            print(f"Email sent via SMTP successfully.")
            return True
        except Exception as e:
            error_msg = str(e)
            print(f"Failed to send via SMTP: {error_msg}")
            return False

    def send_contact_notification(self, name: str, email: str, message_body: str, inquiry_type: Optional[str] = None, company: Optional[str] = None, budget: Optional[str] = None, deadline: Optional[str] = None, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None):
        subject = f"New Project Request: {name}"
        if inquiry_type:
            subject += f" ({inquiry_type})"

        body = f"""
        New project request received:
        
        Name: {name}
        Email: {email}
        Company: {company or 'N/A'}
        Inquiry Type: {inquiry_type or 'N/A'}
        Budget: {budget or 'Not specified'}
        Timeline: {deadline or 'Not specified'}
        
        Project Brief:
        {message_body}
        """

        # Prioritize Resend if API key exists, otherwise fallback to SMTP
        if self.resend_api_key:
            print("Attempting to send email via Resend HTTP API...")
            return self.send_via_resend(subject, body, attachment_filename, attachment_data)
        else:
            print("Attempting to send email via SMTP...")
            return self.send_via_smtp(subject, body, attachment_filename, attachment_data)

email_service = EmailService()
