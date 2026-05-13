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
    attachment_url = Column(String, nullable=True)
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


# ── LUXURY ECOSYSTEM MODELS ──────────────────────────────────────────

class Design(Base):
    """Stores user-created Canva-like designs."""
    __tablename__ = "designs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String, default="Untitled Design")
    type = Column(String) # logo, banner, social, etc.
    canvas_json = Column(Text) # The serialized state of the layers
    thumbnail_url = Column(String, nullable=True)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User")


class WeddingPlan(Base):
    """Stores AI-powered wedding planning data."""
    __tablename__ = "wedding_plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    partner_names = Column(String, nullable=True) # e.g. "Aditya & Ananya"
    wedding_date = Column(DateTime, nullable=True)
    location = Column(String, nullable=True)
    total_budget = Column(Integer, default=0)
    guest_count = Column(Integer, default=0)
    priority = Column(String, default="Decor")
    allocation_json = Column(Text, default="{}") # AI generated budget split
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User")

class WeddingTask(Base):
    """Stores wedding milestones and tasks."""
    __tablename__ = "wedding_tasks"

    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    title = Column(String)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime, nullable=True)
    status = Column(String, default="pending") # pending, in_progress, completed
    category = Column(String, default="General") # Decor, Catering, etc.
    priority = Column(String, default="Medium") # Low, Medium, High
    created_at = Column(DateTime, default=datetime.utcnow)

    wedding = relationship("WeddingPlan")

class WeddingGuest(Base):
    """Stores guest list and RSVP status."""
    __tablename__ = "wedding_guests"

    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    name = Column(String)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    category = Column(String, default="Friend") # Family, Friend, Colleague
    status = Column(String, default="pending") # pending, confirmed, declined
    plus_one = Column(Boolean, default=False)
    dietary_reqs = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    wedding = relationship("WeddingPlan")

class WeddingVendor(Base):
    """Stores vendors and their payment status."""
    __tablename__ = "wedding_vendors"

    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    name = Column(String)
    category = Column(String) # Photography, Catering, Decor, etc.
    contact_person = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    total_quote = Column(Integer, default=0)
    paid_amount = Column(Integer, default=0)
    status = Column(String, default="hired") # scouting, hired, completed
    contract_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    wedding = relationship("WeddingPlan")

class WeddingBudget(Base):
    """Stores budget allocation per category."""
    __tablename__ = "wedding_budgets"

    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    category = Column(String)
    allocated_amount = Column(Integer, default=0)
    spent_amount = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    wedding = relationship("WeddingPlan")


class Product(Base):
    """Stores luxury shop products."""
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)
    price = Column(Integer)
    category = Column(String, index=True)
    image_url = Column(String)
    inventory_count = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)
    metadata_json = Column(Text, default="{}") # For extra attributes
    created_at = Column(DateTime, default=datetime.utcnow)

    order_items = relationship("OrderItem", back_populates="product")


class Order(Base):
    """Stores e-commerce orders."""
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    total_amount = Column(Integer)
    status = Column(String, default="pending") # pending, paid, shipped, delivered, cancelled
    payment_intent_id = Column(String, nullable=True)
    shipping_address = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    """Bridge for Order and Product."""
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    price_at_purchase = Column(Integer)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
