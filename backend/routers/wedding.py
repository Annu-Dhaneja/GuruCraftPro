from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from core.database import get_db
from core import models
from schemas import wedding as schemas

router = APIRouter()

@router.get("/dashboard", response_model=schemas.WeddingDashboardData)
def get_wedding_dashboard(db: Session = Depends(get_db)):
    # For now, we use the first wedding plan as the "demo"
    plan = db.query(models.WeddingPlan).first()
    if not plan:
        # Create a default plan if none exists
        plan = models.WeddingPlan(
            partner_names="Aditya & Ananya",
            location="Udaipur Palace",
            total_budget=5000000,
            guest_count=250
        )
        db.add(plan)
        db.commit()
        db.refresh(plan)

    tasks = db.query(models.WeddingTask).filter(models.WeddingTask.wedding_id == plan.id).all()
    guests = db.query(models.WeddingGuest).filter(models.WeddingGuest.wedding_id == plan.id).all()
    vendors = db.query(models.WeddingVendor).filter(models.WeddingVendor.wedding_id == plan.id).all()
    budget = db.query(models.WeddingBudget).filter(models.WeddingBudget.wedding_id == plan.id).all()

    # Calculate stats
    completed_tasks = len([t for t in tasks if t.status == "completed"])
    total_tasks = len(tasks)
    progress = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    
    rsvp_confirmed = len([g for g in guests if g.status == "confirmed"])
    total_spent = sum([b.spent_amount for b in budget])

    stats = {
        "days_remaining": 42, # Mocked for now, can calculate from plan.wedding_date
        "tasks_completed": f"{int(progress)}%",
        "guest_count": str(len(guests)),
        "budget_spent": f"₹{total_spent / 100000:.1f}L",
        "rsvp_confirmed": rsvp_confirmed
    }

    return {
        "plan": plan,
        "stats": stats,
        "tasks": tasks,
        "guests": guests,
        "vendors": vendors,
        "budget": budget
    }

@router.get("/tasks", response_model=List[schemas.WeddingTask])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.WeddingTask).all()

@router.get("/guests", response_model=List[schemas.WeddingGuest])
def get_guests(db: Session = Depends(get_db)):
    return db.query(models.WeddingGuest).all()

@router.get("/vendors", response_model=List[schemas.WeddingVendor])
def get_vendors(db: Session = Depends(get_db)):
    return db.query(models.WeddingVendor).all()

@router.get("/budget", response_model=List[schemas.WeddingBudget])
def get_budget(db: Session = Depends(get_db)):
    return db.query(models.WeddingBudget).all()
