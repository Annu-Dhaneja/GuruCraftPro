import sqlite3
import json

def check_cms_data():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    # Check sections
    print("\n--- SECTIONS ---")
    cursor.execute("SELECT * FROM sections")
    sections = cursor.fetchall()
    for s in sections:
        print(s)
        
    # Check content_blocks
    print("\n--- CONTENT BLOCKS ---")
    cursor.execute("SELECT * FROM content_blocks LIMIT 10")
    blocks = cursor.fetchall()
    for b in blocks:
        print(b)
        
    # Check pages table (if it exists)
    print("\n--- PAGES ---")
    try:
        cursor.execute("SELECT * FROM pages")
        pages = cursor.fetchall()
        for p in pages:
            print(p)
    except:
        print("Pages table not found")

    conn.close()

if __name__ == "__main__":
    check_cms_data()
