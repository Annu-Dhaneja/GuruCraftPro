from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    # Aliases for robustness
    ADMIN_UPPER = "ADMIN"
    EDITOR_UPPER = "EDITOR"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.EDITOR)
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="author")

class PageStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"

class Page(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    slug = Column(String, unique=True, index=True)
    meta_title = Column(String, nullable=True)
    meta_description = Column(String, nullable=True)
    status = Column(Enum(PageStatus), default=PageStatus.PUBLISHED)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sections = relationship("Section", back_populates="page", cascade="all, delete-orphan", order_by="Section.position")

class Section(Base):
    __tablename__ = "sections"

    id = Column(Integer, primary_key=True, index=True)
    page_id = Column(Integer, ForeignKey("pages.id"))
    section_name = Column(String)
    position = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    page = relationship("Page", back_populates="sections")
    blocks = relationship("ContentBlock", back_populates="section", cascade="all, delete-orphan")

class ContentBlock(Base):
    __tablename__ = "content_blocks"

    id = Column(Integer, primary_key=True, index=True)
    section_id = Column(Integer, ForeignKey("sections.id"))
    key = Column(String, index=True)
    value = Column(Text)
    content_type = Column(String) # e.g., 'text', 'rich-text', 'image', 'json'
    created_at = Column(DateTime, default=datetime.utcnow)

    section = relationship("Section", back_populates="blocks")

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    file_url = Column(String)
    file_name = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    slug = Column(String, unique=True, index=True)
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(PageStatus), default=PageStatus.PUBLISHED)
    created_at = Column(DateTime, default=datetime.utcnow)

    author = relationship("User", back_populates="posts")

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    company = Column(String, nullable=True)
    inquiry_type = Column(String)
    message = Column(Text)
    budget = Column(String, nullable=True)
    deadline = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
