import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional

class EmailService:
    def __init__(self):
        # Using environment variables for better security
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", "587"))
        self.sender_email = os.getenv("SMTP_EMAIL", "andad622@gmail.com")
        # No hardcoded password - MUST be set via SMTP_PASSWORD env var on Render
        self.sender_password = os.getenv("SMTP_PASSWORD", "")
        self.recipient_email = os.getenv("SMTP_RECEIVER", "andad622@gmail.com")
        if not self.sender_password:
            print("WARNING: SMTP_PASSWORD env var is not set! Email will fail.")

    def send_contact_notification(self, name: str, email: str, message_body: str, inquiry_type: Optional[str] = None, attachment_filename: Optional[str] = None, attachment_data: Optional[bytes] = None):
        """
        Send an email notification when a new contact form is submitted.
        """
        subject = f"New Contact Form Submission: {name}"
        if inquiry_type:
            subject += f" ({inquiry_type})"

        body = f"""
        New contact form submission received:
        
        Name: {name}
        Email: {email}
        Inquiry Type: {inquiry_type or 'N/A'}
        
        Message:
        {message_body}
        """

        message = MIMEMultipart()
        message["From"] = self.sender_email
        message["To"] = self.recipient_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))
        
        if attachment_filename and attachment_data:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment_data)
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename= {attachment_filename}",
            )
            message.attach(part)

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            # Clean app password (remove spaces if user copy-pasted them)
            clean_password = self.sender_password.replace(" ", "")
            server.login(self.sender_email, clean_password)
            text = message.as_string()
            server.sendmail(self.sender_email, self.recipient_email, text)
            server.quit()
            print(f"Email notification sent for {name}")
            return True
        except Exception as e:
            print(f"Failed to send email notification: {e}")
            return False

email_service = EmailService()
