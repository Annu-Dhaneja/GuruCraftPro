from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from core.database import get_db
from core import models, auth
from schemas import wedding as schemas
from repositories.cms_ssot import get_ssot_page_content

router = APIRouter()

# ── PUBLIC ENDPOINTS (No auth required) ─────────────────────────────────

@router.get("/showcase")
def get_wedding_showcase(db: Session = Depends(get_db)):
    """Public endpoint: Returns wedding service showcase data. Fetches from CMS if available."""
    # Try to get from dynamic CMS first
    cms_data = get_ssot_page_content(db, "wedding-showcase")
    
    if cms_data and cms_data.get("components"):
        # Flatten components for the frontend (SSOT pattern)
        flattened = {}
        for comp in cms_data["components"]:
            name = comp.get("name")
            if name:
                flattened[name] = comp.get("props", {})
        return flattened

    # Default Fallback (Dynamic if not seeded yet)
    return {
        "hero": {
            "badge": "Luxury Wedding Planning",
            "title": "Your Dream Wedding, Perfected",
            "subtitle": "From intimate ceremonies to grand celebrations — we craft unforgettable experiences with precision, elegance, and soul.",
            "stats": [
                {"label": "Weddings Planned", "value": "500+"},
                {"label": "Happy Couples", "value": "500+"},
                {"label": "Cities Served", "value": "50+"},
                {"label": "Years Experience", "value": "12+"},
            ]
        },
        "packages": [
            {
                "id": 1,
                "name": "Intimate Elegance",
                "description": "Perfect for small, intimate ceremonies with up to 100 guests. Includes venue styling, floral arrangements, and day-of coordination.",
                "price": "₹3,00,000",
                "features": ["Venue Styling", "Floral Design", "Day-of Coordination", "Vendor Sourcing", "Timeline Planning"],
                "icon": "heart",
                "popular": False,
            },
            {
                "id": 2,
                "name": "Royal Celebration",
                "description": "Our signature package for grand celebrations. Full-service planning with premium vendors, luxury decor, and multi-day event coordination.",
                "price": "₹12,00,000",
                "features": ["Full Event Design", "Premium Vendors", "Multi-Day Coordination", "Luxury Decor", "Guest Management", "Entertainment", "Photography & Film"],
                "icon": "crown",
                "popular": True,
            },
            {
                "id": 3,
                "name": "Destination Dream",
                "description": "Complete destination wedding planning — from venue scouting across India's finest palaces to travel logistics for all guests.",
                "price": "₹25,00,000",
                "features": ["Destination Scouting", "Travel & Logistics", "Palace/Resort Booking", "Complete Styling", "VIP Guest Experience", "Wellness & Spa", "Custom Invitations"],
                "icon": "plane",
                "popular": False,
            },
        ],
        "services": [
            {"name": "Mehndi Ceremony", "description": "Intricate henna art sessions with live music and traditional decor.", "icon": "palette"},
            {"name": "Sangeet Night", "description": "Choreographed performances, DJ/live band, and stunning stage design.", "icon": "music"},
            {"name": "Wedding Ceremony", "description": "Sacred rituals with breathtaking mandap design and floral arrangements.", "icon": "heart"},
            {"name": "Reception", "description": "Grand reception with gourmet catering, entertainment, and luxury decor.", "icon": "sparkles"},
            {"name": "Photography & Film", "description": "Cinematic coverage capturing every precious moment of your celebration.", "icon": "camera"},
            {"name": "Guest Management", "description": "Complete RSVP tracking, accommodation booking, and hospitality coordination.", "icon": "users"},
        ],
        "testimonials": [
            {
                "name": "Priya & Arjun",
                "location": "Udaipur",
                "quote": "They turned our palace wedding into a fairy tale. Every detail was absolutely perfect — from the flowers to the fireworks.",
                "rating": 5,
            },
            {
                "name": "Sneha & Rahul",
                "location": "Jaipur",
                "quote": "The team managed 500+ guests flawlessly. Our families still talk about how seamless everything was.",
                "rating": 5,
            },
            {
                "name": "Meera & Vikram",
                "location": "Goa",
                "quote": "Our beach wedding was beyond anything we imagined. The sunset ceremony setup brought tears to everyone's eyes.",
                "rating": 5,
            },
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
            "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
            "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
            "https://images.unsplash.com/photo-1549416878-b9ca95e9561e?w=800",
        ],
    }


# ── AUTHENTICATED USER ENDPOINTS ────────────────────────────────────────

@router.get("/dashboard", response_model=schemas.WeddingDashboardData)
def get_wedding_dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    # Scope wedding plan to the logged-in user
    plan = db.query(models.WeddingPlan).filter(
        models.WeddingPlan.user_id == current_user.id
    ).first()
    if not plan:
        # Create a default plan for this user
        from datetime import datetime, timedelta
        future_date = (datetime.now() + timedelta(days=120)).strftime("%Y-%m-%d")
        plan = models.WeddingPlan(
            partner_names="Your Names Here",
            location="Dream Venue",
            wedding_date=future_date,
            total_budget=5000000,
            guest_count=0,
            user_id=current_user.id,
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

    # Calculate real days remaining
    days_rem = 0
    if plan.wedding_date:
        from datetime import datetime
        try:
            target = datetime.strptime(plan.wedding_date, "%Y-%m-%d")
            days_rem = (target - datetime.now()).days
        except:
            days_rem = 0

    stats = {
        "days_remaining": max(0, days_rem),
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

# ── Plan Update ─────────────────────────────────────────────────────────

@router.put("/plan")
def update_wedding_plan(
    plan_data: schemas.WeddingPlanUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    for key, val in plan_data.model_dump(exclude_unset=True).items():
        setattr(plan, key, val)
    
    db.commit()
    db.refresh(plan)
    return {"status": "ok", "plan": plan_data}

# ── Tasks CRUD ──────────────────────────────────────────────────────────

@router.get("/tasks", response_model=List[schemas.WeddingTask])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        return []
    return db.query(models.WeddingTask).filter(models.WeddingTask.wedding_id == plan.id).all()

@router.post("/tasks", response_model=schemas.WeddingTask)
def create_task(
    task: schemas.WeddingTaskCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Create a wedding plan first")
    
    db_task = models.WeddingTask(**task.model_dump(), wedding_id=plan.id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    task_data: schemas.WeddingTaskCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_task = db.query(models.WeddingTask).filter(
        models.WeddingTask.id == task_id,
        models.WeddingTask.wedding_id == plan.id
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, val in task_data.model_dump(exclude_unset=True).items():
        setattr(db_task, key, val)
    
    db.commit()
    return {"status": "ok"}

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_task = db.query(models.WeddingTask).filter(
        models.WeddingTask.id == task_id,
        models.WeddingTask.wedding_id == plan.id
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(db_task)
    db.commit()
    return {"status": "ok"}

# ── Guests CRUD ─────────────────────────────────────────────────────────

@router.get("/guests", response_model=List[schemas.WeddingGuest])
def get_guests(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        return []
    return db.query(models.WeddingGuest).filter(models.WeddingGuest.wedding_id == plan.id).all()

@router.post("/guests", response_model=schemas.WeddingGuest)
def create_guest(
    guest: schemas.WeddingGuestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Create a wedding plan first")
    
    db_guest = models.WeddingGuest(**guest.model_dump(), wedding_id=plan.id)
    db.add(db_guest)
    db.commit()
    db.refresh(db_guest)
    return db_guest

@router.put("/guests/{guest_id}")
def update_guest(
    guest_id: int,
    guest_data: schemas.WeddingGuestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_guest = db.query(models.WeddingGuest).filter(
        models.WeddingGuest.id == guest_id,
        models.WeddingGuest.wedding_id == plan.id
    ).first()
    if not db_guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    
    for key, val in guest_data.model_dump(exclude_unset=True).items():
        setattr(db_guest, key, val)
    
    db.commit()
    return {"status": "ok"}

@router.delete("/guests/{guest_id}")
def delete_guest(
    guest_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_guest = db.query(models.WeddingGuest).filter(
        models.WeddingGuest.id == guest_id,
        models.WeddingGuest.wedding_id == plan.id
    ).first()
    if not db_guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    
    db.delete(db_guest)
    db.commit()
    return {"status": "ok"}

# ── Vendors CRUD ────────────────────────────────────────────────────────

@router.get("/vendors", response_model=List[schemas.WeddingVendor])
def get_vendors(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        return []
    return db.query(models.WeddingVendor).filter(models.WeddingVendor.wedding_id == plan.id).all()

@router.post("/vendors", response_model=schemas.WeddingVendor)
def create_vendor(
    vendor: schemas.WeddingVendorCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Create a wedding plan first")
    
    db_vendor = models.WeddingVendor(**vendor.model_dump(), wedding_id=plan.id)
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

@router.put("/vendors/{vendor_id}")
def update_vendor(
    vendor_id: int,
    vendor_data: schemas.WeddingVendorCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_vendor = db.query(models.WeddingVendor).filter(
        models.WeddingVendor.id == vendor_id,
        models.WeddingVendor.wedding_id == plan.id
    ).first()
    if not db_vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    for key, val in vendor_data.model_dump(exclude_unset=True).items():
        setattr(db_vendor, key, val)
    
    db.commit()
    return {"status": "ok"}

@router.delete("/vendors/{vendor_id}")
def delete_vendor(
    vendor_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_vendor = db.query(models.WeddingVendor).filter(
        models.WeddingVendor.id == vendor_id,
        models.WeddingVendor.wedding_id == plan.id
    ).first()
    if not db_vendor:
        raise HTTPException(status_code=404, detail="Vendor not found")
    
    db.delete(db_vendor)
    db.commit()
    return {"status": "ok"}

# ── Budget CRUD ─────────────────────────────────────────────────────────

@router.get("/budget", response_model=List[schemas.WeddingBudget])
def get_budget(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        return []
    return db.query(models.WeddingBudget).filter(models.WeddingBudget.wedding_id == plan.id).all()

@router.post("/budget", response_model=schemas.WeddingBudget)
def create_budget(
    budget_item: schemas.WeddingBudgetCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Create a wedding plan first")
    
    db_budget = models.WeddingBudget(**budget_item.model_dump(), wedding_id=plan.id)
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget

@router.delete("/budget/{budget_id}")
def delete_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.user_id == current_user.id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="No wedding plan found")
    
    db_budget = db.query(models.WeddingBudget).filter(
        models.WeddingBudget.id == budget_id,
        models.WeddingBudget.wedding_id == plan.id
    ).first()
    if not db_budget:
        raise HTTPException(status_code=404, detail="Budget item not found")
    
    db.delete(db_budget)
    db.commit()
    return {"status": "ok"}


# ── ADMIN ENDPOINTS (require_admin) ─────────────────────────────────────

@router.get("/admin/all-plans")
def admin_get_all_plans(
    db: Session = Depends(get_db),
    admin: models.User = Depends(auth.require_admin),
):
    """Admin: Get all wedding plans across all users."""
    plans = db.query(models.WeddingPlan).all()
    results = []
    for plan in plans:
        user = db.query(models.User).filter(models.User.id == plan.user_id).first()
        tasks = db.query(models.WeddingTask).filter(models.WeddingTask.wedding_id == plan.id).all()
        guests = db.query(models.WeddingGuest).filter(models.WeddingGuest.wedding_id == plan.id).all()
        vendors = db.query(models.WeddingVendor).filter(models.WeddingVendor.wedding_id == plan.id).all()
        budgets = db.query(models.WeddingBudget).filter(models.WeddingBudget.wedding_id == plan.id).all()
        
        completed_tasks = len([t for t in tasks if t.status == "completed"])
        total_tasks = len(tasks)
        progress = int((completed_tasks / total_tasks * 100)) if total_tasks > 0 else 0
        total_spent = sum([b.spent_amount for b in budgets])
        
        results.append({
            "id": plan.id,
            "user_id": plan.user_id,
            "user_name": user.name or user.username if user else "Unknown",
            "user_email": user.email if user else None,
            "partner_names": plan.partner_names,
            "wedding_date": str(plan.wedding_date) if plan.wedding_date else None,
            "location": plan.location,
            "total_budget": plan.total_budget,
            "guest_count": len(guests),
            "task_count": total_tasks,
            "task_progress": f"{progress}%",
            "vendor_count": len(vendors),
            "total_spent": total_spent,
            "created_at": str(plan.created_at) if plan.created_at else None,
        })
    
    return {
        "total_plans": len(results),
        "plans": results,
    }

@router.get("/admin/plan/{plan_id}")
def admin_get_plan_detail(
    plan_id: int,
    db: Session = Depends(get_db),
    admin: models.User = Depends(auth.require_admin),
):
    """Admin: Get full detail of a specific wedding plan."""
    plan = db.query(models.WeddingPlan).filter(models.WeddingPlan.id == plan_id).first()
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    user = db.query(models.User).filter(models.User.id == plan.user_id).first()
    tasks = db.query(models.WeddingTask).filter(models.WeddingTask.wedding_id == plan.id).all()
    guests = db.query(models.WeddingGuest).filter(models.WeddingGuest.wedding_id == plan.id).all()
    vendors = db.query(models.WeddingVendor).filter(models.WeddingVendor.wedding_id == plan.id).all()
    budgets = db.query(models.WeddingBudget).filter(models.WeddingBudget.wedding_id == plan.id).all()
    
    completed_tasks = len([t for t in tasks if t.status == "completed"])
    total_tasks = len(tasks)
    progress = int((completed_tasks / total_tasks * 100)) if total_tasks > 0 else 0
    total_spent = sum([b.spent_amount for b in budgets])
    rsvp_confirmed = len([g for g in guests if g.status == "confirmed"])
    
    return {
        "plan": {
            "id": plan.id,
            "partner_names": plan.partner_names,
            "wedding_date": str(plan.wedding_date) if plan.wedding_date else None,
            "location": plan.location,
            "total_budget": plan.total_budget,
            "priority": plan.priority,
        },
        "user": {
            "id": user.id if user else None,
            "name": user.name if user else "Unknown",
            "email": user.email if user else None,
            "username": user.username if user else None,
        },
        "stats": {
            "guest_count": len(guests),
            "rsvp_confirmed": rsvp_confirmed,
            "task_progress": f"{progress}%",
            "total_spent": f"₹{total_spent / 100000:.1f}L",
            "vendor_count": len(vendors),
        },
        "tasks": [{"id": t.id, "title": t.title, "status": t.status, "category": t.category, "priority": t.priority} for t in tasks],
        "guests": [{"id": g.id, "name": g.name, "category": g.category, "status": g.status, "plus_one": g.plus_one} for g in guests],
        "vendors": [{"id": v.id, "name": v.name, "category": v.category, "total_quote": v.total_quote, "paid_amount": v.paid_amount, "status": v.status} for v in vendors],
        "budget": [{"id": b.id, "category": b.category, "allocated_amount": b.allocated_amount, "spent_amount": b.spent_amount} for b in budgets],
    }
