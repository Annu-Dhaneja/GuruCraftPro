from pydantic import BaseModel
from typing import List, Optional, Any
from .base import AuditBase, SEOBase, StatusBase, SlugBase

class ProductBase(SEOBase, StatusBase, SlugBase):
    name: str
    description: str
    price: int
    category: str
    image_url: str
    inventory_count: int = 100
    is_active: bool = True
    metadata_json: str = "{}"

class ProductCreate(ProductBase):
    pass

class ProductUpdate(SEOBase, StatusBase):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    inventory_count: Optional[int] = None
    is_active: Optional[bool] = None
    slug: Optional[str] = None

class ProductRead(ProductBase, AuditBase):
    id: int
