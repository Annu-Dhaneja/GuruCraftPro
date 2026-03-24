import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from core.config import settings
from core.database import Base, engine
from routers import admin_cms, admin_contacts, ai_lab, clothing_consultation, contact, user

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


# ── CORS MUST be registered BEFORE routes ────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_sync() -> None:
    """
    On every boot:
    1) Migrate old Enum columns to VARCHAR (safe for PostgreSQL)
    2) Upsert admin users from environment variables
    3) Ensure minimal CMS home content exists
    """
    from core import auth, database, models
    from repositories.cms import cms_repository

    db = next(database.get_db())

    # ── 0. Migrate Enum columns to VARCHAR (only needed once, safe to re-run) ──
    try:
        with engine.connect() as conn:
            # Check if we're on PostgreSQL (not SQLite)
            dialect = engine.dialect.name
            if dialect == "postgresql":
                # Convert role column from enum to varchar
                conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR USING role::text"))
                # Convert status columns from enum to varchar  
                conn.execute(text("ALTER TABLE pages ALTER COLUMN status TYPE VARCHAR USING status::text"))
                conn.execute(text("ALTER TABLE posts ALTER COLUMN status TYPE VARCHAR USING status::text"))
                # Drop the old enum types if they exist
                conn.execute(text("DROP TYPE IF EXISTS userrole CASCADE"))
                conn.execute(text("DROP TYPE IF EXISTS pagestatus CASCADE"))
                conn.commit()
                print("Startup: Enum→VARCHAR migration complete")
    except Exception as exc:
        print(f"Startup: Enum migration skipped (already done or N/A): {exc}")

    # ── 1. Seed admin users ──────────────────────────────────────────
    try:
        admin_pairs = [
            (os.getenv("ADMIN_USERNAME_1"), os.getenv("ADMIN_PASSWORD_1")),
            (os.getenv("ADMIN_USERNAME_2"), os.getenv("ADMIN_PASSWORD_2")),
        ]
        synced = []

        for uname, pwd in admin_pairs:
            if not uname or not pwd:
                continue

            row = db.query(models.User).filter(models.User.username == uname).first()
            hashed = auth.get_password_hash(pwd)

            if row:
                row.hashed_password = hashed
                row.role = "admin"
            else:
                db.add(models.User(
                    username=uname,
                    hashed_password=hashed,
                    role="admin",
                ))
            synced.append(uname)

        db.commit()
        print(f"Startup: admin sync OK → {synced or 'no env vars'}")
    except Exception as exc:
        db.rollback()
        print(f"Startup: admin sync FAILED → {exc}")

    # ── 2. Seed CMS home page ────────────────────────────────────────
    try:
        if not db.query(models.Page).filter(models.Page.slug == "home").first():
            cms_repository.update_page_content(db, "home", {
                "hero": {
                    "badge": "AI DESIGN STUDIO",
                    "headline_prefix": "Transform Your",
                    "headline_highlight": "Virtual Identity",
                    "headline_suffix": "Seamlessly",
                    "subheadline": "Experience the future of fashion with our AI-powered try-on technology.",
                }
            })
            
        # Seed site_config (Nav, Footer, Logo)
        if not db.query(models.Page).filter(models.Page.slug == "site_config").first():
            cms_repository.update_page_content(db, "site_config", {
                "brand": {
                    "name": "GurucraftPro",
                    "logo_text": "G",
                    "logo_url": "/img/brand/logo.svg",
                    "tagline": "Crafting digital excellence through the perfect blend of AI technology and human artistic vision."
                },
                "nav": [
                    {"label": "Home", "href": "/", "style": "default"},
                    {"label": "Portfolio", "href": "/portfolio", "style": "default"},
                    {"label": "AI Design Lab", "href": "/ai-lab", "style": "special"},
                    {"label": "Guru Ji Art Work", "href": "/guruji-darshan", "style": "guru"},
                    {"label": "Services", "href": "/services", "style": "default"},
                    {"label": "About", "href": "/about", "style": "default"},
                    {"label": "Contact", "href": "/contact", "style": "default"}
                ],
                "social": {
                    "instagram": "https://instagram.com/gurucraftpro",
                    "dribbble": "#",
                    "linkedin": "#",
                    "twitter": "#",
                    "accepting_projects": True
                },
                "footer_explore": [
                    {"label": "Our Services", "href": "/services"},
                    {"label": "Design Portfolio", "href": "/portfolio"},
                    {"label": "AI Creative Lab", "href": "/ai-lab"},
                    {"label": "The Studio", "href": "/about"}
                ],
                "footer_support": [
                    {"label": "Custom Request", "href": "/request"},
                    {"label": "Privacy Policy", "href": "/privacy"},
                    {"label": "Support Center", "href": "/contact"}
                ],
                "footer_bottom": {
                    "copyright": "© 2026 GurucraftPro. All rights reserved."
                }
            })
            print("Startup: site_config SEEDED")
            
        # Seed guruji
        if not db.query(models.Page).filter(models.Page.slug == "guruji").first():
            cms_repository.update_page_content(db, "guruji", {
                "hero_title_prefix": "Guruji Ke",
                "hero_title_highlight": "Sakshat Darshan",
                "hero_subtitle": "Immerse yourself in divine energy with our cutting-edge AR technology and spiritual craftsmanship.",
                "ar_title_prefix": "Bringing Blessings",
                "ar_title_highlight": "Into Your Home",
                "ar_subtitle": "Our 'Guruji Ke Sakshat Darshan' feature uses high-fidelity 3D scanning and spatial computing to create an lifelike presence in your personal space.",
                "satsang_title_prefix": "Premium Guruji",
                "satsang_title_highlight": "Satsang Box",
                "satsang_subtitle": "A masterpiece of spiritual art and technology. The Satsang Story Box brings the sacred sounds of Bhajans and Mantras pre-loaded in a beautifully crafted box."
            })
            print("Startup: guruji SEEDED")
            
        # Seed AI Design Lab
        if not db.query(models.Page).filter(models.Page.slug == "ai_lab").first():
            cms_repository.update_page_content(db, "ai_lab", {
                "hero": {
                    "title": "Welcome to the AI Design Lab",
                    "subtitle": "Future of Creativity",
                    "description": "Explore cutting-edge tools and experiments that merge human creativity with artificial intelligence."
                },
                "tools": [
                    {
                        "title": "Style Reference Transfer",
                        "description": "Upload a reference image and instantly apply its unique aesthetic to any new design.",
                        "icon": "Image",
                        "status": "Active",
                        "color": "text-indigo-400",
                        "bg": "bg-indigo-500/10"
                    },
                    {
                        "title": "Smart Layout Generator",
                        "description": "Automatically generate conversion-optimized wireframes based on your industry and goals.",
                        "icon": "Layout",
                        "status": "Beta",
                        "color": "text-purple-400",
                        "bg": "bg-purple-500/10"
                    }
                ]
            })
            print("Startup: ai_lab SEEDED")

        # Seed Portfolio
        if not db.query(models.Page).filter(models.Page.slug == "portfolio").first():
            cms_repository.update_page_content(db, "portfolio", {
                "categories": ["All", "Web Design", "App UI", "Branding", "AI Art"],
                "projects": [
                    {
                        "id": "1",
                        "title": "Lumina App Redesign",
                        "category": "App UI",
                        "image": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600",
                        "client": "Lumina",
                        "date": "Jan 2024",
                        "description": "Complete UI/UX overhaul focusing on accessibility and modern aesthetics.",
                        "challenge": "Outdated interface causing high bounce rates.",
                        "solution": "Implemented a clean, dark-mode first design with intuitive navigation."
                    }
                ]
            })
            print("Startup: portfolio SEEDED")

        # Seed Resources
        if not db.query(models.Page).filter(models.Page.slug == "resources").first():
            cms_repository.update_page_content(db, "resources", {
                "hero": {
                    "title": "Learn & Master Design",
                    "description": "Free tutorials, premium UI kits, and advanced AI prompts to level up your workflow."
                },
                "categories": ["All Resources", "Design Tutorials", "AI & Design", "Branding", "UI/UX", "Free Assets"],
                "tutorials": [
                    { "title": "Figma 101: Auto-Layout Mastery", "category": "UI/UX", "duration": "12 mins" },
                    { "title": "Midjourney V6: Style Reference Guide", "category": "AI & Design", "duration": "18 mins" }
                ],
                "prompts": [
                    { "id": 1, "title": "Cyberpunk Cityscape", "text": "Futuristic city street at night...", "style": "Environment", "image": "https://images.unsplash.com/photo-1515630278258-407f66498911" }
                ]
            })
            print("Startup: resources SEEDED")

        # Seed Contact
        if not db.query(models.Page).filter(models.Page.slug == "contact").first():
            cms_repository.update_page_content(db, "contact", {
                "hero": {
                    "title": "Let's Build Something Extraordinary",
                    "description": "Ready to transform your vision into reality? We're here to help you every step of the way."
                },
                "alternatives": {
                    "title": "Or connect with us directly",
                    "email": "hello@annudesign.com",
                    "booking_link": "/book",
                    "booking_text": "Book a Free Consultation"
                },
                "process": {
                    "steps": [
                        { "icon": "MessageSquare", "title": "Message Received", "desc": "You submit the form." },
                        { "icon": "Clock", "title": "24h Review", "desc": "We analyze your request." },
                        { "icon": "UserCheck", "title": "Follow-up", "desc": "Proposal or questions." },
                        { "icon": "Rocket", "title": "Kickoff", "desc": "Project starts." }
                    ]
                },
                "faqs": [
                    { "q": "How soon will I get a reply?", "a": "Within 24-48 hours during business days." }
                ]
            })
            print("Startup: contact SEEDED")
            
        db.commit()
        print("Startup: CMS sync OK")
    except Exception as exc:
        db.rollback()
        print(f"Startup: CMS sync FAILED → {exc}")
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Annu Design Studio API Backend"}


@app.get("/health")
def health_check():
    """Check if the database is connected and working."""
    from core import database, models
    from sqlalchemy import text

    result = {"api": "ok"}

    try:
        db = next(database.get_db())

        # 1. Raw SQL ping
        db.execute(text("SELECT 1"))
        result["database"] = "connected"

        # 2. Count users
        user_count = db.query(models.User).count()
        result["users_in_db"] = user_count

        # 3. Show DB dialect (sqlite vs postgresql)
        result["db_type"] = engine.dialect.name

        # 4. List usernames (for debugging — remove later)
        users = db.query(models.User.username).all()
        result["usernames"] = [u[0] for u in users]

        db.close()
    except Exception as exc:
        result["database"] = "DISCONNECTED"
        result["error"] = str(exc)

    return result


# ── Routers ──────────────────────────────────────────────────────────
app.include_router(user.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["contact"])
app.include_router(ai_lab.router, prefix="/api/v1/ai-lab", tags=["ai-lab"])
app.include_router(clothing_consultation.router, prefix="/api/v1/consultation", tags=["consultation"])
app.include_router(admin_cms.router, prefix="/api/v1/cms", tags=["cms"])
app.include_router(admin_contacts.router, prefix="/api/v1/admin", tags=["admin"])
