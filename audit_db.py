import sqlite3
import json

def audit_db():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    print("--- Database Audit ---")
    
    # 1. Check Tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [t[0] for t in cursor.fetchall()]
    print(f"Tables: {', '.join(tables)}")
    
    # 2. Check for empty tables
    for table in tables:
        cursor.execute(f"SELECT COUNT(*) FROM {table}")
        count = cursor.fetchone()[0]
        print(f"Table '{table}' has {count} rows")
        
    # 3. Check for malformed JSON in content_blocks
    cursor.execute("SELECT section_id, key, value FROM content_blocks")
    blocks = cursor.fetchall()
    malformed = 0
    for sid, key, value in blocks:
        if value and (value.startswith('{') or value.startswith('[')):
            try:
                json.loads(value)
            except:
                print(f"Malformed JSON in block: section={sid}, key={key}")
                malformed += 1
    if malformed == 0:
        print("No malformed JSON found in content_blocks.")
    else:
        print(f"TOTAL MALFORMED BLOCKS: {malformed}")

    # 4. Check for 'about' page segments
    cursor.execute("SELECT section_name FROM sections WHERE section_name = 'about'")
    if cursor.fetchone():
        print("Page segment 'about' exists in sections.")
    else:
        print("Page segment 'about' MISSING from sections.")

    conn.close()

if __name__ == "__main__":
    audit_db()
