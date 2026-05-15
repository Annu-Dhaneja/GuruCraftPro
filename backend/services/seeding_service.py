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
                    row.role = "super-admin"
                else:
                    db.add(models.User(username=uname, hashed_password=hashed, role="super-admin"))
            db.commit()
        except Exception as exc:
            db.rollback()
            print(f"SeedingService: admin sync failed: {exc}")

    @staticmethod
    def seed_roles(db: Session):
        """Seed default RBAC roles."""
        try:
            default_roles = [
                {"name": "super-admin", "description": "Full system owner access", "permissions_json": json.dumps({"cms": ["*"], "users": ["*"], "forms": ["*"], "media": ["*"], "settings": ["*"]})},
                {"name": "admin", "description": "General administrative access", "permissions_json": json.dumps({"cms": ["read", "write", "delete"], "users": ["read", "write"], "forms": ["read", "write", "delete"], "media": ["read", "write", "delete"]})},
                {"name": "editor", "description": "Content editing access", "permissions_json": json.dumps({"cms": ["read", "write"], "media": ["read", "write"]})},
                {"name": "user", "description": "Standard user access", "permissions_json": json.dumps({"cms": ["read"]})},
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
                            {"label": "The Studio", "href": "/about"}
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
                                { "label": "Photo Editing", "href": "/photo-editor", "description": "High-end retouching and professional image editing." },
                                { "label": "Guru Ji Art Work", "href": "/services/guru-ji-art", "description": "Celestial hand-painted and digital masterpieces." },
                                { "label": "Game Design", "href": "/services/game-design", "description": "Immersive character and environment concepts." },
                                { "label": "Vantage Ecom", "href": "/services/vantage-ecom", "description": "Growth-focused e-commerce design solutions." },
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
                                { "label": "Guru Ji Art Work", "href": "/guruji-darshan", "description": "Celestial hand-painted and digital masterpieces for your space." }
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
                    "description": "Experience the intersection of ancient spirituality and modern artistry through AI-curated vachans and celestial 3D spiritual assets."
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
                    "description": "Enterprise-grade architecture tailored for high-growth brands.",
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
            "services": {
                "hero": {
                    "badge": "OUR SERVICES",
                    "title_prefix": "Crafting",
                    "title_highlight": "Digital Excellence",
                    "description": "From concept to deployment, we deliver comprehensive design and development solutions."
                }
            },
            "contact": {
                "hero": {
                    "badge": "GET IN TOUCH",
                    "title_prefix": "Let's Build",
                    "title_highlight": "Something Great",
                    "description": "Ready to transform your vision into reality? Let's start a conversation."
                }
            },
            "7-day-clothing-consultation": {
                "hero": {
                    "title": "7-Day Consultation",
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
                update_ssot_page_content(db, slug, data)
                print(f"SeedingService: {slug} SEEDED/UPDATED (V3)")
            except Exception as e:
                print(f"SeedingService: {slug} seed failed: {e}")
