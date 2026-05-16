from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from core import auth
from repositories.cms_ssot import get_global_settings, update_global_settings

router = APIRouter()

@router.get("/")
def get_config(key: str, db: Session = Depends(get_db)):
    settings = get_global_settings(db)
    
    # Map legacy keys to new SSOT structure for frontend compatibility
    if key == "social_links":
        return settings.get("social", {
            "instagram": "#", "facebook": "#", "github": "#", 
            "linkedin": "#", "x": "#", "threads": "#", 
            "behance": "#", "youtube": "#"
        })
    
    return settings.get(key, {})

@router.post("/")
def update_config(key: str, data: dict, db: Session = Depends(get_db), current_user = Depends(auth.require_permission("settings", "write"))):
    # Convert legacy key update to SSOT update
    update_payload = {}
    if key == "social_links":
        update_payload["social"] = data
    else:
        update_payload[key] = data
        
    update_global_settings(db, update_payload)
    return {"status": "success", "message": f"Settings for '{key}' updated"}
