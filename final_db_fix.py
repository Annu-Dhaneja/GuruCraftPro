import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from passlib.context import CryptContext

def final_hash_fix():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url and "sslmode" not in db_url:
        db_url += "?sslmode=require"
        
    engine = create_engine(db_url)
    pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
    
    # Generate fresh 60-character hashes
    h1 = pwd_context.hash("annuad@#05")
    h2 = pwd_context.hash("Om@Op")
    
    print(f"H1 Length: {len(h1)}")
    print(f"H2 Length: {len(h2)}")
    
    sql = """
    BEGIN;
    UPDATE users SET hashed_password = :h1 WHERE username = 'annuad@#05';
    UPDATE users SET hashed_password = :h2 WHERE username = 'Om@Op';
    COMMIT;
    """
    
    try:
        with engine.begin() as conn:
            conn.execute(text(sql), {"h1": h1, "h2": h2})
            print("DATABASE CREDENTIALS FINALIZED.")
            
            # Verify length one last time
            res = conn.execute(text("SELECT username, length(hashed_password) FROM users"))
            for r in res:
                print(f"Verified -> {r[0]}: {r[1]} characters")
                
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    final_hash_fix()
