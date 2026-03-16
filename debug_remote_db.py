import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Add backend to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if "backend" not in sys.path:
    sys.path.append(os.path.join(backend_dir, "backend"))

# Load env
load_dotenv(dotenv_path=os.path.join(backend_dir, "backend", ".env"))

db_url = os.getenv("DATABASE_URL")
if not db_url:
    print("No DATABASE_URL found")
    sys.exit(1)

if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        print(f"Connected to: {db_url.split('@')[-1]}")
        
        # Check current search path
        path = conn.execute(text("SHOW search_path;")).fetchone()[0]
        print(f"Current search_path: {path}")
        
        # List all tables in public schema
        result = conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"))
        tables = [row[0] for row in result]
        print(f"Tables in 'public' schema: {tables}")
        
        if len(tables) == 0:
            print("WARNING: No tables found in 'public' schema. Trying to list all schemas...")
            result = conn.execute(text("SELECT DISTINCT schemaname FROM pg_catalog.pg_tables;"))
            schemas = [row[0] for row in result]
            print(f"Available schemas with tables: {schemas}")
            
except Exception as e:
    print(f"Connection/Query failed: {e}")
