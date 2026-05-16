import os
import sys
from sqlalchemy.orm import Session
from core.database import SessionLocal, engine
from core import models
from services.seeding_service import SeedingService

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def run_master_seed():
    print("MASTER SEED: Starting full platform synchronization...")
    db = SessionLocal()
    try:
        # 1. Base Infrastructure (Roles, Admins, Global Settings)
        print("\n--- PHASE 1: Infrastructure ---")
        SeedingService.migrate_enums(db)
        SeedingService.seed_roles(db)
        SeedingService.seed_admins(db)
        SeedingService.seed_global_settings(db)

        # 2. CMS Pages (SSOT Priority)
        print("\n--- PHASE 2: CMS Content (SSOT) ---")
        SeedingService.seed_cms_pages(db)

        # 3. Module Specific Data (Expansion)
        print("\n--- PHASE 3: Module Expansion ---")
        try:
            from seed_services import seed_services
            seed_services()
            print("Services seeded.")
        except ImportError:
            print("seed_services.py not found, skipping.")

        try:
            from seed_wedding import seed_wedding_data
            # We might need to adjust this if the function name differs
            # Assuming it takes a db session or handles its own
            seed_wedding_data()
            print("Wedding samples seeded.")
        except (ImportError, AttributeError):
            print("seed_wedding.py or seed_wedding_data function not found, skipping.")

        # 4. Final Verification
        print("\n--- PHASE 4: Final Verification ---")
        user_count = db.query(models.User).count()
        page_count = db.query(models.CMSPage).count()
        print(f"Sync Complete. Total Users: {user_count}, Total CMS Pages: {page_count}")

    except Exception as e:
        print(f"MASTER SEED FAILED: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    run_master_seed()
