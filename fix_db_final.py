import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def fix_schema_and_hashes():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if db_url and "render.com" in db_url and "sslmode" not in db_url:
        if "?" in db_url:
            db_url += "&sslmode=require"
        else:
            db_url += "?sslmode=require"
            
    engine = create_engine(db_url)
    
    # Verified 60-character hashes
    annu_hash = "$2b$12$gOCL0AAeQ75XWXq9kGG1B.8pbtUBWhhUuEQrAFOknmqAYzp6zM3Le"
    om_hash = "$2b$12$C4QUgrqza4m2vKiIcdFEWepDTD07VgaTfR2bIGP80x1SkMCE0Fg2"
    
    commands = [
        "ALTER TABLE users ALTER COLUMN hashed_password TYPE VARCHAR(255);",
        "UPDATE users SET hashed_password = :h1 WHERE username = 'annuad@#05';",
        "UPDATE users SET hashed_password = :h2 WHERE username = 'Om@Op';"
    ]
    
    try:
        with engine.begin() as conn:
            for cmd in commands:
                print(f"Executing: {cmd[:40]}...")
                conn.execute(text(cmd), {"h1": annu_hash, "h2": om_hash})
            print("SCHEMA AND HASHES FIXED.")
            
            # Final Verify
            res = conn.execute(text("SELECT username, length(hashed_password) FROM users"))
            for r in res:
                print(f"FINAL -> {r[0]}: {r[1]} characters")
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    fix_schema_and_hashes()
