from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="admin")
    created_at = Column(DateTime, default=datetime.utcnow)

    posts = relationship("Post", back_populates="author")


class Page(Base):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    slug = Column(String, unique=True, index=True)
    meta_title = Column(String, nullable=True)
    meta_description = Column(String, nullable=True)
    status = Column(String, default="published")
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
    content_type = Column(String)
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
    status = Column(String, default="published")
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


class ClothingPiece(Base):
    __tablename__ = "clothing_pieces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    image_url = Column(String)
    gender = Column(String, index=True) # male, female, transgender
    age_group = Column(String, index=True) # baby, kids, teen, young_adult, adult, senior
    style = Column(String, index=True) # Formal, Casual, Traditional, Fusion
    category = Column(String, nullable=True, index=True) # e.g. "Topwear", "Bottomwear"
    season = Column(String, default="All", index=True) # Summer, Winter, All
    occasion = Column(String, default="Daily wear", index=True) # Office, Party, Daily wear, Wedding
    color = Column(String, nullable=True, index=True) # hex or name
    created_at = Column(DateTime, default=datetime.utcnow)


class SiteConfig(Base):
    __tablename__ = "site_configs"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True) # e.g. "social_links"
    value = Column(Text) # JSON string of settings
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ── NEW SSOT CMS MODELS ──────────────────────────────────────────────

class GlobalSettings(Base):
    """Stores data used across entire website (SSOT)."""
    __tablename__ = "global_settings"

    id = Column(Integer, primary_key=True, index=True)
    site_name = Column(String, default="GurucraftPro")
    logo_url = Column(String, nullable=True)
    contact_email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    footer_json = Column(Text, default="{}") # For links and copyright
    social_json = Column(Text, default="{}") # For social links
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ReusableSection(Base):
    """Each section stored once and potentially referenced multiple times."""
    __tablename__ = "reusable_sections"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True) # e.g. "Global Footer CTA"
    slug = Column(String, unique=True, index=True)
    type = Column(String) # hero, testimonial, faq, feature, cta
    content = Column(Text, default="{}") # JSON content
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class CMSPage(Base):
    """Each page references reusable sections."""
    __tablename__ = "cms_pages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    slug = Column(String, unique=True, index=True)
    meta_title = Column(String, nullable=True)
    meta_description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to sections through the bridge table
    sections = relationship("PageSectionAssociation", back_populates="page", cascade="all, delete-orphan", order_by="PageSectionAssociation.order")


class PageSectionAssociation(Base):
    """Bridge table for many-to-many relationship between pages and sections."""
    __tablename__ = "page_section_associations"

    id = Column(Integer, primary_key=True, index=True)
    page_id = Column(Integer, ForeignKey("cms_pages.id"))
    section_id = Column(Integer, ForeignKey("reusable_sections.id"))
    order = Column(Integer, default=0)

    page = relationship("CMSPage", back_populates="sections")
    section = relationship("ReusableSection")
