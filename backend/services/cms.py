from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from repositories.cms import cms_repository

class CMSService:
    @staticmethod
    def get_content(db: Session, section: str) -> Dict[str, Any]:
        """
        Retrieve CMS content for a given section/page slug.
        """
        # Under the new granular schema, 'section' maps to a page slug
        return cms_repository.get_flattened_content(db, section)

    @staticmethod
    def update_content(db: Session, section: str, content: Dict[str, Any]) -> Dict[str, Any]:
        """
        Update CMS content for a given section/page slug using relational blocks.
        """
        updated_page = cms_repository.update_page_content(db, section, content)
        # Return the flattened content to keep API compatibility
        return cms_repository.get_flattened_content(db, section)

cms_service = CMSService()
