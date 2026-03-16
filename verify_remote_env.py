import os
from dotenv import load_dotenv

# Absolute path to env
env_path = r"e:\Project\virtual_try-main\backend\.env"
print(f"Checking env file: {env_path}")
if os.path.exists(env_path):
    print("Env file exists.")
    load_dotenv(dotenv_path=env_path)
    db_url = os.getenv("DATABASE_URL")
    print(f"Found DATABASE_URL: {db_url[:20]}...")
else:
    print("Env file NOT FOUND.")

# Test SQLAlchemy connection to THIS url
from sqlalchemy import create_engine, text
if db_url:
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)
    
    # Force SSL for Render
    if "sslmode" not in db_url:
        db_url += "?sslmode=require"
        
    engine = create_engine(db_url)
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            print(f"PostgreSQL Version: {result.fetchone()[0]}")
    except Exception as e:
        print(f"Remote connection failed: {e}")
