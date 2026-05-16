import sqlite3
import os

db_path = os.path.join(os.getcwd(), 'backend', 'sql_app.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    print("Columns in 'users' table:")
    cursor.execute("PRAGMA table_info(users)")
    for row in cursor.fetchall():
        print(row)
finally:
    conn.close()
