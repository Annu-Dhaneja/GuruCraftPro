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
                        {"name": "Adobe", "logo": "https://cdn.simpleicons.org/adobe/white"},
                        {"name": "Figma", "logo": "https://cdn.simpleicons.org/figma/white"},
                        {"name": "Stripe", "logo": "https://cdn.simpleicons.org/stripe/white"}
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
            }
            # ... More pages can be added here
        }
        for slug, data in pages.items():
            try:
                if not db.query(models.Page).filter(models.Page.slug == slug).first():
                    cms_repository.update_page_content(db, slug, data)
                    print(f"SeedingService: {slug} SEEDED")
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
