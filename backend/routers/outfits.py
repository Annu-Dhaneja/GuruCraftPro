from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List, Optional
from core.database import get_db
from core.models import ClothingPiece
from schemas.outfits import ClothingPiece as ClothingPieceSchema, ClothingPieceCreate

router = APIRouter()

def map_age_group(age: int) -> str:
    if age <= 3: return "baby"
    if age <= 12: return "kids"
    if age <= 17: return "teen"
    if age <= 30: return "young_adult"
    if age <= 50: return "adult"
    return "senior"

@router.get("/suggest")
def suggest_outfits(
    gender: str = Query(...),
    age: Optional[int] = Query(None),
    age_group: Optional[str] = Query(None),
    style: str = Query(...),
    db: Session = Depends(get_db)
):
    """
    Generate a 7-day clothing plan with high-fidelity fallback logic.
    Tiers:
    1. Exact (Age Group + Gender + Style)
    2. Gender + Style (Ignore Age)
    3. Style Only (Broadest Match)
    """
    target_age_group = age_group
    if age is not None:
        target_age_group = map_age_group(age)
    
    # Track selected IDs to ensure no duplicates in the response
    selected_ids = []
    final_results = []

    def get_pool(filter_age=True, filter_gender=True):
        query = db.query(ClothingPiece).filter(ClothingPiece.style == style)
        if filter_age and target_age_group:
            query = query.filter(ClothingPiece.age_group == target_age_group)
        if filter_gender:
            query = query.filter(ClothingPiece.gender == gender)
        
        # Exclude already selected items
        if selected_ids:
            query = query.filter(~ClothingPiece.id.in_(selected_ids))
            
        return query.order_by(func.random()).all()

    # Tier 1: Exact Match
    tier1 = get_pool(filter_age=True, filter_gender=True)
    for item in tier1:
        if len(final_results) >= 7: break
        final_results.append(item)
        selected_ids.append(item.id)

    # Tier 2: Gender + Style (Ignore Age)
    if len(final_results) < 7:
        tier2 = get_pool(filter_age=False, filter_gender=True)
        for item in tier2:
            if len(final_results) >= 7: break
            final_results.append(item)
            selected_ids.append(item.id)

    # Tier 3: Style Only
    if len(final_results) < 7:
        tier3 = get_pool(filter_age=False, filter_gender=False)
        for item in tier3:
            if len(final_results) >= 7: break
            final_results.append(item)
            selected_ids.append(item.id)

    # If still under 7, we must duplicate some items (with unique day labels)
    import random
    if len(final_results) > 0 and len(final_results) < 7:
        source_pool = list(final_results)
        while len(final_results) < 7:
            final_results.append(random.choice(source_pool))

    # Guard: if database is totally empty for this style, return 404 or empty
    if not final_results:
        return []

    return [
        {
            "day_number": i + 1,
            "id": o.id,
            "image_url": o.image_url,
            "category": o.style,
            "age_group": o.age_group,
            "gender": o.gender,
            "tags": {
                "season": o.season,
                "occasion": o.occasion,
                "color": o.color
            }
        } for i, o in enumerate(final_results[:7])
    ]

@router.get("/", response_model=List[ClothingPieceSchema])
def list_outfits(db: Session = Depends(get_db)):
    """List all outfits for the admin panel."""
    return db.query(ClothingPiece).order_by(ClothingPiece.created_at.desc()).all()

@router.post("/", response_model=ClothingPieceSchema)
def create_outfit(outfit: ClothingPieceCreate, db: Session = Depends(get_db)):
    """Add a new outfit to the library."""
    db_outfit = ClothingPiece(**outfit.dict())
    db.add(db_outfit)
    db.commit()
    db.refresh(db_outfit)
    return db_outfit

@router.delete("/{outfit_id}")
def delete_outfit(outfit_id: int, db: Session = Depends(get_db)):
    """Remove an outfit from the library."""
    db_outfit = db.query(ClothingPiece).filter(ClothingPiece.id == outfit_id).first()
    if not db_outfit:
        raise HTTPException(status_code=404, detail="Outfit not found")
    db.delete(db_outfit)
    db.commit()
    return {"message": "Outfit deleted"}
