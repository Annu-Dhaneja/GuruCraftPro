import os
from sqlalchemy import create_engine, text
from core.database import SQLALCHEMY_DATABASE_URL

def fix_schema():
    print(f"Startup Logic: Checking database schema stability...")
    try:
        from core.database import SQLALCHEMY_DATABASE_URL
    except ImportError:
        SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")
    
    print(f"Connecting to database: {SQLALCHEMY_DATABASE_URL}")
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    is_sqlite = "sqlite" in SQLALCHEMY_DATABASE_URL
    
    with engine.connect() as conn:
        tables_to_check = [
            "users", "contact_submissions", "clothing_pieces", "posts", 
            "products", "orders", "order_items", "designs", "wedding_plans",
            "wedding_tasks", "wedding_guests", "wedding_vendors", "wedding_budgets",
            "cms_pages", "cms_components", "cms_page_components", "global_settings", "media", "forms", "roles"
        ]
        
        # Universal Mixin Columns mapping
        universal_cols = [
            ("created_at", "DATETIME" if is_sqlite else "TIMESTAMP", None),
            ("updated_at", "DATETIME" if is_sqlite else "TIMESTAMP", None),
            ("deleted_at", "DATETIME" if is_sqlite else "TIMESTAMP", None),
            ("created_by_id", "INTEGER", None),
            ("updated_by_id", "INTEGER", None),
        ]
        
        content_tables = ["cms_pages", "posts", "products"]
        content_cols = [
            ("meta_title", "VARCHAR(200)", None),
            ("meta_description", "VARCHAR(500)", None),
            ("meta_keywords", "VARCHAR(500)", None),
            ("og_image", "VARCHAR(500)", None),
            ("canonical_url", "VARCHAR(500)", None),
            ("status", "VARCHAR(20)", "'draft'"),
            ("published_at", "DATETIME" if is_sqlite else "TIMESTAMP", None),
            ("slug", "VARCHAR(200)", None),
        ]

        for table in tables_to_check:
            print(f"Checking '{table}' table...")
            try:
                # Add Universal Columns
                for col, col_type, default in universal_cols:
                    try:
                        if is_sqlite:
                            # SQLite doesn't support IF NOT EXISTS for columns
                            res = conn.execute(text(f"PRAGMA table_info({table})"))
                            existing = [row[1] for row in res.fetchall()]
                            if col not in existing:
                                stmt = f"ALTER TABLE {table} ADD COLUMN {col} {col_type}"
                                if default: stmt += f" DEFAULT {default}"
                                conn.execute(text(stmt))
                                print(f"Added {col} to {table}")
                        else:
                            # PostgreSQL / Modern DBs
                            stmt = f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {col} {col_type}"
                            if default: stmt += f" DEFAULT {default}"
                            conn.execute(text(stmt))
                            # No easy way to know if it was added without checking first, but IF NOT EXISTS is safe
                    except Exception as e:
                        print(f"Column {col} already exists or error in {table}: {e}")

                # Add Content Columns
                if table in content_tables:
                    for col, col_type, default in content_cols:
                        try:
                            if is_sqlite:
                                res = conn.execute(text(f"PRAGMA table_info({table})"))
                                existing = [row[1] for row in res.fetchall()]
                                if col not in existing:
                                    stmt = f"ALTER TABLE {table} ADD COLUMN {col} {col_type}"
                                    if default: stmt += f" DEFAULT {default}"
                                    conn.execute(text(stmt))
                            else:
                                stmt = f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS {col} {col_type}"
                                if default: stmt += f" DEFAULT {default}"
                                conn.execute(text(stmt))
                        except Exception: pass

                # Special checks
                if table == "users":
                    try:
                        if is_sqlite:
                            res = conn.execute(text(f"PRAGMA table_info(users)"))
                            existing = [row[1] for row in res.fetchall()]
                            if "role_id" not in existing:
                                conn.execute(text("ALTER TABLE users ADD COLUMN role_id INTEGER"))
                        else:
                            conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id INTEGER"))
                    except Exception: pass

                if table in ["wedding_plans", "designs", "orders"]:
                    try:
                        if is_sqlite:
                            res = conn.execute(text(f"PRAGMA table_info({table})"))
                            existing = [row[1] for row in res.fetchall()]
                            if "user_id" not in existing:
                                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN user_id INTEGER"))
                        else:
                            conn.execute(text(f"ALTER TABLE {table} ADD COLUMN IF NOT EXISTS user_id INTEGER"))
                    except Exception: pass

                if table == "media":
                    try:
                        if is_sqlite:
                            res = conn.execute(text("PRAGMA table_info(media)"))
                            existing = [row[1] for row in res.fetchall()]
                            if "file_data_base64" not in existing:
                                conn.execute(text("ALTER TABLE media ADD COLUMN file_data_base64 TEXT"))
                                print("Added file_data_base64 column to SQLite media table")
                        else:
                            conn.execute(text("ALTER TABLE media ADD COLUMN IF NOT EXISTS file_data_base64 TEXT"))
                            print("Added file_data_base64 column to PostgreSQL media table if missing")
                    except Exception as e:
                        print(f"Error checking media table: {e}")

            except Exception as e:
                print(f"Error checking {table}: {e}")
        
        conn.commit()
        print("Schema evolution complete.")

if __name__ == "__main__":
    fix_schema()
