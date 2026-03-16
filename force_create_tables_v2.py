import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Add backend to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(backend_dir, "backend"))

# Load env explicitly
env_path = os.path.join(backend_dir, "backend", ".env")
print(f"Loading env from: {env_path}")
load_dotenv(dotenv_path=env_path)

from core.database import engine, Base
from core import models

print(f"Engine URL: {engine.url.drivername}://{engine.url.username}:***@{engine.url.host}/{engine.url.database}")

if "postgresql" not in engine.url.drivername:
    print("CRITICAL: Engine is NOT PostgreSQL. Fallback to SQLite detected.")
    sys.exit(1)

print("Attempting to create all tables...")
Base.metadata.create_all(bind=engine)
print("Create all completed.")

# Verify
from sqlalchemy import text
with engine.connect() as conn:
    result = conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"))
    tables = [row[0] for row in result]
    print(f"Verified Tables in 'public': {tables}")
