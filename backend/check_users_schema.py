import sqlite3

def check_users_schema():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(users)")
    cols = cursor.fetchall()
    print("Users Table Columns:")
    for col in cols:
        print(col)
    conn.close()

if __name__ == "__main__":
    check_users_schema()
