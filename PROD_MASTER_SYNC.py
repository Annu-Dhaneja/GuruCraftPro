import os
import sys
import json
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# 1. SETUP PATHS
backend_dir = os.path.join(os.getcwd(), 'backend')
sys.path.append(backend_dir)

# 2. PRODUCTION DATABASE URL
PROD_DB_URL = "postgresql://annu_project_user:TWdBAMY4k7bHurZnY9sOEUHraNJdPk7E@dpg-d6rou5k50q8c73f6c8s0-a.oregon-postgres.render.com/annu_project?sslmode=require"
os.environ["DATABASE_URL"] = PROD_DB_URL

# Now import backend modules
try:
    from core.database import engine, SessionLocal, Base
    from core import models, auth
    from repositories.cms import cms_repository
    print("[INFO] Backend modules loaded successfully.")
except ImportError as e:
    print(f"[ERROR] Failed to load backend modules: {e}")
    sys.exit(1)

def master_sync():
    print(f"[START] STARTING MASTER PRODUCTION SYNC...")
    print(f"Target Host: {engine.url.host}")

    # 3. PROVISION SCHEMA
    try:
        print("[PROCESS] Provisioning schema...")
        Base.metadata.create_all(bind=engine)
        print("[SUCCESS] Schema Verified/Created.")
    except Exception as e:
        print(f"[ERROR] Schema error: {e}")
        return

    db = SessionLocal()
    try:
        # 4. SEED ADMIN USERS
        print("[PROCESS] Seeding Admin Users...")
        admins = [
            {"u": "annuad@#05", "p": "Oma628752#Op", "n": "Annu"},
            {"u": "Om@Op", "p": "Oma628752#Op", "n": "Om Prakash"}
        ]
        for admin in admins:
            user = db.query(models.User).filter(models.User.username == admin["u"]).first()
            hashed_pw = auth.get_password_hash(admin["p"])
            if user:
                print(f"  [SYNC] Updating admin: {admin['u']}")
                user.hashed_password = hashed_pw
                user.role = "admin"
            else:
                print(f"  [SYNC] Creating admin: {admin['u']}")
                user = models.User(
                    username=admin["u"],
                    hashed_password=hashed_pw,
                    name=admin["n"],
                    role="admin"
                )
                db.add(user)
        db.commit()
        print("[SUCCESS] Admins synced.")

        # 5. SEED CMS CONTENT (RELATIONAL)
        print("[PROCESS] Seeding CMS Pages...")
        
        # Load Guru Ji data
        try:
            with open(os.path.join(backend_dir, 'data', 'guruji_content.json'), 'r') as f:
                guruji_data = json.load(f)
        except:
            guruji_data = {"hero_title_prefix": "Guruji"}

        # Load Contact data
        try:
            with open(os.path.join(backend_dir, 'data', 'contact_content.json'), 'r') as f:
                contact_data = json.load(f)
        except:
            contact_data = {"hero": {"title": "Contact Us"}}

        pages_to_sync = {
            "home": {
                "hero": {
                    "badge": "PRODUCTION ACTIVATED V4.0",
                    "headline_prefix": "AI-Powered Luxury Commerce",
                    "headline_highlight": "& Lifestyle Platform",
                    "headline_suffix": "",
                    "subheadline": "Fashion AI, Wedding Planning, Spiritual Artistry, Luxury Editing & Intelligent Creative Tools in one premium ecosystem."
                },
                "trust_strip": {
                    "stats": [
                        {"label": "Designs Delivered", "value": "250+"},
                        {"label": "Global Clients", "value": "45+"},
                        {"label": "AI Performance", "value": "99.9%"}
                    ],
                    "companies": [
                        {"name": "Adobe", "logo": "https://cdn.simpleicons.org/adobe/ffffff"},
                        {"name": "Figma", "logo": "https://cdn.simpleicons.org/figma/ffffff"},
                        {"name": "Stripe", "logo": "https://cdn.simpleicons.org/stripe/ffffff"},
                        {"name": "Shopify", "logo": "https://cdn.simpleicons.org/shopify/ffffff"}
                    ]
                }
            },
            "guru-ji-art": guruji_data,
            "contact": contact_data,
            "vantage-ecom": {
                "hero": {
                    "title": "VantageEcom",
                    "subtitle": "SMART MENU LAYOUT",
                    "description": "Professional-grade post-production and e-commerce growth strategies.",
                    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400"
                }
            }
        }

        for slug, data in pages_to_sync.items():
            print(f"  [SYNC] Syncing Page: {slug}")
            cms_repository.update_page_content(db, slug, data)
        
        print("[SUCCESS] CMS Pages synced.")

        # 6. SEED SSOT MODELS (NEW)
        print("[PROCESS] Seeding SSOT Global Settings...")
        global_set = db.query(models.GlobalSettings).first()
        if not global_set:
            global_set = models.GlobalSettings(
                site_name="GurucraftPro",
                contact_email="hello@gurucraftpro.com",
                phone="+91 8527837527",
                social_json=json.dumps(contact_data.get("social_links", {}))
            )
            db.add(global_set)
        else:
            global_set.site_name = "GurucraftPro"
            global_set.social_json = json.dumps(contact_data.get("social_links", {}))
        
        db.commit()
        print("[SUCCESS] SSOT Settings synced.")

        print("--- MASTER SYNC COMPLETE ---")

    except Exception as e:
        print(f"[ERROR] Sync Error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    master_sync()
