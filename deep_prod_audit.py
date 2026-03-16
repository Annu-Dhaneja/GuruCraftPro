import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from core import auth, database, models

def deep_audit():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url:
        db_url += "?sslmode=require"
    
    print(f"Connecting to: {db_url[:20]}...")
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        res = conn.execute(text("SELECT username, hashed_password FROM users WHERE username = 'annuad@#05'"))
        user = res.fetchone()
        if user:
            username, hashed_pwd = user
            print(f"Found User: {username}")
            print(f"Stored Hash: {hashed_pwd}")
            print(f"Hash Length: {len(hashed_pwd)}")
            
            # TEST 1: Passlib verify
            try:
                print("Testing verify('annuad@#05', hash)...")
                is_valid = auth.verify_password("annuad@#05", hashed_pwd)
                print(f"Passlib Verify Result: {is_valid}")
            except Exception as e:
                print(f"Passlib Verify ERROR: {e}")
                import traceback
                traceback.print_exc()

            # TEST 2: Direct verify with trimmed hash if needed
            try:
                import bcrypt
                print("Testing direct bcrypt.checkpw...")
                # Ensure hash is bytes and properly formatted
                h_bytes = hashed_pwd.encode('utf-8')
                p_bytes = "annuad@#05".encode('utf-8')
                is_valid = bcrypt.checkpw(p_bytes, h_bytes)
                print(f"Direct Bcrypt Result: {is_valid}")
            except Exception as e:
                print(f"Direct Bcrypt ERROR: {e}")

if __name__ == "__main__":
    deep_audit()
