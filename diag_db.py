import psycopg2
import sys

import os
URL = os.getenv("PROD_DATABASE_URL") or os.getenv("DATABASE_URL")
if not URL or "sqlite" in URL:
    URL = input("Please enter your production PostgreSQL connection string (Supabase): ").strip()

try:
    print("Attempting direct connection...")
    conn = psycopg2.connect(URL)
    print("Success!")
    conn.close()
except Exception as e:
    print(f"Direct connection failed: {e}")
    sys.exit(1)
