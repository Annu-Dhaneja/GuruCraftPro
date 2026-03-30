from core.database import SessionLocal
from core.models import Page, Section, ContentBlock
import json

def fix_about_page():
    db = SessionLocal()
    try:
        page = db.query(Page).filter(Page.slug == "about").first()
        if not page:
            print("About page not found")
            return
        
        section = db.query(Section).filter(Section.page_id == page.id, Section.section_name == "about").first()
        if not section:
            print("About section not found")
            return
        
        # Check current blocks
        blocks = db.query(ContentBlock).filter(ContentBlock.section_id == section.id).all()
        block_keys = [b.key for b in blocks]
        print(f"Current keys in 'about' section: {block_keys}")
        
        defaults = {
            "services_preview": { "title": "What We Do", "services": [] },
            "about_cta": { "title": "Join our journey.", "link": "/contact" }
        }
        
        added = 0
        for key, val in defaults.items():
            if key not in block_keys:
                block = ContentBlock(
                    section_id=section.id,
                    key=key,
                    value=json.dumps(val),
                    content_type="json"
                )
                db.add(block)
                added += 1
                print(f"Added missing key: {key}")
        
        if added > 0:
            db.commit()
            print(f"Successfully added {added} missing keys to 'about' page.")
        else:
            print("No keys were missing.")
            
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_about_page()
