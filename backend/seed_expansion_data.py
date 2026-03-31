import json
import os
import sys
from sqlalchemy.orm import Session

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from repositories.cms_ssot import upsert_reusable_section, link_section_to_page

def seed_expansion():
    db = SessionLocal()
    try:
        print("🚀 Starting Portfolio & FAQ Expansion Seeding...")

        # 1. Portfolio Categories & Hero
        portfolio_categories = [
            "All", "Logo Design", "Wedding Card", "T-Shirt Design", "Banner Design",
            "Resume Design", "Thumbnail", "GURU JI ART", "VANTAGE ECOM", "7 DAY CLOTHS",
            "GAME DESIGN", "Mug Design", "Book Design", "WEDDING PLAN", "PHOTO EDITOR",
            "Poster", "Presentation", "Email", "Flyer", "Brochure", "Instagram"
        ]

        portfolio_content = {
            "hero": {
                "title": "Design Portfolio",
                "description": "Explore our high-fidelity AI-assisted and handcrafted visual collection."
            },
            "categories": portfolio_categories,
            "projects": [
                {
                    "id": "p1",
                    "title": "Divine Art Series",
                    "category": "GURU JI ART",
                    "image": "https://api.dicebear.com/7.x/shapes/svg?seed=Guru",
                    "aiAssisted": True,
                    "case_study_url": "#"
                },
                {
                    "id": "p2",
                    "title": "Luxury Branding",
                    "category": "Logo Design",
                    "image": "https://api.dicebear.com/7.x/shapes/svg?seed=Logo",
                    "aiAssisted": False,
                    "case_study_url": "#"
                }
            ],
            "cta": {
                "title": "Ready for your own custom design?",
                "link": "/contact"
            }
        }

        # Update Portfolio as SSOT segment
        upsert_reusable_section(db, "portfolio-data", "portfolio", portfolio_content)
        link_section_to_page(db, "portfolio", "portfolio-data", order=0)
        print("✅ Portfolio categories & data seeded.")

        # 2. FAQ Structure
        faq_content = {
            "sections": [
                {
                    "category": "General Questions",
                    "items": [
                        { "question": "What is Annu Design Studio?", "answer": "A luxury design studio blending human artistry with AI technology." },
                        { "question": "How long does a design project take?", "answer": "Typical timelines range from 24 hours for small assets to 7 days for complex projects." }
                    ]
                },
                {
                    "category": "Service Specific",
                    "items": [
                        { "question": "What is the 7-Day Clothes Planner?", "answer": "A smart orchestration feature that suggests 7 unique daily outfits based on your profile." },
                        { "question": "Can I request custom GURU JI ART?", "answer": "Yes, we specialize in high-fidelity spiritual divine artistry tailored to your vision." }
                    ]
                }
            ]
        }

        # Update FAQ as SSOT segment
        upsert_reusable_section(db, "faq-content", "faq", faq_content)
        link_section_to_page(db, "faq", "faq-content", order=0)
        print("✅ FAQ structure seeded.")

        db.commit()
        print("\n✅ Expansion Seeding COMPLETE!")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding expansion data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_expansion()
