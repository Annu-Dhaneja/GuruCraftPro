from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session
from core.models import Page, Section, ContentBlock, PageStatus
from .base import BaseRepository
import json

class CMSRepository(BaseRepository[Page]):
    def __init__(self):
        super().__init__(Page)

    def get_page_by_slug(self, db: Session, slug: str) -> Optional[Page]:
        return db.query(Page).filter(Page.slug == slug).first()

    def get_flattened_content(self, db: Session, slug: str) -> Dict[str, Any]:
        """
        Fetches all content blocks for a page and returns them as a 
        nested dictionary grouped by section_name.
        """
        page = self.get_page_by_slug(db, slug)
        if not page:
            return {}

        content = {}
        for section in page.sections:
            section_data = {}
            for block in section.blocks:
                # Handle different content types
                val = block.value
                if block.content_type == "json":
                    try:
                        val = json.loads(block.value)
                    except:
                        pass
                
                # Check if the key indicates an array or nested structure
                # This is a simplified mapper to maintain compatibility with existing CMS data
                section_data[block.key] = val
            
            # If the section name is 'global' or 'metadata', we might want to merge it 
            # or handle it specially. For now, group by section.
            content[section.section_name] = section_data
            
        # Special case: if the page only has one section and it's named the same as the slug,
        # we might want to return just that section's data to match old behavior.
        if slug in content:
            return content[slug]
            
        return content

    def update_page_content(self, db: Session, slug: str, content: Dict[str, Any]) -> Page:
        """
        Updates (or creates) the relational structure for a page based on a dictionary.
        """
        page = self.get_page_by_slug(db, slug)
        if not page:
            page = Page(title=slug.capitalize(), slug=slug, status=PageStatus.PUBLISHED)
            db.add(page)
            db.flush()

        # For simplicity in this specialized CMS, we'll recreate blocks for the updated sections
        # or update them. Here we'll handle the 'unflattening'
        
        # Determine if 'content' is the whole page or just one segment
        # If content has keys that match expected sections, treat it as full page
        # Otherwise, treat it as the segment data for 'slug'
        
        segments = {slug: content}
        # In our existing CMS, 'home', 'about', etc. often just send the segment data
        
        for section_name, data in segments.items():
            section = db.query(Section).filter(Section.page_id == page.id, Section.section_name == section_name).first()
            if not section:
                section = Section(page_id=page.id, section_name=section_name)
                db.add(section)
                db.flush()
            
            # Delete old blocks and recreate (simple sync)
            db.query(ContentBlock).filter(ContentBlock.section_id == section.id).delete()
            
            for key, value in data.items():
                content_type = "text"
                val_str = str(value)
                
                if isinstance(value, (dict, list)):
                    content_type = "json"
                    val_str = json.dumps(value)
                elif isinstance(value, bool):
                     content_type = "boolean"
                
                block = ContentBlock(
                    section_id=section.id,
                    key=key,
                    value=val_str,
                    content_type=content_type
                )
                db.add(block)
        
        db.commit()
        db.refresh(page)
        return page

cms_repository = CMSRepository()
