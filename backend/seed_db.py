import sys
import os
from pathlib import Path

# Add the backend directory to path so we can import properly
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(backend_dir)

from core.database import SessionLocal, engine, Base
from core import models, auth
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(backend_dir, ".env"))

def seed_data():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Support multiple admins via environment variables
    admin1_user = os.getenv("ADMIN_USERNAME_1")
    admin1_pass = os.getenv("ADMIN_PASSWORD_1")
    admin2_user = os.getenv("ADMIN_USERNAME_2")
    admin2_pass = os.getenv("ADMIN_PASSWORD_2")

    users_to_seed = []
    if admin1_user and admin1_pass:
        users_to_seed.append({"username": admin1_user, "password": admin1_pass})
    if admin2_user and admin2_pass:
        users_to_seed.append({"username": admin2_user, "password": admin2_pass})

    if not users_to_seed:
        print("No admin credentials found in environment variables. Skipping seed.")
        return
    
    # Admin Users Seeding
    print("Starting user seeding...")

    for user_info in users_to_seed:
        try:
            db_user = db.query(models.User).filter(models.User.username == user_info["username"]).first()
            if not db_user:
                hashed_pwd = auth.get_password_hash(user_info["password"])
                # Extract role/email if present, or defaults
                new_user = models.User(
                    username=user_info["username"], 
                    hashed_password=hashed_pwd,
                    name=user_info["username"].capitalize(),
                    email=f"{user_info['username']}@annudesign.com",
                    role=models.UserRole.ADMIN
                )
                db.add(new_user)
                db.commit()
                print(f"User {user_info['username']} stored in Database.")
            else:
                print(f"User {user_info['username']} verified in Database.")
        except Exception as e:
            import traceback
            print(f"Error seeding user {user_info['username']}: {e}")
            traceback.print_exc()
            db.rollback()

    # --- ADVANCED CMS MIGRATION & SEEDING ---
    
    def migrate_segment_to_relational(segment: str, data: Dict[str, Any]):
        # Get or create page
        page = db.query(models.Page).filter(models.Page.slug == segment).first()
        if not page:
            page = models.Page(title=segment.capitalize(), slug=segment)
            db.add(page)
            db.flush()

        # Check if data is nested by sections or a single flat dict
        # Our existing system uses segment names as the primary key
        # We'll treat the segment as a page and the segment name as a section
        
        # SPECIAL CASE: if it's 'faq' or 'settings' or 'home', we've seen their structure
        section_name = segment
        
        section = db.query(models.Section).filter(models.Section.page_id == page.id, models.Section.section_name == section_name).first()
        if not section:
            section = models.Section(page_id=page.id, section_name=section_name)
            db.add(section)
            db.flush()

        # Update or create blocks
        for key, value in data.items():
            content_type = "text"
            val_str = str(value)
            if isinstance(value, (dict, list)):
                content_type = "json"
                val_str = json.dumps(value)
            
            block = db.query(models.ContentBlock).filter(models.ContentBlock.section_id == section.id, models.ContentBlock.key == key).first()
            if block:
                block.value = val_str
                block.content_type = content_type
            else:
                block = models.ContentBlock(section_id=section.id, key=key, value=val_str, content_type=content_type)
                db.add(block)

    # Initial Seeding for new structure
    print("Starting granular CMS migration...")
    
    # 1. Look for existing CMSContent records and move them
    # (Since we just deleted the model in code, we might need a temporary query if DB still has it, 
    # but seed_db.py creates tables from scratch if Base.metadata.create_all is called)
    # So we'll rely on the JSON files in data/ for the source of truth during this migration.

    DATA_DIR = Path(os.path.dirname(__file__)) / "data"
    if DATA_DIR.exists():
        import json
        for json_file in DATA_DIR.glob("*.json"):
            segment = json_file.stem.replace("_content", "")
            try:
                with open(json_file, "r", encoding="utf-8") as f:
                    content = json.load(f)
                    migrate_segment_to_relational(segment, content)
                    print(f"Migrated {segment} to relational structure.")
            except Exception as e:
                print(f"Error migrating {segment}: {e}")

    db.commit()
    print("Advanced CMS Seeding completed.")
    db.close()

if __name__ == "__main__":
    print("Seed process started...")
    seed_data()
    print("Seed process completed.")
