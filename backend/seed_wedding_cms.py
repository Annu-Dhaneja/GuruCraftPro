import json
from sqlalchemy.orm import Session
from core.database import SessionLocal
from core.models import CMSPage, CMSComponent, CMSPageComponent

def seed_wedding_showcase():
    db: Session = SessionLocal()
    try:
        page_slug = "wedding-showcase"
        
        # 1. Create or get the page
        page = db.query(CMSPage).filter(CMSPage.slug == page_slug).first()
        if not page:
            print(f"Creating new Wedding Showcase page...")
            page = CMSPage(
                title="Wedding Showcase",
                slug=page_slug,
                meta_title="Luxury Wedding Planning | Premium Services",
                meta_description="Experience the epitome of elegance with our dynamic wedding planning suite.",
                status="published"
            )
            db.add(page)
            db.flush()
        else:
            print(f"Updating existing Wedding Showcase page...")
            # Clear existing links to start fresh
            db.query(CMSPageComponent).filter(CMSPageComponent.page_id == page.id).delete()

        showcase_data = {
            "hero": {
                "badge": "Luxury Wedding Planning",
                "title": "Your Dream Wedding, Perfected",
                "subtitle": "From intimate ceremonies to grand celebrations — we craft unforgettable experiences with precision, elegance, and soul.",
                "stats": [
                    {"label": "Weddings Planned", "value": "500+"},
                    {"label": "Happy Couples", "value": "500+"},
                    {"label": "Cities Served", "value": "50+"},
                    {"label": "Years Experience", "value": "12+"},
                ]
            },
            "packages": {
                "items": [
                    {
                        "id": 1, "name": "Intimate Elegance", "price": "₹3,00,000", "icon": "heart",
                        "description": "Perfect for small, intimate ceremonies with up to 100 guests.",
                        "features": ["Venue Styling", "Floral Design", "Day-of Coordination", "Vendor Sourcing", "Timeline Planning"],
                        "popular": False
                    },
                    {
                        "id": 2, "name": "Royal Celebration", "price": "₹12,00,000", "icon": "crown", "popular": True,
                        "description": "Our signature package for grand celebrations. Full-service planning with premium vendors.",
                        "features": ["Full Event Design", "Premium Vendors", "Multi-Day Coordination", "Luxury Decor", "Guest Management"]
                    },
                    {
                        "id": 3, "name": "Destination Dream", "price": "₹25,00,000", "icon": "plane",
                        "description": "Complete destination wedding planning across India's finest palaces.",
                        "features": ["Destination Scouting", "Travel & Logistics", "Palace Booking", "VIP Guest Experience", "Custom Invitations"]
                    }
                ]
            },
            "services": {
                "items": [
                    {"name": "Mehndi Ceremony", "description": "Intricate henna art sessions with live music.", "icon": "palette"},
                    {"name": "Sangeet Night", "description": "Choreographed performances and stunning stage design.", "icon": "music"},
                    {"name": "Wedding Ceremony", "description": "Sacred rituals with breathtaking mandap design.", "icon": "heart"},
                    {"name": "Reception", "description": "Grand reception with gourmet catering and luxury decor.", "icon": "sparkles"},
                    {"name": "Photography & Film", "description": "Cinematic coverage capturing every precious moment.", "icon": "camera"},
                    {"name": "Guest Management", "description": "Complete RSVP tracking and hospitality coordination.", "icon": "users"},
                ]
            },
            "testimonials": {
                "items": [
                    {"name": "Priya & Arjun", "location": "Udaipur", "quote": "They turned our palace wedding into a fairy tale.", "rating": 5},
                    {"name": "Sneha & Rahul", "location": "Jaipur", "quote": "Managed 500+ guests flawlessly. Seamless everything.", "rating": 5},
                    {"name": "Meera & Vikram", "location": "Goa", "quote": "Our beach wedding was beyond anything we imagined.", "rating": 5}
                ]
            },
            "gallery": {
                "images": [
                    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
                    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
                    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
                    "https://images.unsplash.com/photo-1549416878-b9ca95e9561e?w=800"
                ]
            }
        }

        # 2. Link components
        for idx, (name, props) in enumerate(showcase_data.items()):
            # Get or create component definition
            comp = db.query(CMSComponent).filter(CMSComponent.name == name).first()
            if not comp:
                comp = CMSComponent(name=name, type="wedding_block")
                db.add(comp)
                db.flush()
            
            # Link to page
            assoc = CMSPageComponent(
                page_id=page.id,
                component_id=comp.id,
                order=idx,
                props_json=json.dumps(props)
            )
            db.add(assoc)

        db.commit()
        print("Successfully seeded Wedding Showcase SSOT data!")
    except Exception as e:
        print(f"Error seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_wedding_showcase()
