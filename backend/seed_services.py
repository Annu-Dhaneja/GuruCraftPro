import os
import sys

# Add the current directory to sys.path to allow imports from core and repositories
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal
from repositories.cms import cms_repository

def seed_services():
    db = SessionLocal()
    try:
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
            "process": {
                "title": "How We Work",
                "description": "A streamlined approach from concept to delivery.",
                "steps": [
                    { "title": "Consultation", "desc": "Discuss your specific needs and vision." },
                    { "title": "Design & Draft", "desc": "Our team creates initial concepts for your review." },
                    { "title": "Refinement", "desc": "We polish the designs based on your feedback." },
                    { "title": "Final Delivery", "desc": "High-quality assets delivered in your required formats." }
                ]
            },
            "faq": [
                { "q": "Do you provide physical products?", "a": "Yes, for certain services like Guruji Art bracelets, we handle both design and physical sales." },
                { "q": "What is the typical turnaround time?", "a": "Most digital services are delivered within 2-5 business days depending on complexity." }
            ],
            "cta": {
                "title": "Ready to Start Your Project?",
                "description": "Contact us today for a free consultation and personalized quote.",
                "button_text": "Contact Us Now",
                "button_href": "/contact"
            }
        }

        # Use the existing repository to update the 'services' page
        cms_repository.update_page_content(db, "services", services_data)
        print("Successfully seeded services page!")

    except Exception as e:
        print(f"Error seeding services: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_services()
