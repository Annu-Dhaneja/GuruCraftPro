"""
SSOT CMS Repository - Reusable Sections & Page Mapping.
Provides helpers for dynamic page assembly and section management.
"""
import json
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from core.models import CMSPage, ReusableSection, PageSectionAssociation, GlobalSettings


def get_global_settings(db: Session) -> Dict[str, Any]:
    """Fetch site-wide settings (SSOT)."""
    settings = db.query(GlobalSettings).first()
    if not settings:
        return {}
    
    return {
        "site_name": settings.site_name,
        "logo_url": settings.logo_url,
        "contact_email": settings.contact_email,
        "phone": settings.phone,
        "address": settings.address,
        "footer": json.loads(settings.footer_json),
        "social": json.loads(settings.social_json)
    }


def update_global_settings(db: Session, data: Dict[str, Any]) -> Dict[str, Any]:
    """Upsert site-wide settings."""
    settings = db.query(GlobalSettings).first()
    if not settings:
        settings = GlobalSettings()
        db.add(settings)
    
    if "site_name" in data: settings.site_name = data["site_name"]
    if "logo_url" in data: settings.logo_url = data["logo_url"]
    if "contact_email" in data: settings.contact_email = data["contact_email"]
    if "phone" in data: settings.phone = data["phone"]
    if "address" in data: settings.address = data["address"]
    if "footer" in data: settings.footer_json = json.dumps(data["footer"])
    if "social" in data: settings.social_json = json.dumps(data["social"])
    
    db.commit()
    db.refresh(settings)
    return get_global_settings(db)


def get_ssot_page_content(db: Session, slug: str) -> Dict[str, Any]:
    """
    Assembles a page by fetching its reusable sections in order.
    Returns a unified object for the frontend.
    """
    page = db.query(CMSPage).filter(CMSPage.slug == slug).first()
    if not page:
        return {}

    sections = []
    for assoc in page.sections:
        section = assoc.section
        try:
            content = json.loads(section.content)
        except:
            content = {}
            
        sections.append({
            "id": section.id,
            "type": section.type,
            "slug": section.slug,
            "content": content
        })

    return {
        "title": page.title,
        "slug": page.slug,
        "meta": {
            "title": page.meta_title,
            "description": page.meta_description
        },
        "sections": sections
    }


def upsert_reusable_section(db: Session, slug: str, section_type: str, content: Dict[str, Any], name: Optional[str] = None) -> ReusableSection:
    """Creates or updates a centralized section block."""
    section = db.query(ReusableSection).filter(ReusableSection.slug == slug).first()
    if not section:
        section = ReusableSection(
            slug=slug, 
            name=name or slug.replace("-", " ").title(),
            type=section_type
        )
        db.add(section)
    
    section.content = json.dumps(content)
    db.commit()
    db.refresh(section)
    return section


def link_section_to_page(db: Session, page_slug: str, section_slug: str, order: int = 0) -> bool:
    """Connects a reusable section to a page with a specific order."""
    page = db.query(CMSPage).filter(CMSPage.slug == page_slug).first()
    if not page:
        page = CMSPage(title=page_slug.title(), slug=page_slug)
        db.add(page)
        db.flush()

    section = db.query(ReusableSection).filter(ReusableSection.slug == section_slug).first()
    if not section:
        return False

    # Check if already linked
    assoc = db.query(PageSectionAssociation).filter(
        PageSectionAssociation.page_id == page.id,
        PageSectionAssociation.section_id == section.id
    ).first()

    if not assoc:
        assoc = PageSectionAssociation(page_id=page.id, section_id=section.id, order=order)
        db.add(assoc)
    else:
        assoc.order = order

    db.commit()
    return True
