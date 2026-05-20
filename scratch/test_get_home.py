import os
import sys
import traceback
from pathlib import Path
from dotenv import load_dotenv

# Load backend env
env_path = Path("backend/.env")
load_dotenv(dotenv_path=env_path)

# Point to production Supabase
os.environ["DATABASE_URL"] = "postgresql://postgres:Oma628752%23Op@db.puprmtfdjsuiqlvtqfrh.supabase.co:5432/postgres"

sys.path.append(str(Path("backend").absolute()))

from core.database import SessionLocal
from repositories.cms_ssot import get_ssot_page_content

def main():
    print("Testing get_ssot_page_content for 'home' slug...")
    db = SessionLocal()
    try:
        content = get_ssot_page_content(db, "home", published_only=True)
        print("Success! Assembled content keys:", content.keys())
        print("Components count:", len(content.get("components", [])))
    except Exception as e:
        print("\n=== ERROR DETECTED ===")
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    main()
