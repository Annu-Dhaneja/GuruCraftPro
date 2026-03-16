import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Add the backend directory to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(backend_dir, "backend"))

from core.database import SessionLocal, engine, Base
from core import models, auth
from typing import Dict, Any

# Load env
load_dotenv(dotenv_path=os.path.join(backend_dir, "backend", ".env"))

def run_seed():
    db = SessionLocal()
    print("Starting Data Seed to Remote DB...")
    
    # 1. Seed Users
    users_to_seed = []
    if os.getenv("ADMIN_USERNAME_1"):
        users_to_seed.append({"username": os.getenv("ADMIN_USERNAME_1"), "password": os.getenv("ADMIN_PASSWORD_1")})
    if os.getenv("ADMIN_USERNAME_2"):
        users_to_seed.append({"username": os.getenv("ADMIN_USERNAME_2"), "password": os.getenv("ADMIN_PASSWORD_2")})

    for u in users_to_seed:
        try:
            db_user = db.query(models.User).filter(models.User.username == u["username"]).first()
            if not db_user:
                print(f"Adding user: {u['username']}")
                hashed_pwd = auth.get_password_hash(u["password"])
                new_user = models.User(
                    username=u["username"], 
                    hashed_password=hashed_pwd,
                    name=u["username"].split('@')[0].capitalize(),
                    email=f"{u['username'].replace('@','_')}@annudesign.com",
                    role=models.UserRole.ADMIN
                )
                db.add(new_user)
                db.commit()
                print(f"SUCCESS: User {u['username']} seeded.")
            else:
                print(f"SKIP: User {u['username']} already exists.")
        except Exception as e:
            print(f"FAILURE: User {u['username']} error: {e}")
            db.rollback()

    # 2. Seed a Test Page to verify relational works
    try:
        if not db.query(models.Page).filter(models.Page.slug == "home").first():
            print("Seeding Home Page...")
            home = models.Page(title="Home Page", slug="home")
            db.add(home)
            db.flush()
            
            hero_section = models.Section(page_id=home.id, section_name="hero", position=1)
            db.add(hero_section)
            db.flush()
            
            block = models.ContentBlock(
                section_id=hero_section.id,
                key="title",
                value="Annu Design Studio | AI-Assisted Design",
                content_type="text"
            )
            db.add(block)
            db.commit()
            print("SUCCESS: Home Page seeded.")
    except Exception as e:
        print(f"FAILURE: CMS Seeding error: {e}")
        db.rollback()

    db.close()

if __name__ == "__main__":
    run_seed()
