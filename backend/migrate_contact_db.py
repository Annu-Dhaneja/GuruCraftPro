import os
import sys
from sqlalchemy import create_engine, text

# Add current directory to path so we can import database settings
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from core.database import engine

def migrate():
    print(f"Running contact submissions schema migration for engine: {engine.url}")
    
    # New columns to add
    new_cols = [
        ("phone", "VARCHAR"),
        ("page_source", "VARCHAR"),
        ("status", "VARCHAR DEFAULT 'new'"),
        ("ip_address", "VARCHAR"),
        ("device_metadata", "VARCHAR")
    ]
    
    with engine.connect() as conn:
        # Check database type
        db_type = engine.url.drivername
        print(f"Database driver type: {db_type}")
        
        for col_name, col_type in new_cols:
            try:
                # Execute raw SQL ALTER statement
                alter_sql = f"ALTER TABLE contact_submissions ADD COLUMN {col_name} {col_type};"
                print(f"Executing: {alter_sql}")
                conn.execute(text(alter_sql))
                conn.commit()
                print(f"Successfully added column {col_name}")
            except Exception as e:
                # Column likely already exists
                error_str = str(e)
                if "duplicate column" in error_str.lower() or "already exists" in error_str.lower() or "duplicate" in error_str.lower():
                    print(f"Column {col_name} already exists. Skipping.")
                else:
                    print(f"Note: Could not add column {col_name}: {e}")

if __name__ == "__main__":
    migrate()
