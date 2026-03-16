import os
import sys
import getpass
from pathlib import Path
from dotenv import load_dotenv

# Path setup
backend_dir = r"e:\Project\virtual_try-main\backend"
sys.path.append(backend_dir)

# Load env for database connection
load_dotenv(dotenv_path=os.path.join(backend_dir, ".env"))

# Ensure we use the remote DB
DB_URL = "postgresql://annu_project_user:TWdBAMY4k7bHurZnY9sOEUHraNJdPk7E@dpg-d6rou5k50q8c73f6c8s0-a.oregon-postgres.render.com/annu_project?sslmode=require"

from core.database import SessionLocal, engine
from core import models, auth

def manual_seed():
    print("--- MANUAL PRODUCTION ADMIN CREATION ---")
    print(f"Target Database: {engine.url.host}")
    
    username = input("Enter Admin Username: ")
    email = input("Enter Admin Email: ")
    password = getpass.getpass("Enter Admin Password: ")
    confirm_password = getpass.getpass("Confirm Admin Password: ")
    
    if password != confirm_password:
        print("Error: Passwords do not match.")
        return
        
    db = SessionLocal()
    try:
        # Check if user exists
        existing = db.query(models.User).filter(models.User.username == username).first()
        if existing:
            print(f"Error: User '{username}' already exists.")
            # Ask if they want to update password
            choice = input("Do you want to update the password for this user? (y/n): ")
            if choice.lower() == 'y':
                existing.hashed_password = auth.get_password_hash(password)
                db.commit()
                print("Password updated successfully.")
            return

        print("Creating admin account...")
        new_user = models.User(
            username=username,
            email=email,
            name=username.split('@')[0].capitalize(),
            hashed_password=auth.get_password_hash(password),
            role=models.UserRole.ADMIN
        )
        db.add(new_user)
        db.commit()
        print(f"SUCCESS: Admin '{username}' is now live on the production database.")
        
    except Exception as e:
        print(f"Database Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    manual_seed()
