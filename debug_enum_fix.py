import os
import sys
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def check_db():
    backend_env = os.path.join('backend', '.env')
    load_dotenv(backend_env)
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found in backend/.env")
        return

    print(f"Connecting to database...")
    engine = create_engine(db_url)
    
    with engine.connect() as conn:
        print("\n--- ENUM TYPES ---")
        try:
            res = conn.execute(text("SELECT t.typname FROM pg_type t JOIN pg_namespace n ON n.oid = t.typnamespace WHERE n.nspname = 'public' AND t.typtype = 'e'"))
            enums = [r[0] for r in res]
            print(f"Enums found: {enums}")
            
            for enum_name in enums:
                res = conn.execute(text(f"SELECT enumlabel FROM pg_enum JOIN pg_type ON pg_type.oid = pg_enum.enum_typid WHERE pg_type.typname = '{enum_name}'"))
                labels = [r[0] for r in res]
                print(f"Labels for '{enum_name}': {labels}")
        except Exception as e:
            print(f"Error checking enums: {e}")

        print("\n--- USER TABLE SCHEMA ---")
        try:
            res = conn.execute(text("SELECT column_name, data_type, udt_name FROM information_schema.columns WHERE table_name = 'users'"))
            for r in res:
                print(f"Column: {r[0]}, Type: {r[1]}, UDT: {r[2]}")
        except Exception as e:
            print(f"Error checking schema: {e}")

if __name__ == "__main__":
    check_db()
