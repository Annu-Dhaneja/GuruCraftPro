import os
import sys

# Add the current directory to sys.path to allow imports from core and repositories
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from repositories.cms import cms_repository

def seed_cms():
    db = SessionLocal()
    try:
        # --- SEED SERVICES ---
        print("Seeding services page...")
        services_data = {
            "hero": {
                "title": "Our Specialized Design Services",
                "description": "From divine artistry to modern e-commerce solutions, we provide a wide range of specialized design and photography services tailored to your needs."
            },
            "tiers": [
                {
                    "id": "wedding",
                    "name": "Wedding Planners",
                    "badge": "Premium",
                    "description": "Complete wedding design and planning support.",
                    "icon": "Heart",
                    "features": [
                        "Pre-wedding photoshoot",
                        "Wedding hall decoration design",
                        "Budget planning & management",
                        "Custom Wedding invitation design",
                        "3D Digital invitation videos"
                    ]
                },
                {
                    "id": "guruji",
                    "name": "Guruji Art & Spiritual",
                    "badge": "Divine",
                    "description": "Sacred artistry and spiritual digital assets.",
                    "icon": "Sparkles",
                    "features": [
                        "Bracelet and accessories design & sell",
                        "Premium Mobile Wallpapers",
                        "Digital Stickers (Jai Guru Ji)",
                        "Daily Quotes & Vachan Calendars",
                        "Custom Digital Bookmarks",
                        "Status & Story Graphics"
                    ]
                },
                {
                    "id": "photo",
                    "name": "Professional Photo Editor",
                    "badge": "Essential",
                    "description": "High-end image processing and format conversion.",
                    "icon": "Camera",
                    "features": [
                        "Before and after image editing",
                        "Professional Photo resizing",
                        "Format Conversion (JPG to PDF)",
                        "Format Conversion (PDF to JPG)",
                        "Batch image processing"
                    ]
                },
                {
                    "id": "vantage",
                    "name": "Vantage E-com Solutions",
                    "badge": "Business",
                    "description": "Specialized e-commerce and apparel design services.",
                    "icon": "ShoppingBag",
                    "features": [
                        "Jersey task & Apparel design",
                        "Custom Size chart creation",
                        "Ghost image editing (Invisible Mannequin)",
                        "Magic layer editing & masking",
                        "Professional Video editing"
                    ]
                }
            ],
             "process": { "title": "How We Work", "steps": [ { "title": "Consultation", "desc": "Discuss your vision." }, { "title": "Design", "desc": "We create concepts." }, { "title": "Refinement", "desc": "Polish based on feedback." }, { "title": "Delivery", "desc": "Final high-quality assets." } ] }
        }
        cms_repository.update_page_content(db, "services", services_data)
        
        # --- SEED ABOUT ---
        print("Seeding about page...")
        about_data = {
            "hero": {
                "title": "Crafting the Future of Virtual Identity",
                "description": "Where cutting-edge technology meets thoughtful design to transform your digital presence."
            },
            "team": {
                "members": [
                    {
                        "name": "Annu Dhanjeja",
                        "role": "Head / Lead Designer",
                        "skills": ["Graphic Designer", "Video Editor"],
                        "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu"
                    },
                    {
                        "name": "Om Prakash",
                        "role": "Lead Developer",
                        "skills": ["Web Developer", "Python Developer"],
                        "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Om"
                    }
                ]
            }
        }
        cms_repository.update_page_content(db, "about", about_data)
        
        print("Successfully seeded all CMS pages!")

    except Exception as e:
        print(f"Error seeding CMS: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_cms()
