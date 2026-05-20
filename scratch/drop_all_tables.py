import os
import sys
from sqlalchemy import create_engine, text

# Retrieve production Supabase URL dynamically from environment
DB_URL = os.getenv("PROD_DATABASE_URL") or os.getenv("DATABASE_URL")
if not DB_URL or "sqlite" in DB_URL:
    print("[ERROR] Please provide a valid production PostgreSQL connection string.")
    sys.exit(1)

print(f"Connecting to database to clear public schema...")
engine = create_engine(DB_URL)

try:
    with engine.connect() as conn:
        print("[PROCESS] Dropping public schema (CASCADE)...")
        conn.execute(text("DROP SCHEMA public CASCADE;"))
        print("[PROCESS] Recreating public schema...")
        conn.execute(text("CREATE SCHEMA public;"))
        print("[PROCESS] Granting permissions on public schema...")
        conn.execute(text("GRANT ALL ON SCHEMA public TO postgres;"))
        conn.execute(text("GRANT ALL ON SCHEMA public TO public;"))
        conn.commit()
        print("[SUCCESS] Database schema is clean and ready for GurucraftPro!")
except Exception as e:
    print(f"[ERROR] Failed to clear schema: {e}")
    sys.exit(1)
