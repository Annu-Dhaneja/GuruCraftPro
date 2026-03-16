import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Add backend to path to import core modules
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from core import auth, database, models
from services.user import user_service

def debug_prod_auth():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url and "sslmode" not in db_url:
        db_url += "?sslmode=require"
    
    engine = create_engine(db_url)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    username = "annuad@#05"
    password = "annuad@#05"
    
    print(f"DEBUG: Authenticating {username}...")
    
    try:
        # Step 1: User Lookup
        user = db.query(models.User).filter(models.User.username == username).first()
        if not user:
            print("FAIL: User not found in DB.")
            return
        
        print(f"SUCCESS: User found. ID: {user.id}, Role: {user.role}, Hash Len: {len(user.hashed_password)}")
        
        # Step 2: Password Verification
        is_valid = auth.verify_password(password, user.hashed_password)
        if is_valid:
            print("SUCCESS: Password verified.")
        else:
            print("FAIL: Password verification failed.")
            # Debug: Try a manual verification with fresh hash
            fresh_hash = auth.get_password_hash(password)
            print(f"INFO: Fresh hash of '{password}' would be: {fresh_hash[:20]}...")
            print(f"INFO: DB hash starts with: {user.hashed_password[:20]}...")
            
    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    debug_prod_auth()
