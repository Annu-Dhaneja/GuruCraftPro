import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from sqlalchemy.orm import Session
from core import database, models, auth
import json

def universal_fix():
    print("--- 🚀 STARTING UNIVERSAL REPAIR ---")
    
    # 1. Database Connection & Schema
    try:
        db = next(database.get_db())
        # Ensure tables exist
        models.Base.metadata.create_all(bind=database.engine)
        print("✅ Schema Verified/Created.")
    except Exception as e:
        print(f"❌ Error during schema verification: {e}")
        return

    # 2. Hard-Fix Admin User
    try:
        admin_username = "annuad@#05"
        admin_pass = "annu@123" # Standard password they were trying
        
        # Check if user exists
        user = db.query(models.User).filter(models.User.username == admin_username).first()
        
        # Byte-safe hash for the fixed admin
        hashed = auth.get_password_hash(admin_pass)
        
        if user:
            print(f"🔄 Updating existing user: {admin_username}")
            user.hashed_password = hashed
            user.role = models.UserRole.ADMIN
        else:
            print(f"✨ Creating new admin user: {admin_username}")
            user = models.User(
                username=admin_username,
                hashed_password=hashed,
                role=models.UserRole.ADMIN
            )
            db.add(user)
        
        db.commit()
        print(f"✅ User '{admin_username}' is ready with password '{admin_pass}' (Truncated to 72 bytes internally).")
    except Exception as e:
        print(f"❌ Error during user repair: {e}")
        db.rollback()

    # 3. Ensure "home" page exists in CMS
    try:
        from repositories.cms import cms_repository
        page = db.query(models.Page).filter(models.Page.slug == "home").first()
        if not page:
            print("📄 Creating default 'home' page entries...")
            default_home = {
                "hero": {
                    "badge": "AI DESIGN STUDIO",
                    "headline_prefix": "Transform Your",
                    "headline_highlight": "Virtual Identity",
                    "headline_suffix": "Seamlessly",
                    "subheadline": "Experience the future of fashion with our AI-powered try-on technology."
                }
            }
            cms_repository.update_page_content(db, "home", default_home)
            db.commit()
            print("✅ Default CMS content initialized.")
        else:
            print("✅ CMS Content exists.")
    except Exception as e:
        print(f"❌ Error during CMS setup: {e}")

    print("--- 🏁 REPAIR COMPLETE ---")

if __name__ == "__main__":
    universal_fix()
