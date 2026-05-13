import os
from sqlalchemy import create_engine, text
from core.database import SQLALCHEMY_DATABASE_URL

def fix_schema():
    print(f"Startup Logic: Checking database schema stability...")
    try:
        from core.database import SQLALCHEMY_DATABASE_URL
    except ImportError:
        # Fallback if called outside backend context
        SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")
    
    print(f"Connecting to database: {SQLALCHEMY_DATABASE_URL}")
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    
    with engine.connect() as conn:
        # 1. Fix 'users' table
        print("Checking 'users' table...")
        
        # Get existing columns
        if "sqlite" in SQLALCHEMY_DATABASE_URL:
            result = conn.execute(text("PRAGMA table_info(users)"))
            columns = [row[1] for row in result.fetchall()]
        else:
            # PostgreSQL
            result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'"))
            columns = [row[0] for row in result.fetchall()]
        
        print(f"Existing columns: {columns}")
        
        # Add missing columns
        missing_columns = {
            "name": "VARCHAR",
            "email": "VARCHAR",
            "role": "VARCHAR DEFAULT 'user'",
            "created_at": "DATETIME" if "sqlite" in SQLALCHEMY_DATABASE_URL else "TIMESTAMP"
        }
        
        for col, col_type in missing_columns.items():
            if col not in columns:
                print(f"Adding column '{col}' to 'users' table...")
                try:
                    conn.execute(text(f"ALTER TABLE users ADD COLUMN {col} {col_type}"))
                    print(f"Added {col}")
                except Exception as e:
                    print(f"Failed to add {col}: {e}")
        
        conn.commit()

        # 2. Fix 'contact_submissions' table
        print("Checking 'contact_submissions' table...")
        if "sqlite" in SQLALCHEMY_DATABASE_URL:
            result = conn.execute(text("PRAGMA table_info(contact_submissions)"))
            columns = [row[1] for row in result.fetchall()]
        else:
            result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name = 'contact_submissions'"))
            columns = [row[0] for row in result.fetchall()]
        
        if "attachment_url" not in columns:
            print("Adding column 'attachment_url' to 'contact_submissions'...")
            conn.execute(text("ALTER TABLE contact_submissions ADD COLUMN attachment_url VARCHAR"))
            conn.commit()

        print("Schema fix complete.")

if __name__ == "__main__":
    fix_schema()
