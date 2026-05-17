import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Path setup
backend_dir = r"e:\Project\virtual_try-main\backend"
sys.path.append(backend_dir)

# Load env IMMEDIATELY
load_dotenv(dotenv_path=os.path.join(backend_dir, ".env"))

# Retrieve production Supabase URL dynamically from environment
env_prod_url = os.getenv("PROD_DATABASE_URL") or os.getenv("DATABASE_URL")
if not env_prod_url or "sqlite" in env_prod_url:
    entered_url = input("Please enter your production PostgreSQL connection string (Supabase): ").strip()
    if entered_url:
        os.environ["DATABASE_URL"] = entered_url
else:
    os.environ["DATABASE_URL"] = env_prod_url

from core.database import SessionLocal, engine
from core import models, auth

def production_seed():
    db = SessionLocal()
    print(f"Targeting: {engine.url.host}")
    
    users = [
        {"u": os.getenv("ADMIN_USERNAME_1"), "p": os.getenv("ADMIN_PASSWORD_1")},
        {"u": os.getenv("ADMIN_USERNAME_2"), "p": os.getenv("ADMIN_PASSWORD_2")}
    ]
    
    for user_info in users:
        u = user_info["u"]
        p = user_info["p"]
        if not u or not p: continue
        
        db_user = db.query(models.User).filter(models.User.username == u).first()
        if not db_user:
            print(f"Creating Production Admin: {u}")
            new_user = models.User(
                username=u,
                hashed_password=auth.get_password_hash(p),
                name=u.split('@')[0].capitalize(),
                email=f"{u.replace('@','_')}@annudesign.com",
                role=models.UserRole.ADMIN
            )
            db.add(new_user)
            db.commit()
            print("Admin Created.")
        else:
            print(f"Admin {u} already exists on production.")
            
    db.close()

if __name__ == "__main__":
    production_seed()
