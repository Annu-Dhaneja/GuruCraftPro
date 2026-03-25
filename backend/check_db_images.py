import os
import sys
import json

# Add the current directory to sys.path to allow imports from core
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from core.models import Media, ContentBlock, Post

def check_db_images():
    db = SessionLocal()
    try:
        print("\nFirst 20 ContentBlock values:")
        for item in db.query(ContentBlock).limit(20):
            print(f"  {item.key}: {item.value[:100]}...")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_db_images()
