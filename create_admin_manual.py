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

def manual_seed():
    print("=== MANUAL ADMIN CREATION & PASSWORD UTILITY ===")
    print("Select target database:")
    print("1) Local Database (SQLite)")
    print("2) Production Database (PostgreSQL - Supabase/Vercel)")
    choice = input("Enter choice (1 or 2): ").strip()
    
    if choice == "2":
        print("\nConfiguring connection to production database...")
        env_prod_url = os.getenv("PROD_DATABASE_URL") or os.getenv("DATABASE_URL")
        if not env_prod_url or "sqlite" in env_prod_url:
            entered_url = input("Please enter your production PostgreSQL connection string (Supabase): ").strip()
            if entered_url:
                os.environ["DATABASE_URL"] = entered_url
            else:
                print("No connection string provided. Using default SQLite.")
        else:
            os.environ["DATABASE_URL"] = env_prod_url
    else:
        print("\nConfiguring connection to local database...")
        # Local database will default to SQLite if not set in .env
        
    # Import core modules AFTER setting the environment variable so it initializes the engine correctly
    try:
        from core.database import SessionLocal, engine
        from core import models, auth
    except ImportError as e:
        print(f"Error importing backend modules: {e}")
        return
        
    print(f"Target Database Host: {engine.url.host or 'Local SQLite File'}")
    
    username = input("Enter Admin Username: ").strip()
    email = input("Enter Admin Email: ").strip()
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
            print(f"User '{username}' already exists (Current Role: {existing.role}, Approved: {existing.is_approved}).")
            choice = input("Do you want to update the password for this user? (y/n): ")
            if choice.lower() == 'y':
                existing.hashed_password = auth.get_password_hash(password)
                existing.role = "SUPER_ADMIN"
                existing.is_approved = True
                db.commit()
                print("SUCCESS: Password updated, role set to SUPER_ADMIN, and user marked as APPROVED.")
            return

        print("Creating admin account...")
        new_user = models.User(
            username=username,
            email=email,
            name=username.split('@')[0].capitalize(),
            hashed_password=auth.get_password_hash(password),
            role="SUPER_ADMIN",
            is_approved=True
        )
        db.add(new_user)
        db.commit()
        print(f"SUCCESS: Admin '{username}' has been successfully created and marked as APPROVED.")
        
    except Exception as e:
        print(f"Database Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    manual_seed()
