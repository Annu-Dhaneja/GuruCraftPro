import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def force_repair_schema():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url and "sslmode" not in db_url:
        db_url += "?sslmode=require"
    
    engine = create_engine(db_url)
    
    try:
        with engine.connect() as conn:
            # 1. Check current limit
            res = conn.execute(text("SELECT character_maximum_length FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'hashed_password'"))
            curr_limit = res.fetchone()[0]
            print(f"Current Limit: {curr_limit}")
            
            # 2. Force Alter
            print("Altering column to TEXT (unlimited)...")
            conn.execute(text("ALTER TABLE users ALTER COLUMN hashed_password TYPE TEXT;"))
            conn.execute(text("COMMIT;")) # Force commit
            
            # 3. Verify Alter
            res = conn.execute(text("SELECT character_maximum_length FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'hashed_password'"))
            new_limit = res.fetchone()[0]
            print(f"New Limit (None means TEXT/Unlimited): {new_limit}")
            
            # 4. Insert Fresh Hashes
            from passlib.context import CryptContext
            pc = CryptContext(schemes=['bcrypt'])
            h1 = pc.hash("annuad@#05")
            h2 = pc.hash("Om@Op")
            
            print(f"Injecting H1 (Len {len(h1)}): {h1[:15]}...")
            conn.execute(text("UPDATE users SET hashed_password = :h WHERE username = 'annuad@#05'"), {"h": h1})
            conn.execute(text("UPDATE users SET hashed_password = :h WHERE username = 'Om@Op'"), {"h": h2})
            conn.execute(text("COMMIT;"))
            
            # 5. Final Verify
            res = conn.execute(text("SELECT username, length(hashed_password) FROM users"))
            for r in res:
                print(f"FINAL VERIFY -> {r[0]}: {r[1]} characters")
                
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    force_repair_schema()
