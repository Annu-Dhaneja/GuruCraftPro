import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional

class EmailService:
    def __init__(self):
        # Using the credentials provided by the user
        self.smtp_server = "smtp.gmail.com"
        self.smtp_port = 587
        self.sender_email = "andad622@gmail.com"
        self.sender_password = "dyse sbbd hsjk gnzh"
        self.recipient_email = "andad622@gmail.com"

    def send_contact_notification(self, name: str, email: str, message_body: str, inquiry_type: Optional[str] = None):
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

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.sender_email, self.sender_password)
            text = message.as_string()
            server.sendmail(self.sender_email, self.recipient_email, text)
            server.quit()
            print(f"Email notification sent for {name}")
            return True
        except Exception as e:
            print(f"Failed to send email notification: {e}")
            return False

email_service = EmailService()
