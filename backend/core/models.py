from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class AuditMixin:
    """Provides standard audit and soft-delete fields for all models."""
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)
    
    # Audit fields: track user IDs (FK to users.id added later or handled as Integer for decoupled sync)
    created_by_id = Column(Integer, nullable=True)
    updated_by_id = Column(Integer, nullable=True)

class SEOMixin:
    """Standard SEO fields for manageable content."""
    meta_title = Column(String(200), nullable=True)
    meta_description = Column(String(500), nullable=True)
    meta_keywords = Column(String(500), nullable=True)
    og_image = Column(String(500), nullable=True)
    canonical_url = Column(String(500), nullable=True)

class StatusMixin:
    """Workflow status for content management."""
    # Status: draft, published, archived
    status = Column(String(20), default="draft", index=True)
    published_at = Column(DateTime, nullable=True)

class SlugMixin:
    """Universal slug management."""
    slug = Column(String(200), unique=True, index=True)

# ── RBAC SYSTEM ────────────────────────────────────────────────────────
class Role(Base, AuditMixin):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True) # e.g. "admin", "editor", "user"
    description = Column(String, nullable=True)
    permissions_json = Column(Text, default="{}") # e.g. {"cms": ["read", "write"]}

class User(Base, AuditMixin):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=True) # FK to roles
    role = Column(String, default="USER") # Standard Roles: SUPER_ADMIN, ADMIN, EDITOR, USER
    is_approved = Column(Boolean, default=False)
    
    role_rel = relationship("Role")
    posts = relationship("Post", back_populates="author")
    designs = relationship("Design", back_populates="user")
    orders = relationship("Order", back_populates="user")
    wedding_plans = relationship("WeddingPlan", back_populates="user")

# ── CMS V3 (UNIFIED DYNAMIC SYSTEM) ───────────────────────────────────

class GlobalSettings(Base, AuditMixin):
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
    nav_json = Column(Text, default="[]") # For navigation structure
    theme_json = Column(Text, default="{}") # Colors, fonts

class CMSPage(Base, AuditMixin, SEOMixin, StatusMixin, SlugMixin):
    """Universal Page Renderer Model."""
    __tablename__ = "cms_pages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    # Mixins handle: slug, meta_title, meta_description, status, timestamps, audit

    components = relationship("CMSPageComponent", back_populates="page", cascade="all, delete-orphan", order_by="CMSPageComponent.order")

class CMSComponent(Base, AuditMixin):
    """Reusable Component Definitions (e.g. Hero, Testimonials, Grid)."""
    __tablename__ = "cms_components"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    type = Column(String, index=True) # e.g. "hero", "feature_grid"
    schema_json = Column(Text, default="{}") # Defines what fields this component needs

class CMSPageComponent(Base):
    """Bridge table associating instances of Components to Pages."""
    __tablename__ = "cms_page_components"
    
    id = Column(Integer, primary_key=True, index=True)
    page_id = Column(Integer, ForeignKey("cms_pages.id"))
    component_id = Column(Integer, ForeignKey("cms_components.id"))
    order = Column(Integer, default=0)
    props_json = Column(Text, default="{}") # The actual content for THIS instance
    
    page = relationship("CMSPage", back_populates="components")
    component = relationship("CMSComponent")

# ── DYNAMIC FORM SYSTEM ────────────────────────────────────────────────

class Form(Base, AuditMixin):
    __tablename__ = "forms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    slug = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    config_json = Column(Text, default="{}") # webhooks, email notifications
    
    fields = relationship("FormField", back_populates="form", cascade="all, delete-orphan", order_by="FormField.order")
    submissions = relationship("FormSubmission", back_populates="form", cascade="all, delete-orphan")

class FormField(Base):
    __tablename__ = "form_fields"
    id = Column(Integer, primary_key=True, index=True)
    form_id = Column(Integer, ForeignKey("forms.id"))
    label = Column(String)
    type = Column(String) # text, email, select, checkbox
    required = Column(Boolean, default=False)
    order = Column(Integer, default=0)
    options_json = Column(Text, default="[]") # for select/radio
    
    form = relationship("Form", back_populates="fields")

class FormSubmission(Base):
    __tablename__ = "form_submissions"
    id = Column(Integer, primary_key=True, index=True)
    form_id = Column(Integer, ForeignKey("forms.id"))
    payload_json = Column(Text) # the submitted data
    created_at = Column(DateTime, default=datetime.utcnow)
    
    form = relationship("Form", back_populates="submissions")

# ── ENHANCED MEDIA MANAGER ─────────────────────────────────────────────

class MediaFolder(Base, AuditMixin):
    __tablename__ = "media_folders"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    parent_id = Column(Integer, ForeignKey("media_folders.id"), nullable=True)

class Media(Base, AuditMixin):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    file_url = Column(String)
    file_name = Column(String)
    mime_type = Column(String, nullable=True)
    size_bytes = Column(Integer, nullable=True)
    alt_text = Column(String, nullable=True)
    folder_id = Column(Integer, ForeignKey("media_folders.id"), nullable=True)
    tags_json = Column(Text, default="[]")
    uploaded_at = Column(DateTime, default=datetime.utcnow) # legacy support
    file_data_base64 = Column(Text, nullable=True)

# ── LEGACY & SAAS MODULES ──────────────────────────────────────────────
class Post(Base, AuditMixin, SEOMixin, StatusMixin, SlugMixin):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    content = Column(Text)
    author_id = Column(Integer, ForeignKey("users.id"))
    # Mixins handle: slug, meta_title, meta_description, status, timestamps, audit
    
    author = relationship("User", back_populates="posts")

class ContactSubmission(Base, AuditMixin):
    __tablename__ = "contact_submissions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String, nullable=True)
    company = Column(String, nullable=True)
    inquiry_type = Column(String)
    message = Column(Text)
    budget = Column(String, nullable=True)
    deadline = Column(String, nullable=True)
    attachment_url = Column(String, nullable=True)
    page_source = Column(String, nullable=True)
    status = Column(String, default="new", index=True)
    ip_address = Column(String, nullable=True)
    device_metadata = Column(String, nullable=True)

class ClothingPiece(Base, AuditMixin):
    __tablename__ = "clothing_pieces"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    image_url = Column(String)
    gender = Column(String, index=True)
    age_group = Column(String, index=True)
    style = Column(String, index=True)
    category = Column(String, nullable=True, index=True)
    season = Column(String, default="All", index=True)
    occasion = Column(String, default="Daily wear", index=True)
    color = Column(String, nullable=True, index=True)



class Design(Base, AuditMixin):
    __tablename__ = "designs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String, default="Untitled Design")
    type = Column(String)
    canvas_json = Column(Text)
    thumbnail_url = Column(String, nullable=True)
    is_public = Column(Boolean, default=False)
    user = relationship("User", back_populates="designs")

class WeddingPlan(Base, AuditMixin):
    __tablename__ = "wedding_plans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    partner_names = Column(String, nullable=True)
    wedding_date = Column(DateTime, nullable=True)
    location = Column(String, nullable=True)
    total_budget = Column(Integer, default=0)
    guest_count = Column(Integer, default=0)
    priority = Column(String, default="Decor")
    allocation_json = Column(Text, default="{}")
    user = relationship("User", back_populates="wedding_plans")
    tasks = relationship("WeddingTask", back_populates="wedding", cascade="all, delete-orphan")
    guests = relationship("WeddingGuest", back_populates="wedding", cascade="all, delete-orphan")
    vendors = relationship("WeddingVendor", back_populates="wedding", cascade="all, delete-orphan")
    budgets = relationship("WeddingBudget", back_populates="wedding", cascade="all, delete-orphan")

class WeddingTask(Base, AuditMixin):
    __tablename__ = "wedding_tasks"
    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    title = Column(String)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime, nullable=True)
    status = Column(String, default="pending")
    category = Column(String, default="General")
    priority = Column(String, default="Medium")
    wedding = relationship("WeddingPlan", back_populates="tasks")

class WeddingGuest(Base, AuditMixin):
    __tablename__ = "wedding_guests"
    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    name = Column(String)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    category = Column(String, default="Friend")
    status = Column(String, default="pending")
    plus_one = Column(Boolean, default=False)
    dietary_reqs = Column(Text, nullable=True)
    wedding = relationship("WeddingPlan", back_populates="guests")

class WeddingVendor(Base, AuditMixin):
    __tablename__ = "wedding_vendors"
    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    name = Column(String)
    category = Column(String)
    contact_person = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    total_quote = Column(Integer, default=0)
    paid_amount = Column(Integer, default=0)
    status = Column(String, default="hired")
    contract_url = Column(String, nullable=True)
    wedding = relationship("WeddingPlan", back_populates="vendors")

class WeddingBudget(Base, AuditMixin):
    __tablename__ = "wedding_budgets"
    id = Column(Integer, primary_key=True, index=True)
    wedding_id = Column(Integer, ForeignKey("wedding_plans.id"))
    category = Column(String)
    allocated_amount = Column(Integer, default=0)
    spent_amount = Column(Integer, default=0)
    wedding = relationship("WeddingPlan", back_populates="budgets")

class Product(Base, AuditMixin, SEOMixin, StatusMixin, SlugMixin):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    description = Column(Text)
    price = Column(Integer)
    category = Column(String(100), index=True)
    image_url = Column(String(500))
    inventory_count = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)
    metadata_json = Column(Text, default="{}")
    # Mixins handle: slug, meta_title, meta_description, status, timestamps, audit
    
    order_items = relationship("OrderItem", back_populates="product")

class Order(Base, AuditMixin):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    total_amount = Column(Integer)
    status = Column(String, default="pending")
    payment_intent_id = Column(String, nullable=True)
    shipping_address = Column(Text, nullable=True)
    user = relationship("User", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

class OrderItem(Base, AuditMixin):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    price_at_purchase = Column(Integer)
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
