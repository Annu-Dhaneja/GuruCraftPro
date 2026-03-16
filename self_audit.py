import os
import bcrypt
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def self_contained_audit():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url:
        db_url += "?sslmode=require"
    
    print(f"Connecting to: {db_url[:20]}...")
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        print("Querying user 'annuad@#05'...")
        res = conn.execute(text("SELECT username, hashed_password FROM users WHERE username = 'annuad@#05'"))
        user = res.fetchone()
        
        if not user:
            print("USER NOT FOUND")
            return
            
        username, hashed_pwd = user
        print(f"Username: {username}")
        print(f"Hash in DB: {hashed_pwd}")
        print(f"Hash Len: {len(hashed_pwd)}")
        
        password = "annuad@#05"
        print(f"Testing password: {password} (Len: {len(password)})")
        
        try:
            # Direct Bcrypt check
            # Passlib's bcrypt hashes usually start with $2b$ or $2a$
            # Ensure it's bytes
            p_bytes = password.encode('utf-8')
            h_bytes = hashed_pwd.encode('utf-8')
            
            print("Attempting bcrypt.checkpw(p_bytes, h_bytes)...")
            result = bcrypt.checkpw(p_bytes, h_bytes)
            print(f"Bcrypt Result: {result}")
            
        except Exception as e:
            print(f"Bcrypt ERROR: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    self_contained_audit()
