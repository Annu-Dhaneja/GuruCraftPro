"""
Legacy CMS Repository - Now acts as a thin adapter to the V3 SSOT system.
All legacy Page/Section/ContentBlock logic has been migrated to CMSPage/CMSComponent/CMSPageComponent.
"""
import json
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from core.models import CMSPage, CMSComponent, CMSPageComponent
from repositories.cms_ssot import (
    get_ssot_page_content, update_ssot_page_content, 
    upsert_component, link_component_to_page
)


class CMSRepository:
    """Adapter that routes all legacy CMS calls to the V3 SSOT system."""

    def get_page_by_slug(self, db: Session, slug: str) -> Optional[CMSPage]:
        return db.query(CMSPage).filter(CMSPage.slug == slug).first()

    def get_flattened_content(self, db: Session, slug: str) -> Dict[str, Any]:
        """
        Fetches page content using the V3 SSOT system and flattens it
        to the legacy dict format (component name -> props).
        """
        ssot_data = get_ssot_page_content(db, slug)
        if not ssot_data or not ssot_data.get("components"):
            return {}

        flattened = {}
        for comp in ssot_data["components"]:
            name = comp.get("name")
            if name:
                flattened[name] = comp.get("props", {})
        return flattened

    def update_page_content(self, db: Session, slug: str, content: Dict[str, Any]) -> CMSPage:
        """
        Creates/updates a page using the V3 SSOT system.
        Accepts legacy flat dict format (section_name -> data).
        """
        update_ssot_page_content(db, slug, content)
        return db.query(CMSPage).filter(CMSPage.slug == slug).first()


cms_repository = CMSRepository()
