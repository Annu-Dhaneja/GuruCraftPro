import os
import sys

# Point to backend directory for imports
backend_dir = r"e:\Project\virtual_try-main\backend"
sys.path.append(backend_dir)

# Override database URL to point directly to Supabase production
os.environ["DATABASE_URL"] = "postgresql://postgres:Oma628752%23Op@db.puprmtfdjsuiqlvtqfrh.supabase.co:5432/postgres"

from core.database import SessionLocal, engine
from services.seeding_service import SeedingService
from seed_wedding_cms import seed_wedding_showcase
from seed_planner_cms import seed_planner_cms
from seed_services import seed_services, seed_guruji_art, seed_resources, seed_vantage_ecom

def sync_all():
    print(f"--- STARTING ALL-IN-ONE PRODUCTION SEEDING AND SYNC ---")
    print(f"Targeting Host: {engine.url.host}")
    
    # Run Seeding Service base sync
    print("\n[PHASE 1] Running SeedingService (Roles, Admins, Settings, Base CMS)...")
    db = SessionLocal()
    try:
        SeedingService.run_all(db)
        print("[SUCCESS] SeedingService finished.")
    except Exception as e:
        print(f"[ERROR] SeedingService failed: {e}")
    finally:
        db.close()
        
    # Run Wedding Showcase Seed
    print("\n[PHASE 2] Seeding Wedding Showcase...")
    try:
        seed_wedding_showcase()
        print("[SUCCESS] Wedding Showcase seeded.")
    except Exception as e:
        print(f"[ERROR] Wedding Showcase seeding failed: {e}")
        
    # Run Planner CMS Seed
    print("\n[PHASE 3] Seeding 7-Day Planner CMS...")
    try:
        seed_planner_cms()
        print("[SUCCESS] 7-Day Planner CMS seeded.")
    except Exception as e:
        print(f"[ERROR] 7-Day Planner CMS seeding failed: {e}")
        
    # Run Services and specific sections
    print("\n[PHASE 4] Seeding Services, Guru Ji Art, Resources, Vantage Ecom...")
    try:
        seed_services()
        seed_guruji_art()
        seed_resources()
        seed_vantage_ecom()
        print("[SUCCESS] Services and specific sections seeded.")
    except Exception as e:
        print(f"[ERROR] Services sections seeding failed: {e}")

    print("\n--- ALL SEEDING AND SYNC PHASES COMPLETED ---")

if __name__ == "__main__":
    sync_all()
