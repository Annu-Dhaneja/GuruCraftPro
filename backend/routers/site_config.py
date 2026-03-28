from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from core.models import SiteConfig
from routers.auth import get_current_user
import json

router = APIRouter()

@router.get("/")
def get_config(key: str, db: Session = Depends(get_db)):
    config = db.query(SiteConfig).filter(SiteConfig.key == key).first()
    if not config:
        # Return default empty values for known keys
        if key == "social_links":
            return {
                "instagram": "#", "facebook": "#", "github": "#", 
                "linkedin": "#", "x": "#", "threads": "#", 
                "behance": "#", "youtube": "#"
            }
        return {}
    return json.loads(config.value)

@router.post("/")
def update_config(key: str, data: dict, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    config = db.query(SiteConfig).filter(SiteConfig.key == key).first()
    if not config:
        config = SiteConfig(key=key, value=json.dumps(data))
        db.add(config)
    else:
        config.value = json.dumps(data)
    
    db.commit()
    return {"status": "success"}
