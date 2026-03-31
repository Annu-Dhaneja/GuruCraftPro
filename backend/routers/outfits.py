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
    7 random suggestions with smart fallback:
    1. Exact (Age Group + Gender + Style)
    2. Same Gender + Style (Ignore Age)
    3. Same Style Only
    """
    target_age_group = age_group
    if age is not None:
        target_age_group = map_age_group(age)
    
    # Tier 1: Exact matches
    results = db.query(ClothingPiece).filter(
        ClothingPiece.age_group == target_age_group,
        ClothingPiece.gender == gender,
        ClothingPiece.style == style
    ).all()

    # Tier 2: Same Gender + Style
    if len(results) < 7:
        tier2 = db.query(ClothingPiece).filter(
            ClothingPiece.gender == gender,
            ClothingPiece.style == style,
            ~ClothingPiece.id.in_([r.id for r in results])
        ).all()
        results.extend(tier2)

    # Tier 3: Same Style Only
    if len(results) < 7:
        tier3 = db.query(ClothingPiece).filter(
            ClothingPiece.style == style,
            ~ClothingPiece.id.in_([r.id for r in results])
        ).all()
        results.extend(tier3)

    import random
    random.shuffle(results)
    
    # Final slice and return with day labeling
    final_outfits = results[:7]
    
    # If still < 7, duplicate from final_outfits to reach 7
    if len(final_outfits) > 0 and len(final_outfits) < 7:
        while len(final_outfits) < 7:
            final_outfits.append(random.choice(final_outfits))
    
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
        } for i, o in enumerate(final_outfits)
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
