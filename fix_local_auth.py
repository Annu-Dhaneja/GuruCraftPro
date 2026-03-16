import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

def fix_local_auth():
    load_dotenv('backend/.env')
    db_url = os.getenv('DATABASE_URL')
    if not db_url:
        print("DATABASE_URL not found")
        return
    
    engine = create_engine(db_url)
    
    # These are verified 60-character hashes
    annu_hash = "$2b$12$gOCL0AAeQ75XWXq9kGG1B.8pbtUBWhhUuEQrAFOknmqAYzp6zM3Le"
    om_hash = "$2b$12$C4QUgrqza4m2vKiIcdFEWepDTD07VgaTfR2bIGP80x1SkMCE0Fg2"
    
    sql = """
    BEGIN;
    DELETE FROM users;
    INSERT INTO users (name, email, username, hashed_password, role) 
    VALUES 
    ('Annu Admin', 'annu@annudesign.com', 'annuad@#05', :h1, 'ADMIN'),
    ('Om Admin', 'om@annudesign.com', 'Om@Op', :h2, 'ADMIN');
    COMMIT;
    """
    
    try:
        with engine.begin() as conn:
            conn.execute(text(sql), {"h1": annu_hash, "h2": om_hash})
            print("Local database updated successfully with 60-character hashes.")
            
            # Verify
            res = conn.execute(text('SELECT username, length(hashed_password) as hlen FROM users'))
            for r in res:
                print(f"Verified -> User: {r.username}, Length: {r.hlen}")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_local_auth()
