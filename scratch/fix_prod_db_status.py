import os
from sqlalchemy import create_engine, text

# Retrieve production Supabase URL dynamically from environment
PROD_DB_URL = os.getenv("PROD_DATABASE_URL") or os.getenv("DATABASE_URL")
if not PROD_DB_URL or "sqlite" in PROD_DB_URL:
    PROD_DB_URL = input("Please enter your production PostgreSQL connection string (Supabase): ").strip()

def fix_prod_status():
    print(f"Connecting to external production PostgreSQL database...")
    engine = create_engine(PROD_DB_URL)
    try:
        with engine.connect() as conn:
            # Check current status of cms_pages
            print("Reading cms_pages status before fix:")
            result = conn.execute(text("SELECT slug, status FROM cms_pages;"))
            rows = result.fetchall()
            for row in rows:
                print(f"  - {row[0]}: {row[1]}")
                
            # Perform update
            print("\nUpdating status to 'published' for all draft/null pages...")
            update_res = conn.execute(text("UPDATE cms_pages SET status = 'published' WHERE status IS NULL OR status = 'draft';"))
            conn.commit()
            print(f"Update done. Rows affected: {update_res.rowcount}")
            
            # Read after fix
            print("\nReading cms_pages status after fix:")
            result = conn.execute(text("SELECT slug, status FROM cms_pages;"))
            rows = result.fetchall()
            for row in rows:
                print(f"  - {row[0]}: {row[1]}")
    except Exception as e:
        print(f"Error during production status fix: {e}")

if __name__ == '__main__':
    fix_prod_status()
