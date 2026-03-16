import sqlite3
import os

def audit_db():
    db_path = 'e:/Project/virtual_try-main/backend/sql_app.db'
    if not os.path.exists(db_path):
        print(f"DB not found at {db_path}")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables: {tables}")
        
        if ('users',) in tables:
            cursor.execute("SELECT id, username, email, hashed_password FROM users;")
            rows = cursor.fetchall()
            print(f"Users found: {len(rows)}")
            for row in rows:
                id, username, email, hashed_password = row
                print(f"  ID: {id}, Username: {username}, Email: {email}")
                print(f"  Hash: {hashed_password[:20]}...")
        else:
            print("Users table MISSING!")
            
    except Exception as e:
        print(f"Error auditing DB: {str(e)}")
    finally:
        conn.close()

if __name__ == "__main__":
    audit_db()
