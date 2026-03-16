from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from core import database, models

router = APIRouter()

class ConsultationRequest(BaseModel):
    start_date: str
    style_preference: str  # Formal, Casual, Traditional, Fusion

class OutfitDay(BaseModel):
    day: int
    date: str
    phase: str
    title: str
    description: str
    image: str

class ConsultationResponse(BaseModel):
    status: str
    plan: List[OutfitDay]

@router.post("/generate")
async def generate_consultation(request: ConsultationRequest, db: Session = Depends(database.get_db)):
    try:
        start_date = datetime.strptime(request.start_date, "%Y-%m-%d")
        style = request.style_preference
        
        # Load from database instead of JSON
        content_record = db.query(models.CMSContent).filter(models.CMSContent.section == "consultation").first()
        if not content_record:
             raise HTTPException(status_code=500, detail="Consultation templates not found in database. Please run seed script.")
             
        outfit_templates = content_record.content
        
        if style not in outfit_templates:
            raise HTTPException(status_code=400, detail="Invalid style preference")
            
        templates = outfit_templates[style]
        plan = []
        
        for i in range(7):
            current_date = start_date + timedelta(days=i)
            day_num = i + 1
            
            # Logic allocation:
            # Day 1-2: Foundation
            # Day 3: Comfort
            # Day 4-5: Statement
            # Day 6-7: Relaxation
            
            if day_num <= 2:
                phase = "Foundation"
                template = templates["Foundation"][day_num - 1]
            elif day_num == 3:
                phase = "Mid-week Comfort"
                template = templates["Comfort"][0]
            elif day_num <= 5:
                phase = "Statement"
                template = templates["Statement"][day_num - 4]
            else:
                phase = "Relaxation"
                template = templates["Relaxation"][day_num - 6]
                
            plan.append(OutfitDay(
                day=day_num,
                date=current_date.strftime("%Y-%m-%d"),
                phase=phase,
                title=template["title"],
                description=template["description"],
                image=template["image"]
            ))
            
        return ConsultationResponse(status="success", plan=plan)
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
