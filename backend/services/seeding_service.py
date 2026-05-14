import os
import json
from typing import Any, Dict, List
from sqlalchemy.orm import Session
from sqlalchemy import text
from core import auth, database, models
from repositories.cms import cms_repository
from repositories.cms_ssot import upsert_reusable_section, link_section_to_page, update_global_settings
from core.database import engine

class SeedingService:
    @staticmethod
    def run_all(db: Session):
        """Main entry point for all seeding logic."""
        print("SeedingService: Starting full sync...")
        SeedingService.migrate_enums(db)
        SeedingService.seed_admins(db)
        SeedingService.seed_site_config(db)
        SeedingService.seed_cms_pages(db)
        SeedingService.run_path_migrations(db)
        print("SeedingService: Full sync complete.")

    @staticmethod
    def migrate_enums(db: Session):
        try:
            with engine.connect() as conn:
                if engine.dialect.name == "postgresql":
                    conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR USING role::text"))
                    conn.execute(text("ALTER TABLE pages ALTER COLUMN status TYPE VARCHAR USING status::text"))
                    conn.execute(text("ALTER TABLE posts ALTER COLUMN status TYPE VARCHAR USING status::text"))
                    conn.execute(text("DROP TYPE IF EXISTS userrole CASCADE"))
                    conn.execute(text("DROP TYPE IF EXISTS pagestatus CASCADE"))
                    conn.commit()
                    print("SeedingService: Enum→VARCHAR migration complete")
        except Exception as exc:
            print(f"SeedingService: Enum migration skipped: {exc}")

    @staticmethod
    def seed_admins(db: Session):
        try:
            admin_pairs = [
                (os.getenv("ADMIN_USERNAME_1"), os.getenv("ADMIN_PASSWORD_1")),
                (os.getenv("ADMIN_USERNAME_2"), os.getenv("ADMIN_PASSWORD_2")),
            ]
            for uname, pwd in admin_pairs:
                if not uname or not pwd: continue
                row = db.query(models.User).filter(models.User.username == uname).first()
                hashed = auth.get_password_hash(pwd)
                if row:
                    row.hashed_password = hashed
                    row.role = "admin"
                else:
                    db.add(models.User(username=uname, hashed_password=hashed, role="admin"))
            db.commit()
        except Exception as exc:
            db.rollback()
            print(f"SeedingService: admin sync failed: {exc}")

    @staticmethod
    def seed_site_config(db: Session):
        try:
            if not db.query(models.Page).filter(models.Page.slug == "site_config").first():
                cms_repository.update_page_content(db, "site_config", {
                    "brand": {
                        "name": "GurucraftPro",
                        "logo_text": "G",
                        "logo_url": "/images/brand/logo-dark-v4.svg",
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
                        "facebook": "https://facebook.com/gurucraftpro",
                        "github": "https://github.com/om-prakash16",
                        "instagram": "https://instagram.com/gurucraftpro",
                        "linkedin": "https://linkedin.com/in/gurucraftpro",
                        "twitter": "https://twitter.com/gurucraftpro",
                        "whatsapp": "https://wa.me/918527837527"
                    },
                    "footer_explore": [
                        {"label": "Our Services", "href": "/services"},
                        {"label": "Design Portfolio", "href": "/portfolio"},
                        {"label": "AI Creative Lab", "href": "/ai-lab"},
                        {"label": "The Studio", "href": "/about"}
                    ],
                    "footer_bottom": {
                        "copyright": "© 2026 GurucraftPro. All rights reserved.",
                        "email": "hello@gurucraftpro.com"
                    }
                })
        except Exception as e:
            print(f"SeedingService: site_config failed: {e}")

    @staticmethod
    def seed_cms_pages(db: Session):
        pages = {
            "home": {
                "hero": {
                    "badge": "THE FUTURE OF DESIGN",
                    "headline_prefix": "Design at the speed of",
                    "headline_highlight": "Imagination",
                    "headline_suffix": ".",
                    "subheadline": "Combine AI-powered generation with expert human refinement to create polished brand, UI, and marketing assets faster."
                },
                "trust_strip": {
                    "stats": [
                        {"label": "Designs Delivered", "value": "150+"},
                        {"label": "Client Satisfaction", "value": "98%"},
                        {"label": "AI Turnaround", "value": "24h"}
                    ],
                    "companies": [
                        {"name": "Adobe", "logo": "https://cdn.simpleicons.org/adobe/ffffff"},
                        {"name": "Figma", "logo": "https://cdn.simpleicons.org/figma/ffffff"},
                        {"name": "Stripe", "logo": "https://cdn.simpleicons.org/stripe/ffffff"}
                    ]
                }
            },
            "about": {
                "hero": {
                    "badge": "ABOUT US",
                    "title_prefix": "Where Technology Meets",
                    "title_highlight": "Thoughtful Design",
                    "description": "We are a multidisciplinary studio obsessed with the intersection of art and technology."
                }
            },
            "guru-ji-art": {
                "hero": {
                    "badge": "Sacred Digital Presence",
                    "title_prefix": "Immerse in",
                    "title_highlight": "Divine Wisdom",
                    "description": "Experience the intersection of ancient spirituality and modern artistry through AI-curated vachans and high-fidelity 3D spiritual assets."
                },
                "vachan": {
                    "badge": "Daily Vachan",
                    "quote": "\"Infinite peace begins within the soul.\"",
                    "description": "Receive a personalized AI-generated spiritual quote every morning based on your journey and meditation goals."
                },
                "store": {
                    "title_prefix": "Sacred",
                    "title_highlight": "Store"
                }
            },
            "vantage-ecom": {
                "hero": {
                    "badge": "VANTAGE PLATFORM V2.0",
                    "title_prefix": "The Future of",
                    "title_highlight": "E-Commerce",
                    "description": "Vantage is more than a store—it's a high-performance ecosystem. AI-driven automation, lightning-fast interfaces, and data-backed conversion science.",
                    "stats": [
                        {"label": "Conversion Lift", "value": "+40%"},
                        {"label": "Page Speed", "value": "< 1.2s"},
                        {"label": "Uptime", "value": "99.9%"},
                        {"label": "ROI Average", "value": "x12"}
                    ]
                },
                "features": {
                    "title": "Built for Scale",
                    "description": "Enterprise-grade architecture tailored for high-growth brands. Everything you need to dominate your niche.",
                    "items": [
                        {"icon": "Layout", "title": "Modern Storefront", "desc": "Headless CMS integration with Next.js for sub-second page loads."},
                        {"icon": "ShoppingCart", "title": "Smart Checkout", "desc": "1-click payments and dynamic cart recovery systems."},
                        {"icon": "BarChart3", "title": "Deep Analytics", "desc": "Track every customer touchpoint with integrated BI tools."},
                        {"icon": "Globe", "title": "Global Ready", "desc": "Multi-currency, multi-language, and localized tax systems."},
                        {"icon": "ShieldCheck", "title": "Safe & Secure", "desc": "PCI compliance and advanced fraud protection built-in."},
                        {"icon": "Cloud", "title": "Cloud Scale", "desc": "Auto-scaling infrastructure to handle massive traffic spikes."}
                    ]
                }
            },
            "7-day-clothing-consultation": {
                "hero": {
                    "title": "7-Day \n Consultation",
                    "badge": "NEURAL WARDROBE V4.2",
                    "title_prefix": "AI-Powered",
                    "title_highlight": "Style Architecture",
                    "description": "Stop worrying about what to wear. Our Neural Stylist analyzes your lifestyle, weather, and body type to architect perfect 7-day capsule wardrobes."
                }
            },
            "game-design": {
                "hero": {
                    "badge": "Next Gen Assets",
                    "title_prefix": "LEVEL",
                    "title_highlight": "BEYOND",
                    "description": "We architect immersive digital realms. High-fidelity 3D assets, cinematic environments, and core gameplay mechanics crafted for the boldest creators."
                },
                "features": {
                    "title": "POWER SYSTEM",
                    "description": "Integrated solutions for AAA-Grade Game Architecture.",
                    "items": [
                        {"icon": "Layers", "title": "Environment", "desc": "Procedural world-building & cinematic lighting."},
                        {"icon": "Box", "title": "3D Assets", "desc": "Optimized high-poly to low-poly modeling."},
                        {"icon": "Zap", "title": "FX System", "desc": "Advanced particle effects & visual impact."},
                        {"icon": "Cpu", "title": "AI Logic", "desc": "Complex NPC behavior & state machines."}
                    ]
                }
            },
            "shop": {
                "hero": {
                    "badge": "Elite Marketplace",
                    "title_prefix": "THE",
                    "title_highlight": "COLLECTION"
                }
            }
        }
        for slug, data in pages.items():
            try:
                # Update home and the new pages
                existing = db.query(models.Page).filter(models.Page.slug == slug).first()
                if not existing or slug in ["home", "guru-ji-art", "vantage-ecom", "7-day-clothing-consultation", "game-design", "shop"]:
                    cms_repository.update_page_content(db, slug, data)
                    print(f"SeedingService: {slug} SEEDED/UPDATED")
            except Exception as e:
                print(f"SeedingService: {slug} seed failed: {e}")

    @staticmethod
    def run_path_migrations(db: Session):
        try:
            from core.models import Media, ContentBlock, Post
            for model, field in [(Media, "file_url"), (ContentBlock, "value"), (Post, "content")]:
                items = db.query(model).filter(getattr(model, field).like('%/img/%')).all()
                for item in items:
                    setattr(item, field, getattr(item, field).replace('/img/', '/images/'))
            db.commit()
        except Exception as e:
            db.rollback()
            print(f"SeedingService: Path migration failed: {e}")
