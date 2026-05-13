import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, text

# Load environment variables from frontend/.env.local where your Supabase URL is stored
load_dotenv('../frontend/.env.local')

raw_url = (
    os.getenv("DATABASE_URL") or 
    os.getenv("VTO_POSTGRES_URL_NON_POOLING") or 
    os.getenv("VTO_POSTGRES_URL") or 
    os.getenv("POSTGRES_URL")
)

if not raw_url:
    print("Error: No database URL found in .env.local")
    exit(1)

# Clean and format URL
url = raw_url.strip().strip("'").strip('"')
if url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql://", 1)
if "sslmode" not in url:
    delimiter = "&" if "?" in url else "?"
    url += f"{delimiter}sslmode=require"

engine = create_engine(url)

def run_check():
    try:
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        
        print("\n" + "="*50)
        print("📊 GURU CRAFT PRO - DATABASE REPORT")
        print("="*50)
        print(f"{'TABLE NAME':<30} | {'ROWS':<10}")
        print("-" * 50)
        
        with engine.connect() as conn:
            for table in sorted(tables):
                count_query = text(f"SELECT COUNT(*) FROM {table}")
                count = conn.execute(count_query).scalar()
                print(f"{table:<30} | {count:<10}")
        
        print("="*50 + "\n")
        
    except Exception as e:
        print(f"❌ Connection Error: {e}")

if __name__ == "__main__":
    run_check()
