import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import traceback

def diagnose_db():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    print(f"DEBUG: Attempting to connect to: {db_url[:20]}...")
    
    # Render URLs might need some tweaks or SSL handling
    if db_url and not db_url.startswith("sqlite") and "sslmode" not in db_url:
        print("TIP: Remote PostgreSQL URLs often require sslmode=require")
        delimiter = "&" if "?" in db_url else "?"
        db_url += f"{delimiter}sslmode=require"

    try:
        engine = create_engine(db_url, connect_args={"connect_timeout": 10})
        with engine.connect() as conn:
            print("SUCCESS: Connection established.")
            res = conn.execute(text("SELECT version();"))
            print(f"DB Version: {res.fetchone()[0]}")
    except Exception as e:
        print("ERROR: Connection failed.")
        print("-" * 40)
        traceback.print_exc()
        print("-" * 40)

if __name__ == "__main__":
    diagnose_db()
