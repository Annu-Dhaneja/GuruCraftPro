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
        
        # HTTP Provider API Settings
        self.resend_api_key = os.getenv("RESEND_API_KEY", "")
        self.sendgrid_api_key = os.getenv("SENDGRID_API_KEY", "")
        self.postmark_api_key = os.getenv("POSTMARK_API_KEY", "")
        
        # Configurable FROM email address
        self.from_email = os.getenv("FROM_EMAIL", self.sender_email or "hello@gurucraftpro.com")
        
        if not any([self.resend_api_key, self.sendgrid_api_key, self.postmark_api_key, self.sender_password]):
            print("WARNING: No Email provider credentials (RESEND_API_KEY, SENDGRID_API_KEY, POSTMARK_API_KEY, SMTP_PASSWORD) are set. Email dispatch will fail.")

    def send_via_resend(self, to_email: str, subject: str, text_body: str, html_body: str, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None) -> bool:
        """Sends email using Resend HTTP API"""
        url = "https://api.resend.com/emails"
        
        # Use onboarding@resend.dev only if from_email is not configured or is placeholder
        from_addr = "onboarding@resend.dev" if "gurucraftpro.com" in self.from_email and not self.resend_api_key else self.from_email
        if self.resend_api_key and from_addr == "onboarding@resend.dev":
            # If using custom key, default to verified domain if onboarding@resend.dev fails
            pass

        payload = {
            "from": f"GuruCraftPro <{from_addr}>",
            "to": [to_email],
            "subject": subject,
            "text": text_body,
            "html": html_body
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
            with urllib.request.urlopen(req, timeout=10) as response:
                result = json.loads(response.read().decode('utf-8'))
                print(f"Resend Email sent to {to_email}. ID: {result.get('id')}")
                return True
        except urllib.error.HTTPError as e:
            error_info = e.read().decode('utf-8')
            print(f"Resend API Error: {e.code} - {error_info}")
            return False
        except Exception as e:
            print(f"Failed to send via Resend: {str(e)}")
            return False

    def send_via_sendgrid(self, to_email: str, subject: str, text_body: str, html_body: str) -> bool:
        """Sends email using SendGrid HTTP API"""
        url = "https://api.sendgrid.com/v3/mail/send"
        payload = {
            "personalizations": [{"to": [{"email": to_email}]}],
            "from": {"email": self.from_email, "name": "GuruCraftPro"},
            "subject": subject,
            "content": [
                {"type": "text/plain", "value": text_body},
                {"type": "text/html", "value": html_body}
            ]
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={
            'Authorization': f'Bearer {self.sendgrid_api_key}',
            'Content-Type': 'application/json'
        })
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                print(f"SendGrid Email sent to {to_email} successfully.")
                return True
        except urllib.error.HTTPError as e:
            error_info = e.read().decode('utf-8')
            print(f"SendGrid API Error: {e.code} - {error_info}")
            return False
        except Exception as e:
            print(f"Failed to send via SendGrid: {str(e)}")
            return False

    def send_via_postmark(self, to_email: str, subject: str, text_body: str, html_body: str) -> bool:
        """Sends email using Postmark HTTP API"""
        url = "https://api.postmarkapp.com/email"
        payload = {
            "From": self.from_email,
            "To": to_email,
            "Subject": subject,
            "TextBody": text_body,
            "HtmlBody": html_body
        }
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=data, headers={
            'X-Postmark-Server-Token': self.postmark_api_key,
            'Content-Type': 'application/json'
        })
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                print(f"Postmark Email sent to {to_email} successfully.")
                return True
        except urllib.error.HTTPError as e:
            error_info = e.read().decode('utf-8')
            print(f"Postmark API Error: {e.code} - {error_info}")
            return False
        except Exception as e:
            print(f"Failed to send via Postmark: {str(e)}")
            return False

    def send_via_smtp(self, to_email: str, subject: str, text_body: str, html_body: str, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None) -> bool:
        """Sends email using standard SMTP protocol"""
        message = MIMEMultipart("alternative")
        message["From"] = self.from_email
        message["To"] = to_email
        message["Subject"] = subject
        
        # Attach plain text and HTML versions
        message.attach(MIMEText(text_body, "plain"))
        message.attach(MIMEText(html_body, "html"))
        
        if attachment_filename and attachment_data:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment_data)
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f"attachment; filename= {attachment_filename}")
            message.attach(part)

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port, timeout=15)
            server.starttls()
            clean_password = self.sender_password.replace(" ", "")
            server.login(self.sender_email, clean_password)
            text = message.as_string()
            server.sendmail(self.from_email, to_email, text)
            server.quit()
            print(f"Email sent via SMTP successfully to {to_email}.")
            return True
        except Exception as e:
            print(f"Failed to send via SMTP: {str(e)}")
            return False

    def send_email_orchestrator(self, to_email: str, subject: str, text_body: str, html_body: str, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None) -> bool:
        """Orchestrates sending of emails, trying configured providers in order of recommendation."""
        # 1. Resend
        if self.resend_api_key:
            print("Attempting Resend HTTP delivery...")
            if self.send_via_resend(to_email, subject, text_body, html_body, attachment_filename, attachment_data):
                return True
        
        # 2. SendGrid
        if self.sendgrid_api_key:
            print("Attempting SendGrid HTTP delivery...")
            if self.send_via_sendgrid(to_email, subject, text_body, html_body):
                return True

        # 3. Postmark
        if self.postmark_api_key:
            print("Attempting Postmark HTTP delivery...")
            if self.send_via_postmark(to_email, subject, text_body, html_body):
                return True

        # 4. Fallback: SMTP
        if self.sender_password:
            print("Attempting SMTP server delivery...")
            if self.send_via_smtp(to_email, subject, text_body, html_body, attachment_filename, attachment_data):
                return True

        print("ERROR: All email delivery options failed or were unconfigured.")
        return False

    def send_contact_notification(self, name: str, email: str, message_body: str, inquiry_type: Optional[str] = None, company: Optional[str] = None, budget: Optional[str] = None, deadline: Optional[str] = None, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None) -> bool:
        """Sends admin notification email when a user submits the contact form."""
        subject = f"New Project Request: {name}"
        if inquiry_type:
            subject += f" ({inquiry_type})"

        text_body = f"""
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
        html_body = f"""
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; margin-top: 0;">New Project Submission</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <tr><td style="padding: 8px 0; font-weight: bold; width: 130px;">Name:</td><td style="padding: 8px 0;">{name}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:{email}">{email}</a></td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">{company or 'N/A'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Inquiry Type:</td><td style="padding: 8px 0;">{inquiry_type or 'N/A'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Budget:</td><td style="padding: 8px 0;">{budget or 'Not specified'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold;">Timeline:</td><td style="padding: 8px 0;">{deadline or 'Not specified'}</td></tr>
    </table>
    <h3 style="color: #4f46e5; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Project Brief / Message</h3>
    <p style="background: #fff; padding: 15px; border-left: 4px solid #4f46e5; font-style: italic; border-radius: 4px;">{message_body}</p>
  </div>
</body>
</html>
"""
        return self.send_email_orchestrator(
            to_email=self.recipient_email,
            subject=subject,
            text_body=text_body,
            html_body=html_body,
            attachment_filename=attachment_filename,
            attachment_data=attachment_data
        )

    def send_user_confirmation(self, name: str, to_email: str, inquiry_type: Optional[str] = None, message_body: Optional[str] = None) -> bool:
        """Sends an auto-reply confirmation email to the user who submitted the form."""
        subject = "Thank you for contacting GuruCraftPro!"
        
        text_body = f"""
Hello {name},

Thank you for reaching out to GuruCraftPro. We have received your inquiry.

Submission Summary:
- Inquiry Type: {inquiry_type or 'General Contact'}
- Message: {message_body or ''}

Our team is currently reviewing your request. We will get back to you with a detailed response shortly (usually within 24-48 hours).

If you have any attachments or additional requirements, please feel free to reply directly to this email.

Best regards,
The GuruCraftPro Team
"""
        html_body = f"""
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f3f4f6; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 20px auto; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
    <div style="text-align: center; margin-bottom: 25px;">
      <h1 style="color: #4f46e5; margin: 0; font-size: 28px; font-weight: 800; tracking-tighter: -0.05em; font-style: italic;">GURUCRAFT<span style="color: #312e81;">PRO</span></h1>
      <p style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: bold; margin-top: 5px;">Creative Design & AI Labs</p>
    </div>
    
    <p style="font-size: 16px; margin-top: 0;">Hello <strong>{name}</strong>,</p>
    <p style="font-size: 16px;">Thank you for contacting us. We have received your inquiry and our team is already on it!</p>
    
    <div style="background-color: #f9fafb; border-left: 4px solid #4f46e5; padding: 20px; border-radius: 6px; margin: 20px 0;">
      <h3 style="color: #374151; margin-top: 0; margin-bottom: 10px;">Submission Details</h3>
      <table style="width: 100%; font-size: 14px;">
        <tr><td style="font-weight: bold; width: 100px; color: #4b5563;">Type:</td><td style="color: #1f2937;">{inquiry_type or 'General Contact'}</td></tr>
        <tr><td style="font-weight: bold; color: #4b5563; vertical-align: top; padding-top: 6px;">Brief:</td><td style="color: #1f2937; padding-top: 6px; font-style: italic;">"{message_body}"</td></tr>
      </table>
    </div>

    <p style="font-size: 16px;"><strong>What happens next?</strong><br>
    Our strategic designers and engineers will analyze your project scope. You can expect a response or request for a call within <strong>24-48 hours</strong>.</p>
    
    <p style="font-size: 16px; margin-bottom: 30px;">If you have any supporting files or wireframes to share in the meantime, simply reply directly to this message.</p>
    
    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 20px;">
    
    <div style="text-align: center; font-size: 12px; color: #9ca3af;">
      <p style="margin: 0 0 5px 0;">You received this automated email because you submitted a contact request on our website.</p>
      <p style="margin: 0;">&copy; {datetime.utcnow().year} GuruCraftPro. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
"""
        from datetime import datetime
        return self.send_email_orchestrator(
            to_email=to_email,
            subject=subject,
            text_body=text_body,
            html_body=html_body
        )

email_service = EmailService()
