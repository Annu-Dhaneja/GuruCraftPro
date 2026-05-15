import os
import sys
import json
from sqlalchemy.orm import Session

# Add the current directory to sys.path to allow imports from core and repositories
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from repositories.cms_ssot import upsert_component, link_component_to_page

def seed_home_cms():
    db = SessionLocal()
    try:
        print("Seeding Home Page (SSOT)...")
        
        # 1. Hero Section
        hero_content = {
            "badge": "Intelligence Beyond Design",
            "headline_prefix": "GURU",
            "headline_highlight": "CRAFT",
            "headline_suffix": "PRO",
            "subheadline": "The world's first AI-powered luxury ecosystem merging Elite Graphics, Divine Artistry, and Strategic Commerce into one cinematic experience."
        }
        upsert_component(db, "home-hero", "hero", hero_content)
        link_component_to_page(db, "home", "home-hero", hero_content, order=0)
        
        # 2. Service Category Rail (Aligned with FeaturesGrid expectations)
        rail_content = {
            "title": "Master Modules",
            "subtitle": "UNLIMITED CREATIVITY.",
            "categories": [
                {
                    "id": "wedding",
                    "title": "Luxury Wedding",
                    "description": "Elite planners & digital invites.",
                    "icon": "Heart",
                    "href": "/wedding",
                    "className": "lg:col-span-2 lg:row-span-2 bg-rose-500/5",
                    "accent": "text-rose-400",
                    "bg": "bg-rose-400/10",
                    "tags": ["Luxury", "Planning"]
                },
                {
                    "id": "guruji",
                    "title": "Divine Artistry",
                    "description": "Sacred graphics & spiritual assets.",
                    "icon": "Sparkles",
                    "href": "/services/guru-ji-art",
                    "className": "bg-indigo-500/5",
                    "accent": "text-indigo-400",
                    "bg": "bg-indigo-400/10",
                    "tags": ["Spiritual"]
                },
                {
                    "id": "photo",
                    "title": "Visual Engine",
                    "description": "Neural editing & upscaling.",
                    "icon": "Zap",
                    "href": "/photo-editor",
                    "className": "bg-indigo-500/5",
                    "accent": "text-indigo-400",
                    "bg": "bg-indigo-400/10",
                    "tags": ["Neural", "Editing"]
                },
                {
                    "id": "vantage",
                    "title": "E-Com Forge",
                    "description": "Strategic commerce solutions.",
                    "icon": "Layout",
                    "href": "/services/vantage-ecom",
                    "className": "lg:col-span-2 bg-emerald-500/5",
                    "accent": "text-emerald-400",
                    "bg": "bg-emerald-400/10",
                    "tags": ["Strategic"]
                }
            ]
        }
        upsert_component(db, "service_category_rail", "features", rail_content)
        link_component_to_page(db, "home", "service_category_rail", rail_content, order=1)
        
        db.commit()
        print("Home page seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding Home CMS: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_home_cms()
