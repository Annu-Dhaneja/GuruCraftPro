import sys
import os
import sqlite3
from pathlib import Path

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

print("Deleting old site_config from db...")
db_path = os.path.join(os.path.dirname(__file__), 'backend', 'sql_app.db')
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute("DELETE FROM pages WHERE slug='site_config'")
    conn.commit()
    conn.close()
    print("Deleted successfully. Now reseeding...")

    try:
        from main import startup_db_sync
        startup_db_sync()
        print("Reseed complete!")
    except Exception as e:
        print("Error reseeding:", e)
else:
    print("DB not found at", db_path)
