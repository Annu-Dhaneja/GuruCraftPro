from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PostBase(BaseModel):
    title: str
    slug: str
    content: str
    status: str = "published"
    author_id: Optional[int] = 1

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = None

class Post(PostBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
