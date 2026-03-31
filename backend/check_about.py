import json
from core.database import SessionLocal
from core.models import CMSPage, Page, ContentBlock
from repositories.cms import cms_repository
from repositories.cms_ssot import get_ssot_page_content

def check_about():
    db = SessionLocal()
    try:
        # Check if it's in the new SSOT table
        ssot_page = db.query(CMSPage).filter(CMSPage.slug == "about").first()
        print(f"PAGE IN SSOT TABLE: {ssot_page is not None}")
        if ssot_page:
            data = get_ssot_page_content(db, "about")
            print("SSOT DATA STRUCTURE:")
            print(json.dumps(data, indent=2))
        
        # Check legacy data
        legacy_data = cms_repository.get_content(db, "about")
        print("LEGACY DATA STRUCTURE:")
        print(json.dumps(legacy_data, indent=2))
        
    finally:
        db.close()

if __name__ == "__main__":
    check_about()
