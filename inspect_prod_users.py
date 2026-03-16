import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def inspect_prod_users():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url and "sslmode" not in db_url:
        db_url += "?sslmode=require"
    
    engine = create_engine(db_url)
    try:
        with engine.connect() as conn:
            print(f"Inspecting DB: {db_url[:20]}...")
            res = conn.execute(text("SELECT id, username, role, length(hashed_password) as hlen, hashed_password FROM users"))
            rows = res.fetchall()
            if not rows:
                print("No users found in PROD DB.")
            for r in rows:
                # Masking most of the hash but showing start and end for verification
                h = r.hashed_password
                masked_hash = f"{h[:10]}...{h[-10:]}" if h else "NONE"
                print(f"ID: {r.id} | User: {r.username} | Role: {r.role} | Len: {r.hlen} | Hash: {masked_hash}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_prod_users()
