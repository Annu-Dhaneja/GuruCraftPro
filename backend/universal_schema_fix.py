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
        # Tables that need AuditMixin columns added if they already existed
        tables_to_check = [
            "users", "contact_submissions", "clothing_pieces", "posts", 
            "products", "orders", "order_items", "designs", "wedding_plans",
            "wedding_tasks", "wedding_guests", "wedding_vendors", "wedding_budgets"
        ]
        
        for table in tables_to_check:
            print(f"Checking '{table}' table...")
            try:
                if "sqlite" in SQLALCHEMY_DATABASE_URL:
                    result = conn.execute(text(f"PRAGMA table_info({table})"))
                    columns = [row[1] for row in result.fetchall()]
                else:
                    # PostgreSQL
                    result = conn.execute(text(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table}'"))
                    columns = [row[0] for row in result.fetchall()]
                
                if not columns:
                    print(f"Table {table} does not exist yet. Skipping alter.")
                    continue
                
                # Add missing audit columns
                missing_columns = {
                    "updated_at": "DATETIME" if "sqlite" in SQLALCHEMY_DATABASE_URL else "TIMESTAMP",
                    "deleted_at": "DATETIME" if "sqlite" in SQLALCHEMY_DATABASE_URL else "TIMESTAMP",
                    "created_at": "DATETIME" if "sqlite" in SQLALCHEMY_DATABASE_URL else "TIMESTAMP" # just in case
                }
                
                if table == "users":
                    missing_columns["role_id"] = "INTEGER"
                
                for col, col_type in missing_columns.items():
                    if col not in columns:
                        print(f"Adding column '{col}' to '{table}' table...")
                        try:
                            conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col} {col_type}"))
                            print(f"Added {col}")
                        except Exception as e:
                            print(f"Failed to add {col}: {e}")
                
            except Exception as e:
                print(f"Error checking {table}: {e}")
        
        conn.commit()

        print("Schema fix complete.")

if __name__ == "__main__":
    fix_schema()
