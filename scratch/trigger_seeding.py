import sys
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

# Load environment variables
load_dotenv(os.path.join(os.getcwd(), 'backend', '.env'))

from core.models import Base
from services.seeding_service import SeedingService

# Explicitly use backend/sql_app.db
db_path = os.path.join(os.getcwd(), 'backend', 'sql_app.db')
engine = create_engine(f"sqlite:///{db_path}")

# Create tables if not exist
Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

try:
    print(f"Starting database seeding in {db_path}...")
    SeedingService.run_all(db)
    print("Database seeding completed.")
finally:
    db.close()
