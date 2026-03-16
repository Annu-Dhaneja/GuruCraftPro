import sqlite3
import os

def get_schema():
    db_path = 'e:/Project/virtual_try-main/backend/sql_app.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    try:
        cursor.execute("PRAGMA table_info(users);")
        columns = cursor.fetchall()
        print("Columns in 'users':")
        for col in columns:
            print(f"  {col[1]} ({col[2]})")
            
        cursor.execute("SELECT * FROM users LIMIT 1;")
        row = cursor.fetchone()
        if row:
            print(f"Sample User Row: {row}")
        else:
            print("No users in table.")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    get_schema()
