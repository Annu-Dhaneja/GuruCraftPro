import sqlite3
import os

def check_db_tables(db_path):
    print(f"\n--- Checking Tables in {db_path} ---")
    if not os.path.exists(db_path):
        print(f"File {db_path} does not exist")
        return
        
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [t[0] for t in cursor.fetchall()]
        print(f"Tables: {', '.join(tables)}")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_db_tables("sql_app.db")
    check_db_tables("backend/sql_app.db")
