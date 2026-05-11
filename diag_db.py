import psycopg2
import sys

URL = "postgresql://annu_project_user:TWdBAMY4k7bHurZnY9sOEUHraNJdPk7E@dpg-d6rou5k50q8c73f6c8s0-a.oregon-postgres.render.com/annu_project?sslmode=require"

try:
    print("Attempting direct connection...")
    conn = psycopg2.connect(URL)
    print("Success!")
    conn.close()
except Exception as e:
    print(f"Direct connection failed: {e}")
    sys.exit(1)
