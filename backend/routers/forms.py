from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, List
from core import database, models, auth
import json
from datetime import datetime

router = APIRouter()

@router.get("/", summary="List All Forms")
def list_forms(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    return db.query(models.Form).all()

@router.post("/", summary="Create Form")
def create_form(form_data: Dict[str, Any], db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_permission("forms", "write"))):
    new_form = models.Form(
        name=form_data.get("name"),
        slug=form_data.get("slug"),
        is_active=form_data.get("is_active", True),
        config_json=json.dumps(form_data.get("config", {})),
        created_by_id=current_user.id
    )
    db.add(new_form)
    db.flush()
    
    fields = form_data.get("fields", [])
    for idx, field in enumerate(fields):
        db_field = models.FormField(
            form_id=new_form.id,
            label=field.get("label"),
            type=field.get("type", "text"),
            required=field.get("required", False),
            order=idx,
            options_json=json.dumps(field.get("options", []))
        )
        db.add(db_field)
        
    db.commit()
    db.refresh(new_form)
    return {"status": "success", "id": new_form.id}

@router.get("/{slug}", summary="Get Form Config (Public)")
def get_form(slug: str, db: Session = Depends(database.get_db)):
    form = db.query(models.Form).filter(models.Form.slug == slug).first()
    if not form or not form.is_active:
        raise HTTPException(status_code=404, detail="Form not found")
        
    return {
        "id": form.id,
        "name": form.name,
        "slug": form.slug,
        "fields": [
            {
                "id": f.id,
                "label": f.label,
                "type": f.type,
                "required": f.required,
                "options": json.loads(f.options_json)
            }
            for f in form.fields
        ]
    }

@router.post("/{slug}/submit", summary="Submit Form (Public)")
def submit_form(slug: str, payload: Dict[str, Any], db: Session = Depends(database.get_db)):
    form = db.query(models.Form).filter(models.Form.slug == slug).first()
    if not form or not form.is_active:
        raise HTTPException(status_code=404, detail="Form not found")
        
    submission = models.FormSubmission(
        form_id=form.id,
        payload_json=json.dumps(payload),
        created_at=datetime.utcnow()
    )
    db.add(submission)
    db.commit()
    return {"status": "success", "message": "Form submitted successfully"}

@router.get("/{slug}/submissions", summary="List Form Submissions")
def list_submissions(slug: str, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_permission("forms", "read"))):
    form = db.query(models.Form).filter(models.Form.slug == slug).first()
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
        
    return [
        {
            "id": s.id,
            "created_at": s.created_at,
            "payload": json.loads(s.payload_json)
        }
        for s in form.submissions
    ]
