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
                "title": "GurucraftPro | Intelligence Beyond Design",
                "components": [
                    {"type": "hero", "props": {
                        "badge": "Intelligence Beyond Design",
                        "headline_prefix": "GURU",
                        "headline_highlight": "CRAFT",
                        "headline_suffix": "PRO",
                        "subheadline": "The world's first AI-powered luxury ecosystem merging Elite Graphics, Divine Artistry, and Strategic Commerce into one cinematic experience."
                    }},
                    {"type": "features", "props": {
                        "title": "Master Modules",
                        "items": [
                            {"title": "Elite Graphics", "desc": "High-fidelity brand and marketing orchestration.", "icon": "Wand2"},
                            {"title": "Neural Commerce", "desc": "Strategic e-commerce solutions for global scale.", "icon": "Zap"},
                            {"type": "Digital Art", "desc": "Celestial hand-painted and digital masterpieces.", "icon": "Sparkles"}
                        ]
                    }},
                    {"type": "cta", "props": {
                        "title": "INITIATE YOUR VISION",
                        "description": "Deploy our elite assets for your next mission.",
                        "button_text": "START PROJECT",
                        "button_href": "/contact"
                    }}
                ]
            },
            "about": {
                "title": "The Studio | GurucraftPro",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "ABOUT US",
                        "title_prefix": "Where Technology Meets",
                        "title_highlight": "Thoughtful Design",
                        "description": "We are a multidisciplinary studio obsessed with the intersection of art and technology."
                    }},
                    {"type": "process", "props": {
                        "title": "Our Methodology",
                        "steps": [
                            {"title": "Discovery", "desc": "We map your strategic landscape."},
                            {"title": "Architecture", "desc": "Defining the core neural structure."},
                            {"title": "Execution", "desc": "High-fidelity production and deployment."}
                        ]
                    }},
                    {"type": "testimonials", "props": {
                        "title": "Market Impact",
                        "items": [
                            {"author": "Alex Rivera", "role": "CEO, TechFlow", "content": "GurucraftPro transformed our brand identity in record time with neural precision."},
                            {"author": "Sarah Chen", "role": "Creative Director", "content": "The intersection of AI and human artistry here is unlike anything else in the industry."}
                        ]
                    }}
                ]
            },
            "contact": {
                "title": "Initiate Command | Contact GurucraftPro",
                "components": [
                    {"type": "contact_form", "props": {
                        "title": "Deploy our strategic design assets for your next mission.",
                        "subtitle": "Contact Neural"
                    }},
                    {"type": "faq", "props": {
                        "title": "Frequently requested data points.",
                        "items": [
                            {"question": "What is the standard deployment timeline?", "answer": "Most elite assets are ready for review within 48-72 neural hours."},
                            {"question": "Do you offer localized support?", "answer": "Yes, our team operates across global timezones for sub-second response times."}
                        ]
                    }}
                ]
            },
            "privacy": {
                "title": "Privacy Protocol | GurucraftPro",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "LEGAL PROTOCOL",
                        "title_prefix": "Strategic",
                        "title_highlight": "Privacy Policy",
                        "description": "How we protect your neural data and strategic assets."
                    }}
                ]
            },
            "services": {
                "title": "Elite Ecosystem | GurucraftPro Services",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "SYSTEM CATALOG V4.2",
                        "title_highlight": "ELITE ECOSYSTEM",
                        "description": "Deploying professional-grade design and technical intelligence for global brands."
                    }},
                    {"type": "category_grid", "props": {
                        "title": "OUR SERVICE TIERS",
                        "items": [
                            {"title": "Elite Graphics", "description": "High-fidelity brand and marketing orchestration.", "icon": "Wand2", "href": "/services/graphics", "badge": "Core"},
                            {"title": "Neural Commerce", "description": "Strategic e-commerce solutions for global scale.", "icon": "ShoppingBag", "href": "/services/vantage-ecom", "badge": "High ROI"},
                            {"title": "Game Design", "description": "Immersive digital realms and character concepts.", "icon": "Cpu", "href": "/services/game-design"},
                            {"title": "Wedding Planning", "description": "Bespoke luxury coordination and design.", "icon": "Heart", "href": "/services/wedding-plan"}
                        ]
                    }},
                    {"type": "cta", "props": {
                        "title": "READY FOR ASCENSION?",
                        "description": "Start your strategic design journey today.",
                        "button_text": "INQUIRE NOW",
                        "button_href": "/contact"
                    }}
                ]
            },
            "portfolio": {
                "title": "Neural Output | GurucraftPro Portfolio",
                "components": [
                    {"type": "hero_centered", "props": {
                        "badge": "MISSION LOGS",
                        "title_highlight": "ELITE PORTFOLIO",
                        "description": "A collection of high-fidelity outputs delivered across the global design landscape."
                    }},
                    {"type": "category_grid", "props": {
                        "title": "OUTPUT CATEGORIES",
                        "columns": 3,
                        "items": [
                            {"title": "Logo Design", "description": "Defining corporate identity.", "icon": "Wand2", "href": "/portfolio?category=Logo Design"},
                            {"title": "Web Architecture", "description": "High-performance digital hubs.", "icon": "Monitor", "href": "/portfolio?category=Vantage Ecom"},
                            {"title": "Print & Brand", "description": "Tactile marketing assets.", "icon": "BookOpen", "href": "/portfolio?category=Print Design"}
                        ]
                    }}
                ]
            },
            "ai-lab": {
                "title": "AI Creative Lab | GurucraftPro",
                "components": [
                    {"type": "hero", "props": {
                        "badge": "NEURAL CORE",
                        "headline_prefix": "THE",
                        "headline_highlight": "AI",
                        "headline_suffix": "LAB",
                        "subheadline": "Pushing the boundaries of generative design and neural automation for industrial-scale creativity."
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
            
            # Clear existing components to avoid duplicates
            db.query(models.CMSPageComponent).filter(models.CMSPageComponent.page_id == db_page.id).delete()
            
            for i, comp in enumerate(data["components"]):
                new_comp = models.CMSPageComponent(
                    page_id=db_page.id,
                    order=i,
                    props_json=json.dumps({"props": comp["props"]})
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
