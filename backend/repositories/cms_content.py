"""
CMSContent Repository — SSOT flat JSON store.
Provides simple get/upsert helpers used by both the API router and the startup seeder.
"""
import json
from sqlalchemy.orm import Session
from core.models import CMSContent


def get_cms_content(db: Session, segment: str) -> dict:
    """Return the content dict for a segment, or {} if not found."""
    row = db.query(CMSContent).filter(CMSContent.segment == segment).first()
    if not row:
        return {}
    try:
        return json.loads(row.content)
    except Exception:
        return {}


def upsert_cms_content(db: Session, segment: str, content: dict) -> dict:
    """Insert or fully replace the content for a segment."""
    row = db.query(CMSContent).filter(CMSContent.segment == segment).first()
    content_str = json.dumps(content)
    if row:
        row.content = content_str
    else:
        db.add(CMSContent(segment=segment, content=content_str))
    db.commit()
    return content


def patch_cms_content(db: Session, segment: str, defaults: dict) -> None:
    """
    Merge defaults into existing content, only filling in missing keys.
    Will overwrite existing keys if force=True is not used, but never deletes.
    """
    current = get_cms_content(db, segment)
    updated = False
    for key, val in defaults.items():
        if key not in current:
            current[key] = val
            updated = True
        elif isinstance(val, list) and isinstance(current.get(key), list) and not current[key]:
            current[key] = val
            updated = True
        elif isinstance(val, dict) and isinstance(current.get(key), dict):
            for sub_k, sub_v in val.items():
                if sub_k not in current[key]:
                    current[key][sub_k] = sub_v
                    updated = True
    if updated:
        upsert_cms_content(db, segment, current)
        print(f"CMS: '{segment}' PATCHED ✅")
