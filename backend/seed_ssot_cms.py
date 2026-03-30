import json
import os
import sys
from sqlalchemy.orm import Session

# Add the current directory to sys.path to allow imports from core and repositories
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal, engine
from core import models
from repositories.cms_ssot import upsert_reusable_section, link_section_to_page, update_global_settings

def seed_ssot_cms():
    db = SessionLocal()
    try:
        print("🚀 Starting SSOT CMS Seeding...")
        
        # 1. Global Settings
        print("--- Global Settings ---")
        update_global_settings(db, {
            "site_name": "GurucraftPro",
            "logo_url": "/images/brand/logo-dark-v4.svg",
            "contact_email": "hello@gurucraftpro.in",
            "phone": "+91 85278 37527",
            "address": "New Delhi, India",
            "footer": {
                "copyright": "© 2026 GurucraftPro. All rights reserved.",
                "tagline": "Crafting digital excellence through the perfect blend of AI technology and human artistic vision."
            },
            "social": {
                "instagram": "https://instagram.com/gurucraftpro",
                "whatsapp": "https://wa.me/918527837527",
                "linkedin": "https://linkedin.com/in/gurucraftpro",
                "twitter": "https://twitter.com/gurucraftpro"
            }
        })
        print("✅ Global settings seeded.")

        # 2. About Page
        print("\n--- About Page ---")
        about_sections = [
            {
                "slug": "about-hero",
                "type": "hero",
                "content": {
                    "badge": "ABOUT US",
                    "title_prefix": "Where technology meets",
                    "title_highlight": "thoughtful design",
                    "description": "Gurucraftpro blends AI-powered efficiency with human creativity to craft visuals that truly connect and communicate."
                }
            },
            {
                "slug": "about-founder",
                "type": "founder",
                "content": {
                    "badge": "THE VISIONARY",
                    "name": "Annu Dhanjeja",
                    "title": "Founder & Creative Lead",
                    "main_title": "Artist. Designer. AI Explorer.",
                    "main_description": "Passionate about bridging the gap between human intuition and machine intelligence to create something truly unique.",
                    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu",
                    "tags": ["Artist", "Tech Enthusiast", "Visionary"],
                    "bio": [
                        "With over a decade of design excellence, Annu leads the creative vision at Gurucraftpro.",
                        "Specialized in high-end photo editing and spiritual divine artistry."
                    ]
                }
            },
            {
                "slug": "about-team",
                "type": "team",
                "content": {
                    "title": "Our Team",
                    "subtitle": "The humans behind the machines.",
                    "members": [
                        {
                            "name": "Annu Dhanjeja",
                            "role": "Head / Lead Designer",
                            "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu",
                            "skills": ["Graphic Designer", "Video Editor", "AI Prompt Engineer"],
                            "social": { "instagram": "https://instagram.com/gurucraftpro", "linkedin": "#" }
                        },
                        {
                            "name": "Om Prakash",
                            "role": "Lead Developer / Architect",
                            "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Om",
                            "skills": ["Full Stack Developer", "Python Expert", "System Infrastructure"],
                            "social": { "github": "#", "linkedin": "#", "twitter": "#" }
                        }
                    ]
                }
            },
            {
                "slug": "about-philosophy",
                "type": "philosophy",
                "content": {
                    "title": "Our Philosophy",
                    "description": "Design that speaks for itself. We prioritize quality, empathy, and innovation.",
                    "values": [
                        { "title": "Human Centered", "desc": "AI assists, but human soul drives the final output.", "icon": "Heart", "color": "text-pink-500", "bg": "bg-pink-500/10" },
                        { "title": "Minimalist Intent", "desc": "Removing noise to reveal the message.", "icon": "Eye", "color": "text-indigo-500", "bg": "bg-indigo-500/10" },
                        { "title": "Future Ready", "desc": "Adapting to the rapidly changing tech landscape.", "icon": "Zap", "color": "text-amber-500", "bg": "bg-amber-500/10" }
                    ]
                }
            },
             {
                "slug": "about-cta-footer",
                "type": "cta",
                "content": {
                    "title": "Ready to build your design?",
                    "link": "/contact"
                }
            }
        ]
        
        for i, sec in enumerate(about_sections):
            upsert_reusable_section(db, sec["slug"], sec["type"], sec["content"])
            link_section_to_page(db, "about", sec["slug"], order=i)
        print("✅ About page seeded.")

        # 3. Services Page
        print("\n--- Services Page ---")
        services_sections = [
            {
                "slug": "services-hero",
                "type": "hero",
                "content": {
                    "title": "Design Services & Pricing",
                    "description": "Professional quality work with transparent pricing tiers tailored for every scale."
                }
            },
            {
                "slug": "services-tiers",
                "type": "tiers",
                "content": {
                    "title": "Choose Your Plan",
                    "tiers": [
                        { "name": "Basic", "badge": "Affordable", "price": "₹999+", "description": "Quick edits and templates.", "features": ["1 Revision", "24h Delivery"], "icon": "Zap" },
                        { "name": "Premium", "badge": "Best Seller", "price": "₹4999+", "description": "Custom high-end designs.", "features": ["Unlimited Revisions", "Source Files"], "icon": "Sparkles" }
                    ]
                }
            },
            {
                "slug": "services-process",
                "type": "process",
                "content": {
                    "title": "Our 4-Step Process",
                    "description": "From vision to delivery, we ensure excellence at every stage.",
                    "steps": [
                        { "title": "Ideate", "desc": "Conceptual brainstorming." },
                        { "title": "Draft", "desc": "First AI-powered prototypes." },
                        { "title": "Refine", "desc": "Human-expert polishing." },
                        { "title": "Deliver", "desc": "High-fidelity final assets." }
                    ]
                }
            }
        ]
        
        for i, sec in enumerate(services_sections):
            upsert_reusable_section(db, sec["slug"], sec["type"], sec["content"])
            link_section_to_page(db, "services", sec["slug"], order=i)
        print("✅ Services page seeded.")

        db.commit()
        print("\n✅ SSOT CMS Seeding COMPLETE!")

    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding SSOT CMS: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_ssot_cms()
