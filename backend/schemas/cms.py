from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from .base import AuditBase, SEOBase, StatusBase, SlugBase

class CMSComponentBase(BaseModel):
    name: str
    type: str
    props_json: str = "{}"

class CMSPageComponentRead(BaseModel):
    id: int
    component_id: int
    order: int
    props_json: str
    
    class Config:
        from_attributes = True

class CMSPageBase(SEOBase, StatusBase, SlugBase):
    title: str

class CMSPageCreate(CMSPageBase):
    pass

class CMSPageUpdate(SEOBase, StatusBase):
    title: Optional[str] = None
    slug: Optional[str] = None

class CMSPageRead(CMSPageBase, AuditBase):
    id: int
    components: List[CMSPageComponentRead] = []

class GlobalSettingsBase(BaseModel):
    site_name: str
    logo_url: Optional[str] = None
    contact_email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    footer_json: str = "{}"
    social_json: str = "{}"
    nav_json: str = "[]"
    theme_json: str = "{}"

class GlobalSettingsRead(GlobalSettingsBase, AuditBase):
    id: int
