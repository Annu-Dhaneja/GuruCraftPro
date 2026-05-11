from sqlalchemy.orm import Session
from core.database import SessionLocal
from core import models
from datetime import datetime, timedelta

def seed_wedding_data():
    db = SessionLocal()
    try:
        # 1. Create Wedding Plan
        wedding = db.query(models.WeddingPlan).filter(models.WeddingPlan.partner_names == "Aditya & Ananya").first()
        if not wedding:
            wedding = models.WeddingPlan(
                partner_names="Aditya & Ananya",
                wedding_date=datetime.now() + timedelta(days=42),
                location="Udaipur Palace",
                total_budget=5000000,
                guest_count=250,
                priority="Decor"
            )
            db.add(wedding)
            db.commit()
            db.refresh(wedding)
        
        # 2. Add Tasks
        tasks_data = [
            {"title": "Book Venue", "status": "completed", "category": "Planning"},
            {"title": "Finalize Guest List", "status": "completed", "category": "Guests"},
            {"title": "Select Caterer", "status": "in_progress", "category": "Catering"},
            {"title": "Wedding Outfits", "status": "pending", "category": "Fashion"},
            {"title": "Send Invitations", "status": "pending", "category": "Guests"},
            {"title": "Book Photographer", "status": "completed", "category": "Vendors"},
            {"title": "Flower Arrangements", "status": "pending", "category": "Decor"},
            {"title": "Music & Entertainment", "status": "in_progress", "category": "Vendors"},
        ]
        
        for t in tasks_data:
            existing = db.query(models.WeddingTask).filter(models.WeddingTask.wedding_id == wedding.id, models.WeddingTask.title == t["title"]).first()
            if not existing:
                db.add(models.WeddingTask(wedding_id=wedding.id, **t))

        # 3. Add Guests
        guests_data = [
            {"name": "Rahul Sharma", "category": "Family", "status": "confirmed"},
            {"name": "Priya Patel", "category": "Friend", "status": "confirmed"},
            {"name": "Amit Kumar", "category": "Colleague", "status": "pending"},
            {"name": "Sneha Gupta", "category": "Family", "status": "declined"},
            {"name": "Vikram Singh", "category": "Friend", "status": "confirmed"},
        ]
        
        for g in guests_data:
            existing = db.query(models.WeddingGuest).filter(models.WeddingGuest.wedding_id == wedding.id, models.WeddingGuest.name == g["name"]).first()
            if not existing:
                db.add(models.WeddingGuest(wedding_id=wedding.id, **g))

        # 4. Add Vendors
        vendors_data = [
            {"name": "The Royal Caterers", "category": "Catering", "total_quote": 1500000, "paid_amount": 500000, "status": "hired"},
            {"name": "Cinematic Moments", "category": "Photography", "total_quote": 300000, "paid_amount": 300000, "status": "completed"},
            {"name": "Palace Decorators", "category": "Decor", "total_quote": 800000, "paid_amount": 200000, "status": "hired"},
        ]
        
        for v in vendors_data:
            existing = db.query(models.WeddingVendor).filter(models.WeddingVendor.wedding_id == wedding.id, models.WeddingVendor.name == v["name"]).first()
            if not existing:
                db.add(models.WeddingVendor(wedding_id=wedding.id, **v))

        # 5. Add Budgets
        budgets_data = [
            {"category": "Venue", "allocated_amount": 2000000, "spent_amount": 2000000},
            {"category": "Catering", "allocated_amount": 1500000, "spent_amount": 500000},
            {"category": "Decor", "allocated_amount": 1000000, "spent_amount": 200000},
            {"category": "Attire", "allocated_amount": 500000, "spent_amount": 100000},
        ]
        
        for b in budgets_data:
            existing = db.query(models.WeddingBudget).filter(models.WeddingBudget.wedding_id == wedding.id, models.WeddingBudget.category == b["category"]).first()
            if not existing:
                db.add(models.WeddingBudget(wedding_id=wedding.id, **b))

        db.commit()
        print("Wedding data seeded successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding wedding data: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_wedding_data()
