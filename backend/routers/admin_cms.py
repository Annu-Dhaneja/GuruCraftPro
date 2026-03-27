from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from core import database, models, auth
import os
import shutil
import uuid
from pathlib import Path

from services.cms import cms_service

router = APIRouter()

# ── IMPORTANT: Fixed routes MUST come BEFORE the /{segment} catch-all ──


@router.get("/stats", summary="Get Admin Dashboard Stats")
def get_dashboard_stats(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    from core.models import ContactSubmission, Page

    total_submissions = db.query(ContactSubmission).count()
    recent_submissions = (
        db.query(ContactSubmission)
        .order_by(ContactSubmission.created_at.desc())
        .limit(5)
        .all()
    )
    cms_sections = db.query(Page).count()

    return {
        "total_submissions": total_submissions,
        "cms_sections_count": cms_sections,
        "recent_submissions": [
            {
                "id": s.id,
                "name": s.name,
                "email": s.email,
                "type": s.inquiry_type,
                "date": s.created_at,
            }
            for s in recent_submissions
        ],
    }


@router.get("/posts", summary="List All Blog Posts")
def list_posts(db: Session = Depends(database.get_db)):
    from core.models import Post
    return db.query(Post).order_by(Post.created_at.desc()).all()


@router.get("/media", summary="List All Uploaded Assets")
def list_media(db: Session = Depends(database.get_db)):
    from core.models import Media
    return db.query(Media).order_by(Media.uploaded_at.desc()).all()


UPLOAD_DIR = Path("../frontend/public/images/uploads")


@router.post("/upload-image", summary="Upload Image for CMS")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    try:
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    except Exception as e:
        print(f"Upload Error: Could not create directory {UPLOAD_DIR}: {e}")
        raise HTTPException(status_code=500, detail=f"Server configuration error: {e}")

    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = UPLOAD_DIR / unique_filename

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        print(f"Upload Error: Failed to write file {file_path}: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save image: {e}")

    relative_url = f"/images/uploads/{unique_filename}"

    try:
        from core.models import Media
        new_media = Media(file_url=relative_url, file_name=file.filename)
        db.add(new_media)
        db.commit()
        db.refresh(new_media)
        return {"url": relative_url, "id": new_media.id}
    except Exception as e:
        db.rollback()
        print(f"Upload Error: Database sync failed: {e}")
        raise HTTPException(status_code=500, detail=f"Media record creation failed: {e}")


# ── Dynamic catch-all MUST be LAST ──────────────────────────────────


@router.get("/{segment}", summary="Get CMS Content Segment")
def get_segment_content(
    segment: str,
    db: Session = Depends(database.get_db),
):
    return cms_service.get_content(db, segment)


@router.put("/{segment}", summary="Update CMS Content Segment")
def update_segment_content(
    segment: str,
    content: Dict[str, Any],
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    updated_content = cms_service.update_content(db, segment, content)
    return {
        "status": "success",
        "message": f"{segment.capitalize()} content updated successfully",
        "content": updated_content,
    }
