import json
import os
import sys
from sqlalchemy.orm import Session

# Add the current directory to sys.path to allow imports from core and repositories
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from core import models
from repositories.cms_ssot import upsert_reusable_section, link_section_to_page

def seed_planner_cms():
    db = SessionLocal()
    try:
        print("🚀 Starting 7-Day Planner CMS Seeding...")
        
        # Define the segment slug
        segment = "7-day-clothing-consultation"
        
        # 1. Hero Section
        hero_content = {
            "title": "7-Day Clothing Consultation",
            "subtitle": "AI-POWERED PRECISION",
            "description": "Orchestrate your weekly wardrobe with our advanced categorization logic. Zero effort, maximum style, powered by high-fidelity vision engines."
        }
        upsert_reusable_section(db, f"{segment}-hero", "hero", hero_content)
        link_section_to_page(db, segment, f"{segment}-hero", order=0)
        
        # 2. Features Section
        features_content = {
            "items": [
                {
                    "title": "Smart Categorization",
                    "description": "Our engine maps your age and style preference to the perfect wardrobe tiers automatically."
                },
                {
                    "title": "7-Day Success Matrix",
                    "description": "A complete weekly plan generated in seconds, ensuring you never repeat a look or miss a beat."
                },
                {
                    "title": "Gender Precision",
                    "description": "Tailored recommendations for Men, Women, and Transgender individuals with specific style cuts."
                },
                {
                    "title": "High-Fidelity Visuals",
                    "description": "See your outfits in stunning detail before you even open your closet."
                }
            ]
        }
        upsert_reusable_section(db, f"{segment}-features", "features", features_content)
        link_section_to_page(db, segment, f"{segment}-features", order=1)
        
        # 3. CTA Section
        cta_content = {
            "title": "Ready to transform your style?",
            "description": "Start your 7-day consultation now and experience the future of personal styling.",
            "link": "/contact"
        }
        upsert_reusable_section(db, f"{segment}-cta", "cta", cta_content)
        link_section_to_page(db, segment, f"{segment}-cta", order=2)

        db.commit()
        print(f"✅ CMS data for '{segment}' seeded successfully.")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding Planner CMS: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_planner_cms()
