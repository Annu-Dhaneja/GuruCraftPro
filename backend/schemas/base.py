from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List

class AuditBase(BaseModel):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    created_by_id: Optional[int] = None
    updated_by_id: Optional[int] = None
    
    model_config = ConfigDict(from_attributes=True)

class SEOBase(BaseModel):
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    og_image: Optional[str] = None
    canonical_url: Optional[str] = None

class StatusBase(BaseModel):
    status: str = "draft"
    published_at: Optional[datetime] = None

class SlugBase(BaseModel):
    slug: str

class ResponseBase(BaseModel):
    status: str = "success"
    message: Optional[str] = None
    data: Optional[dict] = None
