import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Add the backend directory to path so we can import properly
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(backend_dir)

from core.database import SessionLocal, engine, Base
from services.seeding_service import SeedingService

# Load environment variables
load_dotenv(dotenv_path=os.path.join(backend_dir, ".env"))

def seed_data():
    print("Connecting to Database...")
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Run unified seeding service
        SeedingService.run_all(db)
        
        # Run module specific seeders if present
        try:
            from seed_services import seed_services
            seed_services()
            print("Module Seeding: Services seeded successfully.")
        except ImportError:
            print("Module Seeding: seed_services.py not found or skipped.")
            
        try:
            from seed_wedding import seed_wedding_data
            seed_wedding_data()
            print("Module Seeding: Wedding samples seeded successfully.")
        except Exception as e:
            print(f"Module Seeding: Skipping wedding seed: {e}")
            
        print("Database seeding and synchronization completed successfully!")
    except Exception as e:
        print(f"Seeding Failed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Seed process started...")
    seed_data()
    print("Seed process completed.")
