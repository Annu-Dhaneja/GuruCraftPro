import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def check_local_db():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found in .env")
        return
    
    engine = create_engine(db_url)
    try:
        with engine.connect() as conn:
            print(f"Connecting to: {db_url}")
            res = conn.execute(text('SELECT username, role, length(hashed_password) as hlen FROM users'))
            rows = res.fetchall()
            if not rows:
                print("No users found in local DB.")
            for r in rows:
                print(f"User: {r.username}, Role: {r.role}, Hash Length: {r.hlen}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_local_db()
