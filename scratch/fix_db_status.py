import sqlite3
import os

def fix_status():
    db_path = 'backend/sql_app.db'
    if not os.path.exists(db_path):
        print("Database not found")
        return
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check current status
    cursor.execute("SELECT slug, status FROM cms_pages;")
    print("Before fix:")
    for row in cursor.fetchall():
        print(f"  - {row[0]}: {row[1]}")
        
    # Update status to published
    cursor.execute("UPDATE cms_pages SET status = 'published' WHERE status IS NULL OR status = 'draft';")
    conn.commit()
    
    # Check again
    cursor.execute("SELECT slug, status FROM cms_pages;")
    print("\nAfter fix:")
    for row in cursor.fetchall():
        print(f"  - {row[0]}: {row[1]}")
        
    conn.close()

if __name__ == '__main__':
    fix_status()
