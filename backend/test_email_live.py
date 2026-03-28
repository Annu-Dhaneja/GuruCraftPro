import sys
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'))
    print("✅ .env loaded")
except ImportError:
    print("⚠️ python-dotenv not available")

email = os.getenv("SMTP_EMAIL", "andad622@gmail.com")
password = os.getenv("SMTP_PASSWORD", "")
receiver = os.getenv("SMTP_RECEIVER", "andad622@gmail.com")

print(f"\nSender:    {email}")
print(f"Receiver:  {receiver}")
print(f"Password:  {'*' * len(password)} (length={len(password)})")

# Strip spaces (App Passwords work with or without spaces)
password_clean = password.replace(" ", "")

try:
    print("\n🔌 Connecting to smtp.gmail.com:587 ...")
    server = smtplib.SMTP("smtp.gmail.com", 587, timeout=15)
    server.ehlo()
    server.starttls()
    server.ehlo()
    print("🔑 Logging in ...")
    server.login(email, password_clean)
    
    # Build and send test message
    msg = MIMEMultipart()
    msg["From"] = email
    msg["To"] = receiver
    msg["Subject"] = "✅ Email Feature Working - Virtual Try Studio"
    msg.attach(MIMEText("This is a live test email from your Virtual Try Studio contact form email feature. It's working correctly!", "plain"))
    
    server.sendmail(email, receiver, msg.as_string())
    server.quit()
    print(f"\n✅ SUCCESS! Test email sent to {receiver}")
    print("👉 Please check your Gmail inbox (and Spam folder).")
except smtplib.SMTPAuthenticationError as e:
    print(f"\n❌ AUTH FAILED: {e}")
    print("👉 The App Password in backend/.env is wrong or expired.")
    print("   Please re-generate at: https://myaccount.google.com/apppasswords")
except smtplib.SMTPConnectError as e:
    print(f"\n❌ CONNECTION FAILED: {e}")
    print("   Network may be blocking port 587.")
except Exception as e:
    print(f"\n❌ UNEXPECTED ERROR: {type(e).__name__}: {e}")
