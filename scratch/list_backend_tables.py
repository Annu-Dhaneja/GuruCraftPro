import sqlite3
import os

def list_pages_comparison():
    db_path = 'backend/sql_app.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("--- PAGES Table (Legacy) ---")
    try:
        cursor.execute("SELECT id, slug, title FROM pages;")
        for row in cursor.fetchall():
            print(f"ID: {row[0]} | Slug: {row[1]} | Title: {row[2]}")
    except Exception as e:
        print(f"Error reading pages: {e}")
        
    print("\n--- CMS_PAGES Table (V3) ---")
    try:
        cursor.execute("SELECT id, slug, title, status FROM cms_pages;")
        for row in cursor.fetchall():
            print(f"ID: {row[0]} | Slug: {row[1]} | Title: {row[2]} | Status: {row[3]}")
    except Exception as e:
        print(f"Error reading cms_pages: {e}")
        
    conn.close()

if __name__ == '__main__':
    list_pages_comparison()
