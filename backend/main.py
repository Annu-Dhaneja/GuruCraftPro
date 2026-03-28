import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from core.config import settings
from core.database import Base, engine
from routers import admin_cms, admin_contacts, ai_lab, clothing_consultation, contact, user, wardrobe, site_config

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


# ── CORS MUST be registered BEFORE routes ────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_sync() -> None:
    """
    On every boot:
    1) Migrate old Enum columns to VARCHAR (safe for PostgreSQL)
    2) Upsert admin users from environment variables
    3) Ensure minimal CMS home content exists
    """
    from core import auth, database, models
    from repositories.cms import cms_repository

    db = next(database.get_db())

    # ── 0. Migrate Enum columns to VARCHAR (only needed once, safe to re-run) ──
    try:
        with engine.connect() as conn:
            # Check if we're on PostgreSQL (not SQLite)
            dialect = engine.dialect.name
            if dialect == "postgresql":
                # Convert role column from enum to varchar
                conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR USING role::text"))
                # Convert status columns from enum to varchar  
                conn.execute(text("ALTER TABLE pages ALTER COLUMN status TYPE VARCHAR USING status::text"))
                conn.execute(text("ALTER TABLE posts ALTER COLUMN status TYPE VARCHAR USING status::text"))
                # Drop the old enum types if they exist
                conn.execute(text("DROP TYPE IF EXISTS userrole CASCADE"))
                conn.execute(text("DROP TYPE IF EXISTS pagestatus CASCADE"))
                conn.commit()
                print("Startup: Enum→VARCHAR migration complete")
    except Exception as exc:
        print(f"Startup: Enum migration skipped (already done or N/A): {exc}")

    # ── 1. Seed admin users ──────────────────────────────────────────
    try:
        admin_pairs = [
            (os.getenv("ADMIN_USERNAME_1"), os.getenv("ADMIN_PASSWORD_1")),
            (os.getenv("ADMIN_USERNAME_2"), os.getenv("ADMIN_PASSWORD_2")),
        ]
        synced = []

        for uname, pwd in admin_pairs:
            if not uname or not pwd:
                continue

            row = db.query(models.User).filter(models.User.username == uname).first()
            hashed = auth.get_password_hash(pwd)

            if row:
                row.hashed_password = hashed
                row.role = "admin"
            else:
                db.add(models.User(
                    username=uname,
                    hashed_password=hashed,
                    role="admin",
                ))
            synced.append(uname)

        db.commit()
        print(f"Startup: admin sync OK → {synced or 'no env vars'}")
    except Exception as exc:
        db.rollback()
        print(f"Startup: admin sync FAILED → {exc}")

    # ── 2. Seed CMS home page ────────────────────────────────────────
    try:
        if not db.query(models.Page).filter(models.Page.slug == "home").first():
            cms_repository.update_page_content(db, "home", {
                "hero": {
                    "badge": "AI DESIGN STUDIO",
                    "headline_prefix": "Transform Your",
                    "headline_highlight": "Virtual Identity",
                    "headline_suffix": "Seamlessly",
                    "subheadline": "Experience the future of fashion with our AI-powered try-on technology.",
                }
            })
            
        # Seed site_config (Nav, Footer, Logo)
        # Always patch logo_url to ensure it's never missing after a redeploy
        existing_site_config = db.query(models.Page).filter(models.Page.slug == "site_config").first()
        if not existing_site_config:
            cms_repository.update_page_content(db, "site_config", {
                "brand": {
                    "name": "GurucraftPro",
                    "logo_text": "G",
                    "logo_url": "/images/brand/logo-dark-v4.svg",
                    "tagline": "Crafting digital excellence through the perfect blend of AI technology and human artistic vision."
                },
                "nav": [
                    {"label": "Home", "href": "/", "style": "default"},
                    {"label": "Portfolio", "href": "/portfolio", "style": "default"},
                    {"label": "AI Design Lab", "href": "/ai-lab", "style": "special"},
                    {"label": "Guru Ji Art Work", "href": "/guruji-darshan", "style": "guru"},
                    {"label": "Services", "href": "/services", "style": "default"},
                    {"label": "About", "href": "/about", "style": "default"},
                    {"label": "Contact", "href": "/contact", "style": "default"}
                ],
                "social": {
                    "instagram": "https://instagram.com/gurucraftpro",
                    "dribbble": "#",
                    "linkedin": "#",
                    "twitter": "#",
                    "accepting_projects": True
                },
                "footer_explore": [
                    {"label": "Our Services", "href": "/services"},
                    {"label": "Design Portfolio", "href": "/portfolio"},
                    {"label": "AI Creative Lab", "href": "/ai-lab"},
                    {"label": "The Studio", "href": "/about"}
                ],
                "footer_support": [
                    {"label": "Custom Request", "href": "/request"},
                    {"label": "Privacy Policy", "href": "/privacy"},
                    {"label": "Support Center", "href": "/contact"}
                ],
                "footer_bottom": {
                    "copyright": "© 2026 GurucraftPro. All rights reserved."
                }
            })
            print("Startup: site_config SEEDED")
        else:
            # Patch: Always ensure logo_url is set in brand (fixes missing logo on existing deployments)
            try:
                current = cms_repository.get_flattened_content(db, "site_config")
                brand = current.get("brand", {})
                needs_update = False
                
                if not brand.get("logo_url"):
                    brand["logo_url"] = "/images/brand/logo-dark-v4.svg"
                    needs_update = True
                
                # Also force correct brand name and text to verify patch
                if brand.get("name") == "Gurucraftpro": # Was lowercase 'p' in old seeds
                    brand["name"] = "GurucraftPro"
                    needs_update = True
                if brand.get("logo_text") == "A": # Old placeholder
                    brand["logo_text"] = "G"
                    needs_update = True
                    
                if needs_update:
                    current["brand"] = brand
                    cms_repository.update_page_content(db, "site_config", current)
                    print("Startup: site_config brand/logo PATCHED ✅")
            except Exception as patch_exc:
                print(f"Startup: site_config patch failed: {patch_exc}")

        # ── 3. Site-Wide CMS Dynamic Patching ───────────────────────────
        def patch_cms_page(slug: str, defaults: dict):
            try:
                current = cms_repository.get_flattened_content(db, slug)
                updated = False
                for key, val in defaults.items():
                    if key not in current:
                        current[key] = val
                        updated = True
                    elif isinstance(val, list) and isinstance(current.get(key), list) and not current[key]:
                        # Populate empty arrays
                        current[key] = val
                        updated = True
                    elif isinstance(val, dict) and isinstance(current.get(key), dict):
                        # Deep merge one level for sections
                        for sub_k, sub_v in val.items():
                            if sub_k not in current[key] or (isinstance(sub_v, list) and isinstance(current[key].get(sub_k), list) and not current[key][sub_k]):
                                current[key][sub_k] = sub_v
                                updated = True
                if updated:
                    cms_repository.update_page_content(db, slug, current)
                    print(f"Startup: {slug} PATCHED ✅")
            except Exception as e:
                print(f"Startup: {slug} patch failed: {e}")

        # Home Page Defaults
        patch_cms_page("home", {
            "hero": {
                "badge": "THE FUTURE OF DESIGN",
                "headline_prefix": "Design at the speed of",
                "headline_highlight": "Imagination",
                "headline_suffix": ".",
                "subheadline": "Combine AI-powered generation with expert human refinement to create polished brand, UI, and marketing assets faster."
            },
            "trust_strip": {
                "stats": [
                    {"label": "Projects", "value": "2.5k+"},
                    {"label": "Clients", "value": "120+"},
                    {"label": "Rating", "value": "4.9/5"}
                ],
                "companies": [
                    {"name": "Adobe", "logo": ""},
                    {"name": "Figma", "logo": ""},
                    {"name": "Stripe", "logo": ""}
                ]
            },
            "service_category_rail": {
                "title": "TEMPLATES",
                "categories": [
                    {"title": "Branding", "href": "/services", "image": "", "color": "from-indigo-500/80"},
                    {"title": "UI/UX Design", "href": "/services", "image": "", "color": "from-purple-500/80"}
                ]
            },
            "virtual_dressing_room": {
                "badge_text": "NEW FEATURE",
                "title": "Virtual Dressing Room",
                "description": "See how garments look on you instantly using our AI-powered try-on technology.",
                "image": "",
                "button_text": "Try It Now",
                "button_link": "/ai-lab"
            },
            "portfolio_preview": {
                "badge_text": "OUR WORK",
                "title": "Selected Projects",
                "description": "A curated collection of branding, digital experiences, and AI-driven design projects.",
                "button_text": "View Full Portfolio",
                "button_link": "/portfolio",
                "projects": []
            },
            "how_it_works": {
                "title": "Our Process",
                "subtitle": "How we bring your vision to life.",
                "steps": [
                    {"title": "Ideation", "description": "Collaborative brainstorming."},
                    {"title": "AI Iteration", "description": "Fast conceptualization."},
                    {"title": "Human Polish", "description": "Expert finishing touches."}
                ]
            },
            "main_services": {
                "title_prefix": "Comprehensive",
                "title_target": "Design Services",
                "subtitle": "From brand identity to digital products, we deliver excellence.",
                "services": [
                    { "title": "Wedding Plan", "description": "Bespoke coordination.", "price": "₹4999+", "image": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000", "color": "from-rose-500 to-pink-500", "link": "/services/wedding-plan" },
                    { "title": "Photo Editor", "description": "Professional retouching.", "price": "₹199+", "image": "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000", "color": "from-cyan-500 to-blue-500", "link": "/services/photo-editor" },
                    { "title": "Guru Ji Art", "description": "Divine masterpieces.", "price": "₹1499+", "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000", "color": "from-amber-500 to-orange-500", "link": "/services/guru-ji-art" }
                ]
            },
            "graphic_design_services": {
                "badge_text": "SERVICES",
                "title": "Graphic Design Solutions",
                "description": "High-impact visual communication for modern brands.",
                "services": [
                    { "title": "Game Design", "description": "Character concepts.", "price": "₹2499+", "image": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000", "color": "from-purple-500 to-pink-500", "link": "/services/game-design" },
                    { "title": "Vantage Ecom", "description": "E-commerce branding.", "price": "₹3499+", "image": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000", "color": "from-emerald-500 to-teal-500", "link": "/services/vantage-ecom" }
                ]
            },
            "things_section": {
                "badge": "EXPLORE",
                "title": "Things You Should Know",
                "subtitle": "Discover the creative capabilities and signature art that set us apart.",
                "featured_title": "Premium Guruji AR Experience",
                "featured_description": "Immersive 3D darshan bringing divine blessings to your home.",
                "featured_link": "/guruji-darshan",
                "items": [
                    {"title": "AI Try-On", "description": "Experience fashion virtually.", "link": "/ai-lab"}
                ]
            },
            "testimonials": {
                "title": "Client Love",
                "list": [
                    {"author": "Alex Rivera", "role": "Founder, TechFlow", "content": "The speed and quality are unmatched.", "rating": 5}
                ]
            },
            "about_section": {
                "title": "Design is intelligence made visible.",
                "paragraph1": "We are a multidisciplinary studio obsessed with the intersection of art and technology.",
                "paragraph2": "Our goal is clarity, beauty, and impact.",
                "image": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000",
                "stat1_value": "5+", "stat1_label": "Years Exp.",
                "stat2_value": "100%", "stat2_label": "Satisfaction",
                "stat3_value": "24/7", "stat3_label": "Support"
            },
            "blog_preview": {
                "badge_text": "INSIGHTS",
                "title": "From the Studio",
                "button_text": "Read the Journal",
                "button_link": "/blog",
                "posts": []
            },
            "final_cta": {
                "title": "Ready to transform your brand?",
                "description": "Let's build something extraordinary together.",
                "primary_button_text": "Start a Project",
                "primary_button_link": "/contact",
                "secondary_button_text": "View Pricing",
                "secondary_button_link": "/services"
            }
        })

        # About Page Defaults
        patch_cms_page("about", {
            "hero": {
                "badge": "ABOUT US",
                "title_prefix": "Where Technology Meets",
                "title_highlight": "Thoughtful Design",
                "description": "We are on a mission to redefine the creative workflow."
            },
            "founder": {
                "name": "Annu", "title": "Founder & Creative Lead",
                "badge": "THE VISIONARY", "main_title": "Artist. Designer. AI Explorer.",
                "main_description": "Passionate about bridging the gap between human intuition and machine intelligence.",
                "image": "", "tags": ["Artist", "Tech Enthusiast"], "bio": ["A decade of design excellence."]
            },
            "team": {
                "title": "Our Team", "subtitle": "The humans behind the machines.",
                "members": [
                    { 
                        "name": "Annu Dhanjeja", 
                        "role": "Head / Lead Designer", 
                        "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Annu",
                        "skills": ["Graphic Designer", "Video Editor"],
                        "social": { "instagram": "https://instagram.com/gurucraftpro", "linkedin": "#", "behance": "#" }
                    },
                    { 
                        "name": "Om Prakash", 
                        "role": "Lead Developer", 
                        "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=Om",
                        "skills": ["Full Stack Developer", "Python Expert"],
                        "social": { "github": "#", "linkedin": "#", "twitter": "#" }
                    }
                ]
            },
            "philosophy": {
                "title": "Our Philosophy", "description": "Good design is invisible—it just works.",
                "values": [
                    { "title": "Human First", "desc": "AI assists, but decisions remain human-led.", "icon": "Heart", "color": "text-pink-500", "bg": "bg-pink-500/10" },
                    { "title": "Clarity Over Noise", "desc": "Focus on the essential message.", "icon": "Eye", "color": "text-indigo-500", "bg": "bg-indigo-500/10" },
                    { "title": "Adaptable Creativity", "desc": "Designs that scale with your brand.", "icon": "Maximize", "color": "text-purple-500", "bg": "bg-purple-500/10" },
                    { "title": "Ethical AI Use", "desc": "Transparency and authenticity.", "icon": "ShieldCheck", "color": "text-green-500", "bg": "bg-green-500/10" }
                ]
            },
            "ai_human": {
                "title": "Vision & Innovation", "description": "Leveraging AI for efficiency, keeping humans for soul.",
                "features": ["Speed", "Scalability", "Artistry"]
            },
            "tools": {
                "title": "Toolkit & Expertise", 
                "tools": ["Figma", "Photoshop", "Midjourney", "Next.js"],
                "steps": [
                    { "title": "Define", "desc": "Understand goals" },
                    { "title": "Explore", "desc": "AI + Manual ideas" },
                    { "title": "Refine", "desc": "Polish with intent" },
                    { "title": "Deliver", "desc": "Final assets" }
                ]
            },
            "services_preview": { "title": "What We Do", "services": [] },
            "trust_section": { 
                "title": "Why clients choose Gurucraftpro", 
                "description": "Design is a partnership. We prioritize transparency, quality, and speed.",
                "strengths": [
                    {"title": "Expert Team", "desc": "Skilled professionals."},
                    {"title": "Fast Delivery", "desc": "Quick turnaround."}
                ],
                "stats": [
                    {"value": "500+", "label": "Projects Done"},
                    {"value": "24/7", "label": "Support"}
                ]
            },
            "about_cta": { "title": "Join our journey.", "link": "/contact" }
        })

        # Services Page Defaults
        patch_cms_page("services", {
            "hero": { "title": "Services & Pricing", "description": "Professional design tiers tailored for every scale." },
            "cards": { "title": "Main Offerings", "items": [] },
            "tiers": [
                {"name": "Starter", "badge": "Popular", "description": "Ideal for small projects.", "price": "₹999", "features": ["1 Design", "2 Revisions"], "icon": "Sparkles"}
            ],
            "comparison": { "title": "Compare Plans", "columns": ["Feature", "Starter", "Pro"], "rows": [] },
            "process": { "title": "Delivery Process", "description": "Our proven 4-step workflow.", "steps": [] },
            "faq": [ {"q": "How fast is delivery?", "a": "Typically 24-48 hours."} ],
            "cta": { "title": "Ready to get started?", "link": "/contact" }
        })

        # Portfolio Page Defaults
        patch_cms_page("portfolio", {
            "hero": { "title": "Our Portfolio", "description": "A collection of digital excellence." },
            "categories": ["All", "Web", "Branding", "AI"],
            "projects": [],
            "cta": { "title": "Have a project in mind?", "link": "/contact" }
        })
            
        # Seed guruji
        if not db.query(models.Page).filter(models.Page.slug == "guruji").first():
            cms_repository.update_page_content(db, "guruji", {
                "hero_title_prefix": "Guruji Ke",
                "hero_title_highlight": "Sakshat Darshan",
                "hero_subtitle": "Immerse yourself in divine energy with our cutting-edge AR technology and spiritual craftsmanship.",
                "ar_title_prefix": "Bringing Blessings",
                "ar_title_highlight": "Into Your Home",
                "ar_subtitle": "Our 'Guruji Ke Sakshat Darshan' feature uses high-fidelity 3D scanning and spatial computing to create an lifelike presence in your personal space.",
                "satsang_title_prefix": "Premium Guruji",
                "satsang_title_highlight": "Satsang Box",
                "satsang_subtitle": "A masterpiece of spiritual art and technology. The Satsang Story Box brings the sacred sounds of Bhajans and Mantras pre-loaded in a beautifully crafted box."
            })
            print("Startup: guruji SEEDED")
            
        # Seed AI Design Lab
        if not db.query(models.Page).filter(models.Page.slug == "ai_lab").first():
            cms_repository.update_page_content(db, "ai_lab", {
                "hero": {
                    "title": "Welcome to the AI Design Lab",
                    "subtitle": "Future of Creativity",
                    "description": "Explore cutting-edge tools and experiments that merge human creativity with artificial intelligence."
                },
                "tools": [
                    {
                        "title": "Style Reference Transfer",
                        "description": "Upload a reference image and instantly apply its unique aesthetic to any new design.",
                        "icon": "Image",
                        "status": "Active",
                        "color": "text-indigo-400",
                        "bg": "bg-indigo-500/10"
                    },
                    {
                        "title": "Smart Layout Generator",
                        "description": "Automatically generate conversion-optimized wireframes based on your industry and goals.",
                        "icon": "Layout",
                        "status": "Beta",
                        "color": "text-purple-400",
                        "bg": "bg-purple-500/10"
                    }
                ]
            })
            print("Startup: ai_lab SEEDED")
        # ── New Service Segments ───────────────────────────
        new_services = {
            "photo-editor": {
                "hero": { "title": "Professional Photo Editing", "subtitle": "Flawless Visuals", "description": "High-end retouching, background removal, and color correction for photographers and brands." },
                "features": [
                    { "title": "High-End Retouching", "description": "Skin smoothing, blemish removal, and realistic texture preservation." },
                    { "title": "Background Removal", "description": "Perfect cutouts for e-commerce and marketing assets." }
                ],
                "cta": { "title": "Get Your Photos Edited", "link": "/contact" }
            },
            "wedding-plan": {
                "hero": { "title": "Luxury Wedding Planning", "subtitle": "Memorable Celebrations", "description": "Bespoke wedding design and coordination services for your most special day." },
                "features": [
                    { "title": "Themed Decor Design", "description": "Custom visual concepts tailored to your personal style." },
                    { "title": "Timeline Coordination", "description": "Stress-free management from engagement to the big day." }
                ],
                "cta": { "title": "Plan Your Wedding", "link": "/contact" }
            },
            "guru-ji-art": {
                "hero": { "title": "Divine Guru Ji Art Work", "subtitle": "Sacred Masterpieces", "description": "Hand-painted and digitally crafted portraits of Guru Ji, bringing blessings to your space." },
                "features": [
                    { "title": "Custom Portraits", "description": "Unique, hand-crafted artwork tailored to your requirements." },
                    { "title": "Premium Framing", "description": "Luxury frames that complement the divine beauty of the art." }
                ],
                "cta": { "title": "Inquire About Art", "link": "/contact" }
            },
            "game-design": {
                "hero": { "title": "Next-Gen Game Design", "subtitle": "Immersive Worlds", "description": "Character concepts, environment art, and UI design for modern gaming experiences." },
                "features": [
                    { "title": "Character Concepts", "description": "Innovative character designs with detailed turnarounds." },
                    { "title": "Environment Art", "description": "Breathtaking landscapes and atmospheric setting design." }
                ],
                "cta": { "title": "Start Your Game Project", "link": "/contact" }
            },
            "vantage-ecom": {
                "hero": { "title": "Vantage E-commerce Solutions", "subtitle": "Sell More Online", "description": "Growth-focused design and branding for high-performing e-commerce stores." },
                "features": [
                    { "title": "Conversion-Optimized UI", "description": "Shopping experiences designed to maximize sales." },
                    { "title": "Product Branding", "description": "Cohesive visual identity across all your product lines." }
                ],
                "cta": { "title": "Boost Your Store", "link": "/contact" }
            }
        }

        for slug, defaults in new_services.items():
            if not db.query(models.Page).filter(models.Page.slug == slug).first():
                cms_repository.update_page_content(db, slug, defaults)
                print(f"Startup: {slug} SEEDED ✅")

        # Seed Portfolio
        if not db.query(models.Page).filter(models.Page.slug == "portfolio").first():
            cms_repository.update_page_content(db, "portfolio", {
                "categories": ["All", "Web Design", "App UI", "Branding", "AI Art"],
                "projects": [
                    {
                        "id": "1",
                        "title": "Lumina App Redesign",
                        "category": "App UI",
                        "image": "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=600",
                        "client": "Lumina",
                        "date": "Jan 2024",
                        "description": "Complete UI/UX overhaul focusing on accessibility and modern aesthetics.",
                        "challenge": "Outdated interface causing high bounce rates.",
                        "solution": "Implemented a clean, dark-mode first design with intuitive navigation."
                    }
                ]
            })
            print("Startup: portfolio SEEDED")

        # Seed Resources
        if not db.query(models.Page).filter(models.Page.slug == "resources").first():
            cms_repository.update_page_content(db, "resources", {
                "hero": {
                    "title": "Learn & Master Design",
                    "description": "Free tutorials, premium UI kits, and advanced AI prompts to level up your workflow."
                },
                "categories": ["All Resources", "Design Tutorials", "AI & Design", "Branding", "UI/UX", "Free Assets"],
                "tutorials": [
                    { "title": "Figma 101: Auto-Layout Mastery", "category": "UI/UX", "duration": "12 mins" },
                    { "title": "Midjourney V6: Style Reference Guide", "category": "AI & Design", "duration": "18 mins" }
                ],
                "prompts": [
                    { "id": 1, "title": "Cyberpunk Cityscape", "text": "Futuristic city street at night...", "style": "Environment", "image": "https://images.unsplash.com/photo-1515630278258-407f66498911" }
                ]
            })
            print("Startup: resources SEEDED")

        # Seed Contact
        if not db.query(models.Page).filter(models.Page.slug == "contact").first():
            cms_repository.update_page_content(db, "contact", {
                "hero": {
                    "title": "Let's Build Something Extraordinary",
                    "description": "Ready to transform your vision into reality? We're here to help you every step of the way."
                },
                "alternatives": {
                    "title": "Or connect with us directly",
                    "email": "hello@annudesign.com",
                    "booking_link": "/book",
                    "booking_text": "Book a Free Consultation"
                },
                "process": {
                    "steps": [
                        { "icon": "MessageSquare", "title": "Message Received", "desc": "You submit the form." },
                        { "icon": "Clock", "title": "24h Review", "desc": "We analyze your request." },
                        { "icon": "UserCheck", "title": "Follow-up", "desc": "Proposal or questions." },
                        { "icon": "Rocket", "title": "Kickoff", "desc": "Project starts." }
                    ]
                },
                "faqs": [
                    { "q": "How soon will I get a reply?", "a": "Within 24-48 hours during business days." }
                ]
            })
            print("Startup: contact SEEDED")
            
        # ── 3. Global Path Migration (/img/ -> /images/) ────────────────
        try:
            from core.models import Media, ContentBlock, Post
            
            # Media table
            media_items = db.query(Media).filter(Media.file_url.like('%/img/%')).all()
            for item in media_items:
                item.file_url = item.file_url.replace('/img/', '/images/')
            
            # ContentBlock table
            blocks = db.query(ContentBlock).filter(ContentBlock.value.like('%/img/%')).all()
            for block in blocks:
                block.value = block.value.replace('/img/', '/images/')
            
            # Second pass: fix user_provided -> generated mismatch if seen
            blocks_mismatch = db.query(ContentBlock).filter(ContentBlock.value.like('%/images/content/user_provided/%')).all()
            for block in blocks_mismatch:
                block.value = block.value.replace('/images/content/user_provided/', '/images/generated/')
            
            blocks_mismatchv2 = db.query(ContentBlock).filter(ContentBlock.value.like('%/images/user_provided/%')).all()
            for block in blocks_mismatchv2:
                block.value = block.value.replace('/images/user_provided/', '/images/generated/')
                
            # Post table
            posts = db.query(Post).filter(Post.content.like('%/img/%')).all()
            for post in posts:
                post.content = post.content.replace('/img/', '/images/')
                
            db.commit()
            print("Startup: Global image path migration complete")
        except Exception as migration_exc:
            db.rollback()
            print(f"Startup: Path migration failed: {migration_exc}")

        # ── 4. New Service Segments ───────────────────────────
        new_services = {
            "photo-editor": {
                "hero": { "title": "Professional Photo Editing", "subtitle": "Flawless Visuals", "description": "High-end retouching, background removal, and color correction for photographers and brands." },
                "features": [
                    { "title": "High-End Retouching", "description": "Skin smoothing, blemish removal, and realistic texture preservation." },
                    { "title": "Background Removal", "description": "Perfect cutouts for e-commerce and marketing assets." }
                ],
                "cta": { "title": "Get Your Photos Edited", "link": "/contact" }
            },
            "wedding-plan": {
                "hero": { "title": "Luxury Wedding Planning", "subtitle": "Memorable Celebrations", "description": "Bespoke wedding design and coordination services for your most special day." },
                "features": [
                    { "title": "Themed Decor Design", "description": "Custom visual concepts tailored to your personal style." },
                    { "title": "Timeline Coordination", "description": "Stress-free management from engagement to the big day." }
                ],
                "cta": { "title": "Plan Your Wedding", "link": "/contact" }
            },
            "guru-ji-art": {
                "hero": { "title": "Divine Guru Ji Art Work", "subtitle": "Sacred Masterpieces", "description": "Hand-painted and digitally crafted portraits of Guru Ji, bringing blessings to your space." },
                "features": [
                    { "title": "Custom Portraits", "description": "Unique, hand-crafted artwork tailored to your requirements." },
                    { "title": "Premium Framing", "description": "Luxury frames that complement the divine beauty of the art." }
                ],
                "cta": { "title": "Inquire About Art", "link": "/contact" }
            },
            "game-design": {
                "hero": { "title": "Next-Gen Game Design", "subtitle": "Immersive Worlds", "description": "Character concepts, environment art, and UI design for modern gaming experiences." },
                "features": [
                    { "title": "Character Concepts", "description": "Innovative character designs with detailed turnarounds." },
                    { "title": "Environment Art", "description": "Breathtaking landscapes and atmospheric setting design." }
                ],
                "cta": { "title": "Start Your Game Project", "link": "/contact" }
            },
            "vantage-ecom": {
                "hero": { "title": "Vantage E-commerce Solutions", "subtitle": "Sell More Online", "description": "Growth-focused design and branding for high-performing e-commerce stores." },
                "features": [
                    { "title": "Conversion-Optimized UI", "description": "Shopping experiences designed to maximize sales." },
                    { "title": "Product Branding", "description": "Cohesive visual identity across all your product lines." }
                ],
                "cta": { "title": "Boost Your Store", "link": "/contact" }
            }
        }

        for slug, defaults in new_services.items():
            if not db.query(models.Page).filter(models.Page.slug == slug).first():
                cms_repository.update_page_content(db, slug, defaults)
                print(f"Startup: {slug} SEEDED ✅")

        db.commit()
        print("Startup: CMS sync OK")
    except Exception as exc:
        db.rollback()
        print(f"Startup: CMS sync FAILED → {exc}")
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Annu Design Studio API Backend"}


@app.get("/health")
def health_check():
    """Check if the database is connected and working."""
    from core import database, models
    from sqlalchemy import text

    result = {"api": "ok"}

    try:
        db = next(database.get_db())

        # 1. Raw SQL ping
        db.execute(text("SELECT 1"))
        result["database"] = "connected"

        # 2. Count users
        user_count = db.query(models.User).count()
        result["users_in_db"] = user_count

        # 3. Show DB dialect (sqlite vs postgresql)
        result["db_type"] = engine.dialect.name

        # 4. List usernames (for debugging — remove later)
        users = db.query(models.User.username).all()
        result["usernames"] = [u[0] for u in users]

        db.close()
    except Exception as exc:
        result["database"] = "DISCONNECTED"
        result["error"] = str(exc)

    return result


# ── Routers ──────────────────────────────────────────────────────────
app.include_router(user.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["contact"])
app.include_router(ai_lab.router, prefix="/api/v1/ai-lab", tags=["ai-lab"])
app.include_router(clothing_consultation.router, prefix="/api/v1/consultation", tags=["consultation"])
app.include_router(admin_cms.router, prefix="/api/v1/cms", tags=["cms"])
app.include_router(admin_contacts.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(wardrobe.router, prefix="/api/v1/wardrobe", tags=["wardrobe"])
app.include_router(site_config.router, prefix="/api/v1/site-config", tags=["site-config"])

# ── Static Files ─────────────────────────────────────────────────────
# Create local uploads dir to ensure backend CMS uploads work securely
local_uploads_path = os.path.join(os.path.dirname(__file__), "static", "uploads")
os.makedirs(local_uploads_path, exist_ok=True)

try:
    # Mount /images/uploads/wardrobe FIRST for new feature
    wardrobe_uploads = os.path.join(os.path.dirname(__file__), "static", "uploads", "wardrobe")
    os.makedirs(wardrobe_uploads, exist_ok=True)
    app.mount("/images/uploads/wardrobe", StaticFiles(directory=wardrobe_uploads), name="wardrobe_uploads")

    # Mount /images/uploads SECOND
    app.mount("/images/uploads", StaticFiles(directory=local_uploads_path), name="uploads")
    print(f"Static: Mounted /images/uploads and /wardrobe from {local_uploads_path}")
except Exception as e:
    print(f"Static Error: Could not mount uploads: {e}")

try:
    images_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "images")
    if os.path.exists(images_path):
        app.mount("/images", StaticFiles(directory=images_path), name="images")
        print(f"Static: Mounted /images from {images_path}")
    else:
        # Fallback for production if only uploads is present or path is different
        print(f"Static Warning: {images_path} not found")
except Exception as e:
    print(f"Static Error: Could not mount /images: {e}")
