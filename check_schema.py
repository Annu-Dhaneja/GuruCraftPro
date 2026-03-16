import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def check_schema():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url and "sslmode" not in db_url:
        db_url += "?sslmode=require"
    
    engine = create_engine(db_url)
    sql = "SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = 'users';"
    
    try:
        with engine.connect() as conn:
            res = conn.execute(text(sql))
            for r in res:
                print(f"Col: {r.column_name}, Type: {r.data_type}, Max: {r.character_maximum_length}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_schema()
