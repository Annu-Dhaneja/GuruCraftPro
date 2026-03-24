import sqlite3
import os

def list_pages():
    db_path = 'e:/Project/virtual_try-main/backend/sql_app.db'
    if not os.path.exists(db_path):
        print(f"Database not found at {db_path}")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT slug, title FROM pages;")
        pages = cursor.fetchall()
        print("Existing Pages (Slugs):")
        for p in pages:
            print(f"  - {p[0]} ({p[1]})")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    list_pages()
