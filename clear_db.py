import sqlite3
import os

db_path = os.path.join(os.path.dirname(__file__), 'backend', 'sql_app.db')
print("DB Path:", db_path)

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("DELETE FROM pages WHERE slug='site_config'")
    conn.commit()
    conn.close()
    print("Flushed site_config from DB")
else:
    print("Could not find db")
