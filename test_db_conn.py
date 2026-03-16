import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from pathlib import Path

# Load env
env_path = Path("backend/.env")
load_dotenv(dotenv_path=env_path)

db_url = os.getenv("DATABASE_URL")
print(f"Testing connection to: {db_url}")

if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

# Add sslmode if not present and if it's postgres
if "postgresql" in db_url and "sslmode" not in db_url:
    if "?" in db_url:
        db_url += "&sslmode=require"
    else:
        db_url += "?sslmode=require"

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT current_database();"))
        print(f"Successfully connected to: {result.fetchone()[0]}")
        
        # Check tables
        result = conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';"))
        tables = [row[0] for row in result]
        print(f"Tables found: {tables}")
except Exception as e:
    print(f"Connection failed: {e}")
