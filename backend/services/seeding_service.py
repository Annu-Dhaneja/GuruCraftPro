import os
import json
from typing import Any, Dict, List
from sqlalchemy.orm import Session
from sqlalchemy import text
from core import auth, database, models
from repositories.cms_ssot import upsert_component, link_component_to_page, update_global_settings, update_ssot_page_content
from core.database import engine

class SeedingService:
    @staticmethod
    def run_all(db: Session):
        """Main entry point for all seeding logic."""
        print("SeedingService: Starting full sync...")
        SeedingService.migrate_enums(db)
        SeedingService.seed_admins(db)
        SeedingService.seed_global_settings(db)
        SeedingService.seed_roles(db)
        SeedingService.seed_cms_pages(db)
        print("SeedingService: Full sync complete.")

    @staticmethod
    def migrate_enums(db: Session):
        try:
            with engine.connect() as conn:
                if engine.dialect.name == "postgresql":
                    try: conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR USING role::text"))
                    except: pass
                    try: conn.execute(text("DROP TYPE IF EXISTS userrole CASCADE"))
                    except: pass
                    try: conn.execute(text("DROP TYPE IF EXISTS pagestatus CASCADE"))
                    except: pass
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
                    row.role = "SUPER_ADMIN"
                    row.is_approved = True
                else:
                    db.add(models.User(username=uname, hashed_password=hashed, role="SUPER_ADMIN", is_approved=True))
            db.commit()
        except Exception as exc:
            db.rollback()
            print(f"SeedingService: admin sync failed: {exc}")

    @staticmethod
    def seed_roles(db: Session):
        """Seed default RBAC roles."""
        try:
            default_roles = [
                {"name": "SUPER_ADMIN", "description": "Full system owner access", "permissions_json": json.dumps({"cms": ["*"], "users": ["*"], "forms": ["*"], "media": ["*"], "settings": ["*"]})},
                {"name": "ADMIN", "description": "General administrative access", "permissions_json": json.dumps({"cms": ["read", "write", "delete"], "users": ["read", "write"], "forms": ["read", "write", "delete"], "media": ["read", "write", "delete"]})},
                {"name": "EDITOR", "description": "Content editing access", "permissions_json": json.dumps({"cms": ["read", "write"], "media": ["read", "write"]})},
                {"name": "USER", "description": "Standard user access", "permissions_json": json.dumps({"cms": ["read"]})},
            ]
            for role_data in default_roles:
                existing = db.query(models.Role).filter(models.Role.name == role_data["name"]).first()
                if not existing:
                    db.add(models.Role(**role_data))
            db.commit()
            print("SeedingService: Roles seeded.")
        except Exception as exc:
            db.rollback()
            print(f"SeedingService: Role seeding failed: {exc}")

    @staticmethod
    def seed_global_settings(db: Session):
        """Seed GlobalSettings using SSOT model."""
        try:
            existing = db.query(models.GlobalSettings).first()
            if not existing:
                update_global_settings(db, {
                    "site_name": "GurucraftPro",
                    "contact_email": "hello@gurucraftpro.com",
                    "phone": "+91-8527837527",
                    "address": "Digital Studio, India",
                    "footer": {
                        "copyright": "© 2026 GurucraftPro. All rights reserved.",
                        "explore": [
                            {"label": "Our Services", "href": "/services"},
                            {"label": "Design Portfolio", "href": "/portfolio"},
                            {"label": "AI Creative Lab", "href": "/ai-lab"},
                            {"label": "The Studio", "href": "/about"},
                            {"label": "Privacy Policy", "href": "/privacy"}
                        ]
                    },
                    "social": {
                        "facebook": "https://facebook.com/gurucraftpro",
                        "github": "https://github.com/om-prakash16",
                        "instagram": "https://instagram.com/gurucraftpro",
                        "linkedin": "https://linkedin.com/in/gurucraftpro",
                        "twitter": "https://twitter.com/gurucraftpro",
                        "whatsapp": "https://wa.me/918527837527"
                    },
                    "nav": [
                        { "label": "Home", "href": "/", "style": "default" },
                        { 
                            "label": "Expertise", 
                            "href": "/portfolio", 
                            "style": "default",
                            "items": [
                                { "label": "Logo Design", "href": "/portfolio?category=Logo Design", "description": "Memorable logos that define your brand identity." },
                                { "label": "Wedding Planning", "href": "/services/wedding-plan", "description": "Bespoke luxury wedding coordination and design." },
                                { "label": "Photo Editing", "href": "/services/photo-editor", "description": "High-end retouching and professional image editing." },
                                { "label": "Guru Ji Art Work", "href": "/services/guru-ji-art", "description": "Celestial hand-painted and digital masterpieces." },
                                { "label": "Game Design", "href": "/services/game-design", "description": "Immersive character and environment concepts." },
                                { "label": "Vantage Ecom", "href": "/services/vantage-ecom", "description": "Growth-focused e-commerce design solutions." },
                                { "label": "Clothing Consultation", "href": "/services/clothing-consultation", "description": "Neural stylist and weekly wardrobe architecture." },
                                { "label": "Pricing & Services", "href": "/services", "description": "Transparent pricing for all our premium services." },
                                { "label": "View All Works", "href": "/portfolio", "description": "View our complete portfolio catalog." }
                            ]
                        },
                        { 
                            "label": "Creative Lab", 
                            "href": "/ai-lab", 
                            "style": "special",
                            "items": [
                                { "label": "AI Design Lab", "href": "/ai-lab", "description": "Explore the future of creativity with our AI-powered design tools." },
                                { "label": "Virtual Try-On", "href": "/ai-lab/virtual-try-on", "description": "Instantly see how garments look on you with AI technology." },
                                { "label": "Guru Ji Darshan", "href": "/guruji-darshan", "description": "Celestial hand-painted and digital masterpieces for your space." }
                            ]
                        },
                        { "label": "Learn", "href": "/resources", "style": "default" },
                        { "label": "About", "href": "/about", "style": "default" },
                        { "label": "Contact", "href": "/contact", "style": "default" }
                    ],
                    "theme": {
                        "primary_color": "#6366f1",
                        "accent_color": "#8b5cf6",
                        "dark_mode": True
                    }
                })
                print("SeedingService: GlobalSettings seeded.")
        except Exception as e:
            print(f"SeedingService: GlobalSettings seed failed: {e}")

    @staticmethod
    def seed_cms_pages(db: Session):
        """Seed all CMS pages using V3 Component system."""
        pages = {
            "home": {
                "title": "GuruCraft Studio | Bespoke Design & Luxury Experiences",
                "components": [
                    {"type": "hero", "props": {
                        "badge": "Bespoke Creative Studio",
                        "headline_prefix": "GURU",
                        "headline_highlight": "CRAFT",
                        "headline_suffix": "STUDIO",
                        "subheadline": "A luxury multi-disciplinary studio merging high-end graphic design, bespoke wedding architecture, and cutting-edge digital experiences into visual masterpieces."
                    }},
                    {"type": "features", "props": {
                        "title": "Creative Masteries",
                        "items": [
                            {"title": "Elite Graphics", "desc": "Bespoke brand identity, high-end print design, and corporate presentation architecture.", "icon": "Wand2"},
                            {"title": "Luxury Weddings", "desc": "Bespoke wedding design, luxury spatial coordination, and premium planning services.", "icon": "Heart"},
                            {"title": "Fine Artistry", "desc": "Exquisite custom Guru Ji celestial art and premium digital masterpieces for modern spaces.", "icon": "Sparkles"}
                        ]
                    }},
                    {"type": "cta", "props": {
                        "title": "ELEVATE YOUR VISION",
                        "description": "Let us collaborate to build your next unforgettable digital or physical experience.",
                        "button_text": "START A CONVERSATION",
                        "button_href": "/contact"
                    }}
                ]
            },
            "about": {
                "title": "Our Story | GuruCraft Studio",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "ABOUT THE STUDIO",
                        "title_prefix": "Where Artistry Meets",
                        "title_highlight": "Thoughtful Design",
                        "description": "We are a team of passionate designers, experience curators, and engineers dedicated to high-fidelity visual storytelling and luxury design execution."
                    }},
                    {"type": "process", "props": {
                        "title": "Our Bespoke Process",
                        "steps": [
                            {"title": "Discovery", "desc": "We deep-dive into your unique personality, brand goals, or dream wedding concepts."},
                            {"title": "Bespoke Design", "desc": "We craft custom sketches, color systems, and high-fidelity mockups for your review."},
                            {"title": "Exquisite Hand-Off", "desc": "We execute the final production with extreme precision, whether digital launch or live coordination."}
                        ]
                    }},
                    {"type": "testimonials", "props": {
                        "title": "Client Appreciations",
                        "items": [
                            {"author": "Devendra Sharma", "role": "Managing Director, DevGroup", "content": "GuruCraft Studio transformed our global corporate identity with absolute refinement and creative genius."},
                            {"author": "Nisha & Rohan", "role": "Bespoke Wedding Clients", "content": "They coordinated our luxury wedding with flawless precision. It was a fairy-tale event brought to life."}
                        ]
                    }}
                ]
            },
            "contact": {
                "title": "Connect With Us | GuruCraft Studio",
                "components": [
                    {"type": "contact_form", "props": {
                        "title": "Let us collaborate to bring your bespoke vision to life.",
                        "subtitle": "Get In Touch"
                    }},
                    {"type": "faq", "props": {
                        "title": "Frequently Answered Questions",
                        "items": [
                            {"question": "What is the timeline for a comprehensive branding project?", "answer": "A signature brand identity suite typically takes between 3 to 4 weeks of dedicated design and iteration."},
                            {"question": "Do you travel for wedding coordination services?", "answer": "Yes! We plan and execute destination weddings across global luxury hotspots, coordinating all details on-site."}
                        ]
                    }}
                ]
            },
            "privacy": {
                "title": "Privacy Protocol | GuruCraft Studio",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "LEGAL STANDARD",
                        "title_prefix": "Our Professional",
                        "title_highlight": "Privacy Policy",
                        "description": "How we safely guard your private assets, credentials, and brand assets."
                    }}
                ]
            },
            "services": {
                "title": "Our Signature Services | GuruCraft Studio",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "SERVICE CATALOGUE",
                        "title_highlight": "SIGNATURE SERVICES",
                        "description": "Explore our portfolio of premium design packages, custom online storefronts, and wedding design services."
                    }},
                    {"type": "category_grid", "props": {
                        "title": "CREATIVE DISCIPLINES",
                        "items": [
                            {"title": "Brand Design", "description": "Custom logo suites, dynamic brand guidelines, and high-impact packaging systems.", "icon": "Wand2", "href": "/services/graphics", "badge": "Signature"},
                            {"title": "Bespoke E-Commerce", "description": "High-conversion Shopify stores, intuitive product user interfaces, and smooth checkout funnels.", "icon": "ShoppingBag", "href": "/services/vantage-ecom", "badge": "High Conversion"},
                            {"title": "Luxury Weddings", "description": "Curated spatial styling, boutique vendor coordination, and full luxury wedding architecture.", "icon": "Heart", "href": "/services/wedding-plan"},
                            {"title": "Celestial Artwork", "description": "Custom oil paintings and fine digital artworks of Guru Ji, perfect for spiritual and elite residences.", "icon": "Sparkles", "href": "/services/guru-ji-art"}
                        ]
                    }},
                    {"type": "cta", "props": {
                        "title": "READY TO BEGIN YOUR JOURNEY?",
                        "description": "Book a private creative consultation with our team today.",
                        "button_text": "SCHEDULE CONSULTATION",
                        "button_href": "/contact"
                    }}
                ]
            },
            "portfolio": {
                "title": "Selected Works | GuruCraft Studio",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "SELECTED ARCHIVES",
                        "title_highlight": "OUR PORTFOLIO",
                        "description": "A curated exhibition of corporate brand transformations, luxury wedding coordinates, and bespoke art pieces."
                    }},
                    {"type": "category_grid", "props": {
                        "title": "EXHIBIT ARCHIVES",
                        "columns": 3,
                        "items": [
                            {"title": "Brand Identity", "description": "Distinctive logos and corporate guidelines.", "icon": "Wand2", "href": "/portfolio?category=Logo Design"},
                            {"title": "Web Experiences", "description": "Cinematic high-performance digital storefronts.", "icon": "Monitor", "href": "/portfolio?category=Vantage Ecom"},
                            {"title": "Bespoke Commissions", "description": "Celestial art commissions and luxury design assets.", "icon": "BookOpen", "href": "/portfolio?category=Print Design"}
                        ]
                    }}
                ]
            },
            "ai-lab": {
                "title": "AI Creative Lab | GuruCraft Studio",
                "components": [
                    {"type": "hero", "props": {
                        "badge": "GENERATIVE ART LAB",
                        "headline_prefix": "THE",
                        "headline_highlight": "CREATIVE",
                        "headline_suffix": "LAB",
                        "subheadline": "We build the future of graphic arts by combining human design instincts with custom generative AI capabilities."
                    }},
                    {"type": "ai_lab_grid", "props": {}}
                ]
            }
        }

        for slug, data in pages.items():
            db_page = db.query(models.CMSPage).filter(models.CMSPage.slug == slug).first()
            if not db_page:
                db_page = models.CMSPage(
                    slug=slug, 
                    title=data["title"],
                    status="published"
                )
                db.add(db_page)
                db.flush()
            else:
                db_page.status = "published"
            
            # Clear existing components to avoid duplicates
            db.query(models.CMSPageComponent).filter(models.CMSPageComponent.page_id == db_page.id).delete()
            
            for i, comp in enumerate(data["components"]):
                new_comp = models.CMSPageComponent(
                    page_id=db_page.id,
                    order=i,
                    props_json=json.dumps(comp["props"])
                )
                # Find or create component definition
                comp_def = db.query(models.CMSComponent).filter(
                    (models.CMSComponent.name == comp["type"]) | 
                    (models.CMSComponent.type == comp["type"])
                ).first()
                
                if not comp_def:
                    comp_def = models.CMSComponent(name=comp["type"], type=comp["type"])
                    db.add(comp_def)
                    db.flush()
                
                new_comp.component_id = comp_def.id
                db.add(new_comp)

        db.commit()
        print("SeedingService: All dynamic pages seeded (V3).")
