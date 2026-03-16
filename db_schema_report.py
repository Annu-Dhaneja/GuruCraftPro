import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Path setup
backend_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(backend_dir, "backend", ".env")
load_dotenv(dotenv_path=env_path)

db_url = os.getenv("DATABASE_URL")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        print("--- PRODUCTION TABLES ---")
        result = conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"))
        for row in result:
            print(f"Table: {row[0]}")
            
        print("\n--- 'users' (Admin) TABLE SCHEMA ---")
        # For PostgreSQL
        result = conn.execute(text("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'users'
            ORDER BY ordinal_position;
        """))
        for row in result:
            print(f"Column: {row[0]} | Type: {row[1]} | Nullable: {row[2]}")
            
        print("\n--- ADMIN RECORD COUNT ---")
        count = conn.execute(text("SELECT count(*) FROM users;")).fetchone()[0]
        print(f"Total Admin Users in DB: {count}")
        
except Exception as e:
    print(f"Audit Error: {e}")
