from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any, Optional
from core import database, models, auth
import os
import shutil
import uuid
from pathlib import Path

from services.cms import cms_service
from repositories.cms_ssot import get_ssot_page_content, update_global_settings, get_global_settings

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


@router.post("/posts", summary="Create New Blog Post")
def create_post(
    post: dict, # Using dict for flexibility or import schemas.blog.PostCreate
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    from core.models import Post
    db_post = Post(
        title=post.get("title"),
        slug=post.get("slug"),
        content=post.get("content"),
        status=post.get("status", "published"),
        author_id=current_user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.put("/posts/{post_id}", summary="Update Existing Blog Post")
def update_post(
    post_id: int,
    post: dict,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    from core.models import Post
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    for key, value in post.items():
        if hasattr(db_post, key):
            setattr(db_post, key, value)
            
    db.commit()
    db.refresh(db_post)
    return db_post


@router.delete("/posts/{post_id}", summary="Delete Blog Post")
def delete_post(
    post_id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    from core.models import Post
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted"}


@router.get("/posts/slug/{slug}", summary="Get Post by Slug")
def get_post_by_slug(slug: str, db: Session = Depends(database.get_db)):
    from core.models import Post
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.get("/media", summary="List All Uploaded Assets")
def list_media(db: Session = Depends(database.get_db)):
    from core.models import Media
    return db.query(Media).order_by(Media.uploaded_at.desc()).all()


# Use a local static folder in the backend for deployed environments
UPLOAD_DIR = Path("static/uploads")


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
    # Try SSOT First
    ssot_data = get_ssot_page_content(db, segment)
    if ssot_data and ssot_data.get("sections"):
        # Auto-flatten for the frontend if this is a known legacy-style page
        # The frontend components expect keys like 'hero', 'team' at the top level
        flattened = {}
        for section in ssot_data["sections"]:
            slug = section.get("slug")
            if slug:
                flattened[slug] = section.get("content", {})
        
        # Merge meta/title from SSOT page record
        flattened["_ssot_meta"] = ssot_data.get("meta", {})
        flattened["title"] = ssot_data.get("title")
        return flattened
        
    # Special case: global settings
    if segment == "site_config":
        return get_global_settings(db) or cms_service.get_content(db, segment)

    return cms_service.get_content(db, segment)


@router.put("/{segment}", summary="Update CMS Content Segment")
def update_segment_content(
    segment: str,
    content: Dict[str, Any],
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.get_current_user),
):
    try:
        from repositories.cms_ssot import get_ssot_page_content, update_ssot_page_content
        from core.models import CMSPage

        # Case 1: Handle SSOT-managed pages (The new priority system)
        is_ssot = db.query(CMSPage).filter(CMSPage.slug == segment).first() is not None
        
        # If it's a known service, it might be in SSOT even if not yet fully initialized
        known_service_pages = ["photo-editor", "wedding-plan", "guru-ji-art", "game-design", "vantage-ecom"]
        if is_ssot or segment in known_service_pages:
            print(f"CMS PUT: Updating SSOT segment '{segment}'")
            update_ssot_page_content(db, segment, content)
            return {
                "status": "success",
                "message": f"{segment.capitalize()} (SSOT) content updated successfully",
                "content": get_ssot_page_content(db, segment) # Re-fetch to return clean state
            }

        # Case 2: Handle Legacy pages (Fallback)
        print(f"CMS PUT: Updating Legacy segment '{segment}'")
        updated_content = cms_service.update_content(db, segment, content)
        return {
            "status": "success",
            "message": f"{segment.capitalize()} (Legacy) content updated successfully",
            "content": updated_content,
        }
    except Exception as exc:
        print(f"CMS PUT ERROR (segment '{segment}'): {str(exc)}")
        # Note: Global exception handler will also catch this, 
        # but re-raising helps maintain the stack trace for our handler
        raise HTTPException(status_code=500, detail=f"CMS Save Error for {segment}: {str(exc)}")
