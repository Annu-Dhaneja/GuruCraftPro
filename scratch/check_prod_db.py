import os
import sys
from sqlalchemy import create_engine, inspect, text

# Retrieve production Supabase URL dynamically from environment
DB_URL = "postgresql://postgres:Oma628752%23Op@db.puprmtfdjsuiqlvtqfrh.supabase.co:5432/postgres"

print("Connecting to production Supabase...")
engine = create_engine(DB_URL)

try:
    inspector = inspect(engine)
    print("Tables present in DB:")
    tables = inspector.get_table_names()
    for table in tables:
        print(f" - {table}")
        
    with engine.connect() as conn:
        if "cms_pages" in tables:
            print("\nContent of cms_pages:")
            res = conn.execute(text("SELECT id, slug, title, status FROM cms_pages;")).fetchall()
            for r in res:
                print(f"   Page ID: {r[0]} | Slug: {r[1]} | Title: {r[2]} | Status: {r[3]}")
                
            print("\nComponent counts per page:")
            res = conn.execute(text("""
                SELECT p.slug, COUNT(pc.id) 
                FROM cms_pages p 
                LEFT JOIN cms_page_components pc ON p.id = pc.page_id 
                GROUP BY p.slug;
            """)).fetchall()
            for r in res:
                print(f"   Slug: {r[0]} | Component Count: {r[1]}")
        else:
            print("\nWARNING: cms_pages table NOT found in database!")
            
except Exception as e:
    print(f"Error checking production database: {e}")
