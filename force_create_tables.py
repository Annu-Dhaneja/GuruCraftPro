import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Add backend to path
sys.path.append(str(Path("backend").absolute()))

from core.database import engine, Base
from core import models  # This MUST be imported to register models with Base

print("Importing models...")
print(f"Models registered: {Base.metadata.tables.keys()}")

print("Attempting to create all tables...")
try:
    Base.metadata.create_all(bind=engine)
    print("Base.metadata.create_all completed.")
except Exception as e:
    print(f"Error during create_all: {e}")

# Verify again
from sqlalchemy import text
with engine.connect() as conn:
    result = conn.execute(text("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';"))
    tables = [row[0] for row in result]
    print(f"Tables in public schema: {tables}")
