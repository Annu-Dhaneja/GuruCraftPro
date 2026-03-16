from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Dict, Any

class HeroContent(BaseModel):
    badge: str
    headline_prefix: str
    headline_highlight: str
    headline_suffix: str
    subheadline: str

class TestimonialItem(BaseModel):
    id: int
    content: str
    author: str
    role: str
    rating: int

class TestimonialsContent(BaseModel):
    title: str
    list: List[TestimonialItem]

class SiteSettings(BaseModel):
    site_name: str
    contact_email: str
    contact_phone: Optional[str]
    address: Optional[str]
    social_links: Dict[str, str]
    meta_description: str

class CMSContentBase(BaseModel):
    section: str
    content: Dict[str, Any]

class CMSContentUpdate(BaseModel):
    content: Dict[str, Any]
