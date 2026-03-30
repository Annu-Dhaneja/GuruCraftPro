import os
import sys
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add current directory to path so we can import core
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.database import Base, engine
from core import models  # Importing models registers them with Base.metadata

def repair_schema():
    print(f"Repairing schema for database: {engine.url}")
    try:
        # This will create all tables defined in models.py that don't exist yet
        Base.metadata.create_all(bind=engine)
        print("✅ All tables (including SSOT CMS tables) have been ensured.")
    except Exception as e:
        print(f"❌ Error creating tables: {e}")

if __name__ == "__main__":
    repair_schema()
