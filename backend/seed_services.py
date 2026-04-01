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
            "products": [
                { "id": "p1", "title": "Guruji Divine Bracelet", "price": "₹299", "description": "Handcrafted spiritual protection bracelet with sacred imagery and premium finish.", "image": "/images/content/bracelet_sample.png" },
                { "id": "p2", "title": "Custom Digital Invitation", "price": "₹1,499", "description": "Beautiful 3D digital video invitation for your special occasion with background music.", "image": "/images/content/invitation_sample.png" }
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

def seed_guruji_art():
    db = SessionLocal()
    try:
        print("Seeding Guru Ji Art page...")
        
        guruji_data = {
            "hero": {
                "title": "Guru Ji Art & Creation",
                "subtitle": "THE DIVINE STUDIO",
                "description": "\"Art is not just a visual experience; it's a spiritual journey that connects the soul to the divine frequency.\"",
                "image": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
            },
            "artworks": [
                {
                    "title": "Divine Presence",
                    "desc": "Oil on canvas, 36x48 inches. Capturing the eternal calm and wisdom.",
                    "src": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
                },
                {
                    "title": "Sacred Geometry",
                    "desc": "Digital Art. The mathematical harmony of the universe.",
                    "src": "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2670&auto=format&fit=crop"
                },
                {
                    "title": "The Golden Lotus",
                    "desc": "Acrylic with Gold Foil. Symbolizing purity and spiritual awakening.",
                    "src": "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop"
                }
            ],
            "story": {
                "title": "The Legacy of Divine Art",
                "description": "Our journey began with a simple mission: to make the divine visible. Annu Design Studio bridges the gap between ancient spiritual symbolism and modern artistic expression.",
                "points": [
                    "Hand-painted traditional techniques",
                    "Premium archival quality materials",
                    "Each piece blessed and personalized",
                    "International Shipping & Packaging"
                ],
                "image": "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop"
            },
            "cta": {
                "title": "Own a Masterpiece",
                "link": "#gallery",
                "description": "\"A home with divine art is a home with divine protection.\" - Guruji"
            }
        }
        
        cms_repository.update_page_content(db, "guru-ji-art", guruji_data)
        print("Successfully seeded Guru Ji Art page!")

    except Exception as e:
        print(f"Error seeding Guru Ji Art: {e}")
    finally:
        db.close()

def seed_resources():
    db = SessionLocal()
    from repositories.cms_ssot import update_ssot_page_content
    try:
        print("Seeding Resources page...")
        
        resources_data = {
            "title": "Resources & Learn",
            "meta": {
                "title": "Resources & Learn | Annu Design Studio",
                "description": "Educational tutorials, AI prompt libraries, and free design assets to help you create better."
            },
            "resources_hero": {
                "title": "Level Up Your Creative Game",
                "subtitle": "RESOURCES & LEARN",
                "description": "Access our curated library of professional tutorials, AI-powered design tools, and premium assets—all designed to help you master the art of creation."
            },
            "resources_categories": {
                "items": [
                    {"id": "tutorials", "name": "Video Tutorials", "icon": "PlayCircle"},
                    {"id": "prompts", "name": "AI Prompts", "icon": "Terminal"},
                    {"id": "assets", "name": "Free Assets", "icon": "Download"},
                    {"id": "articles", "name": "Expert Articles", "icon": "BookOpen"}
                ]
            },
            "resources_featured": {
                "title": "Featured Masterclass",
                "post_title": "Mastering Digital Portraits with AI",
                "description": "Learn the step-by-step process of blending traditional art techniques with modern stable diffusion models.",
                "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            },
            "resources_tutorials": {
                "items": [
                    {"title": "Color Theory for Beginners", "duration": "15 min", "level": "Easy"},
                    {"title": "Advanced Lighting in Blender", "duration": "45 min", "level": "Expert"},
                    {"title": "UI Design with Framer Motion", "duration": "30 min", "level": "Intermediate"}
                ]
            },
            "resources_prompts": {
                "items": [
                    {"title": "Cinematic Lighting Prompt", "category": "Midjourney"},
                    {"title": "Product Photography Prompt", "category": "Stable Diffusion"},
                    {"title": "Minimalist Logo Set", "category": "DALL-E 3"}
                ]
            },
            "resources_free_resources": {
                "items": [
                    {"title": "2024 Design Trends PDF", "type": "E-book"},
                    {"title": "Custom Brush Pack", "type": "Tool kit"},
                    {"title": "Social Media Templates", "type": "Figma File"}
                ]
            },
            "resources_newsletter": {
                "title": "Weekly Creative Insights",
                "description": "Join 5,000+ creators getting weekly design tips and early access to new resources.",
                "button_text": "Join the Circle"
            }
        }
        
        update_ssot_page_content(db, "resources", resources_data)
        print("Successfully seeded Resources page!")

    except Exception as e:
        print(f"Error seeding Resources: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_services()
    seed_guruji_art()
    seed_resources()
