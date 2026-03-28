from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import os
import shutil
import uuid
from pathlib import Path

from core import database, models, auth

router = APIRouter()

# Directory for wardrobe uploads
UPLOAD_DIR = Path("static/uploads/wardrobe")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.get("/suggest", summary="Get 7-day outfit suggestion")
def suggest_outfits(
    gender: str,
    age_group: str,
    style: str,
    db: Session = Depends(database.get_db)
):
    """
    Returns 7 random clothing items based on gender, age, and style.
    """
    query = db.query(models.ClothingPiece).filter(
        models.ClothingPiece.gender == gender,
        models.ClothingPiece.age_group == age_group,
        models.ClothingPiece.style == style
    )
    
    # Get 7 random items
    items = query.order_by(func.random()).limit(7).all()
    
    if not items:
        # Fallback: maybe just filter by gender and age if specific style is missing enough items
        items = db.query(models.ClothingPiece).filter(
            models.ClothingPiece.gender == gender,
            models.ClothingPiece.age_group == age_group
        ).order_by(func.random()).limit(7).all()
        
    return {
        "status": "success",
        "items": [
            {
                "id": item.id,
                "name": item.name,
                "image_url": item.image_url,
                "gender": item.gender,
                "age_group": item.age_group,
                "style": item.style
            } for item in items
        ]
    }

@router.get("/items", summary="List all wardrobe items")
def list_items(
    gender: Optional[str] = None,
    age_group: Optional[str] = None,
    style: Optional[str] = None,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    query = db.query(models.ClothingPiece)
    if gender:
        query = query.filter(models.ClothingPiece.gender == gender)
    if age_group:
        query = query.filter(models.ClothingPiece.age_group == age_group)
    if style:
        query = query.filter(models.ClothingPiece.style == style)
        
    items = query.order_by(models.ClothingPiece.created_at.desc()).all()
    return items

@router.post("/items", summary="Add new wardrobe item")
async def add_item(
    name: str = Form(...),
    gender: str = Form(...),
    age_group: str = Form(...),
    style: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Save image
    file_extension = Path(image.filename).suffix
    file_name = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / file_name
    
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    image_url = f"/images/uploads/wardrobe/{file_name}"
    
    new_item = models.ClothingPiece(
        name=name,
        gender=gender,
        age_group=age_group,
        style=style,
        image_url=image_url
    )
    
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    
    return {"status": "success", "item": new_item}

@router.delete("/items/{item_id}", summary="Delete wardrobe item")
def delete_item(
    item_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    item = db.query(models.ClothingPiece).filter(models.ClothingPiece.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Optional: Delete file from disk
    # (Leaving it for now to avoid accidental data loss issues)
    
    db.delete(item)
    db.commit()
    return {"status": "success", "message": "Item deleted"}
