from core.database import SessionLocal
from core.models import Page, Section, ContentBlock
import json

db = SessionLocal()
try:
    pages = db.query(Page).all()
    print(f"Total Pages: {len(pages)}")
    for p in pages:
        print(f"Page: {p.slug}")
        for s in p.sections:
            print(f"  Section: {s.section_name} ({len(s.blocks)} blocks)")
            # for b in s.blocks:
            #     print(f"    - {b.key}: {b.value[:50]}...")
finally:
    db.close()
