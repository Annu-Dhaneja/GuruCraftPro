import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Add backend to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(backend_dir, "backend"))

load_dotenv(dotenv_path=os.path.join(backend_dir, "backend", ".env"))

from core.database import SessionLocal
from core.models import Page, Section, ContentBlock, User, Media, Post

db = SessionLocal()
try:
    print("--- DB AUDIT REPORT ---")
    print(f"Total Users: {db.query(User).count()}")
    print(f"Total Pages: {db.query(Page).count()}")
    print(f"Total Sections: {db.query(Section).count()}")
    print(f"Total Content Blocks: {db.query(ContentBlock).count()}")
    print(f"Total Media Assets: {db.query(Media).count()}")
    print(f"Total Blog Posts: {db.query(Post).count()}")
    
    pages = db.query(Page).all()
    for p in pages:
        sections = [s.section_name for s in p.sections]
        print(f"Page [{p.slug}]: Sections -> {sections}")
    
    print("--- DB AUDIT COMPLETE ---")
finally:
    db.close()
