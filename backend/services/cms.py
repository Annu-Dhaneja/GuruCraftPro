from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from repositories.cms import cms_repository
from repositories.cms_ssot import get_ssot_page_content, update_ssot_page_content

class CMSService:
    @staticmethod
    def get_content(db: Session, section: str) -> Dict[str, Any]:
        """
        Hybrid content fetcher: Prefer SSOT (Relational Sections) over Legacy.
        """
        # 1. Try SSOT
        ssot_data = get_ssot_page_content(db, section)
        if ssot_data and ssot_data.get("sections"):
            return ssot_data
        
        # 2. Fallback to Legacy
        return cms_repository.get_flattened_content(db, section)

    @staticmethod
    def update_content(db: Session, section: str, content: Dict[str, Any]) -> Dict[str, Any]:
        """
        Hybrid content updater: Save to SSOT if it exists, otherwise use Legacy.
        """
        # If the content contains 'sections' array, it's definitely SSOT
        if "sections" in content:
            update_ssot_page_content(db, section, content)
            return get_ssot_page_content(db, section)
        
        # Fallback to legacy
        updated_page = cms_repository.update_page_content(db, section, content)
        return cms_repository.get_flattened_content(db, section)

cms_service = CMSService()
