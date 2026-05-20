import os
from sqlalchemy import create_engine, text

# Database URL pointing directly to Supabase production
DB_URL = "postgresql://postgres:Oma628752%23Op@db.puprmtfdjsuiqlvtqfrh.supabase.co:5432/postgres"

print("Connecting to production Supabase...")
engine = create_engine(DB_URL)

try:
    with engine.connect() as conn:
        print("Updating status of wedding-showcase to 'published'...")
        res = conn.execute(text("UPDATE cms_pages SET status = 'published' WHERE slug = 'wedding-showcase';"))
        conn.commit()
        print(f"Update completed. Rows affected: {res.rowcount}")
except Exception as e:
    print(f"Error updating status: {e}")
