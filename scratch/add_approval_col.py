import sqlite3
import os

db_path = os.path.join(os.getcwd(), 'backend', 'sql_app.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    print(f"Adding 'is_approved' column to 'users' table in {db_path}...")
    cursor.execute("ALTER TABLE users ADD COLUMN is_approved BOOLEAN DEFAULT 0")
    conn.commit()
    print("Column added successfully.")
except sqlite3.OperationalError as e:
    if "duplicate column name" in str(e).lower():
        print("Column 'is_approved' already exists.")
    else:
        print(f"Error: {e}")
finally:
    conn.close()
