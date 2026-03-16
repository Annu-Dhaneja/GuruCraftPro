import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Path setup
backend_dir = r"e:\Project\virtual_try-main\backend"
sys.path.append(backend_dir)

# Load env IMMEDIATELY
load_dotenv(dotenv_path=os.path.join(backend_dir, ".env"))

# FORCE ENV VARS for database module
os.environ["DATABASE_URL"] = "postgresql://annu_project_user:TWdBAMY4k7bHurZnY9sOEUHraNJdPk7E@dpg-d6rou5k50q8c73f6c8s0-a.oregon-postgres.render.com/annu_project?sslmode=require"

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
