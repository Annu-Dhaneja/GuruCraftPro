from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from repositories.cms import cms_repository
from repositories.cms_ssot import get_ssot_page_content, update_ssot_page_content

class CMSService:
    @staticmethod
    def get_content(db: Session, section: str) -> Dict[str, Any]:
        """
        Unified content fetcher: Uses V3 SSOT system.
        """
        # Try V3 SSOT first
        ssot_data = get_ssot_page_content(db, section)
        if ssot_data and ssot_data.get("components"):
            return ssot_data
        
        # Fallback to flattened legacy adapter
        return cms_repository.get_flattened_content(db, section)

    @staticmethod
    def update_content(db: Session, section: str, content: Dict[str, Any]) -> Dict[str, Any]:
        """
        Unified content updater: All writes go through V3 SSOT.
        """
        update_ssot_page_content(db, section, content)
        return get_ssot_page_content(db, section)

cms_service = CMSService()
