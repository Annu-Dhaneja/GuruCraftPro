from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Dict, Any, List, Optional
from core import database, models, auth
from schemas import cms as cms_schemas
from schemas.base import ResponseBase
import os
import shutil
import uuid
import requests
from pathlib import Path
from datetime import datetime

from services.cms import cms_service
from repositories.cms_ssot import get_ssot_page_content, update_global_settings, get_global_settings, update_ssot_page_content

router = APIRouter()

class BulkImportRequest(BaseModel):
    urls: List[str]



# ── PAGE MANAGEMENT ──────────────────────────────────────────────────

@router.get("/pages", response_model=List[cms_schemas.CMSPageRead], summary="List All CMS Pages")
def list_pages(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_admin)
):
    return db.query(models.CMSPage).order_by(models.CMSPage.slug).all()

@router.get("/pages/{slug}", response_model=cms_schemas.CMSPageRead)
def get_page(
    slug: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_admin)
):
    page = db.query(models.CMSPage).filter(models.CMSPage.slug == slug).first()
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    return page

@router.post("/pages", response_model=cms_schemas.CMSPageRead, status_code=status.HTTP_201_CREATED)
def create_page(
    page_data: cms_schemas.CMSPageCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("cms", "write"))
):
    existing = db.query(models.CMSPage).filter(models.CMSPage.slug == page_data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    db_page = models.CMSPage(
        **page_data.model_dump(),
        created_by_id=current_user.id,
        updated_by_id=current_user.id
    )
    db.add(db_page)
    db.commit()
    db.refresh(db_page)
    return db_page

@router.put("/pages/{slug}", response_model=cms_schemas.CMSPageRead)
def update_page(
    slug: str,
    page_data: cms_schemas.CMSPageUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("cms", "write"))
):
    db_page = db.query(models.CMSPage).filter(models.CMSPage.slug == slug).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    update_data = page_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_page, key, value)
    
    db_page.updated_by_id = current_user.id
    db_page.updated_at = datetime.utcnow()
    
    if db_page.status == "published" and not db_page.published_at:
        db_page.published_at = datetime.utcnow()
        
    db.commit()
    db.refresh(db_page)
    return db_page

@router.delete("/pages/{slug}")
def delete_page(
    slug: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("cms", "delete"))
):
    db_page = db.query(models.CMSPage).filter(models.CMSPage.slug == slug).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    
    db.delete(db_page)
    db.commit()
    return {"status": "success", "message": "Page deleted successfully"}

# ── GLOBAL SETTINGS ──────────────────────────────────────────────────

@router.get("/settings", response_model=cms_schemas.GlobalSettingsRead)
def get_settings(db: Session = Depends(database.get_db)):
    settings = get_global_settings(db)
    if not settings:
        raise HTTPException(status_code=404, detail="Global settings not found")
    return settings

@router.get("/site_config")
def get_site_config(db: Session = Depends(database.get_db)):
    """Public endpoint for frontend SiteConfigProvider."""
    return get_global_settings(db)

@router.put("/site_config")
def update_site_config(
    content: Dict[str, Any],
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("cms", "write"))
):
    """Updates the global site settings (nav, footer, brand, etc.) from the CMS editor."""
    return update_global_settings(db, content)

@router.put("/settings", response_model=cms_schemas.GlobalSettingsRead)
def update_settings(
    settings_data: cms_schemas.GlobalSettingsBase,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("settings", "write"))
):
    updated = update_global_settings(db, settings_data.model_dump())
    # We should manually update audit fields on the model if update_global_settings doesn't
    existing = db.query(models.GlobalSettings).first()
    if existing:
        existing.updated_by_id = current_user.id
        db.commit()
        db.refresh(existing)
    return existing

# Catch-all dynamic pages moved to bottom to prevent routing conflicts


# ── MEDIA MANAGEMENT ─────────────────────────────────────────────────

@router.get("/media", summary="List All Uploaded Assets")
def list_media(
    db: Session = Depends(database.get_db),
    admin: models.User = Depends(auth.require_admin)
):
    return db.query(models.Media).order_by(models.Media.uploaded_at.desc()).all()

UPLOAD_DIR = Path("static/uploads")

@router.post("/upload-image", summary="Upload Image for CMS")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("media", "write")),
):
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = UPLOAD_DIR / unique_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    relative_url = f"/images/uploads/{unique_filename}"
    new_media = models.Media(
        file_url=relative_url, 
        file_name=file.filename,
        created_by_id=current_user.id
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    return {"url": relative_url, "id": new_media.id}

@router.post("/media/bulk-url-import", summary="Bulk Ingest Images from URLs")
async def bulk_url_import(
    request: BulkImportRequest,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("media", "write")),
):
    results = []
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    for url in request.urls:
        try:
            # Basic validation
            if not url.startswith("http"):
                results.append({"url": url, "status": "failed", "error": "Invalid URL protocol"})
                continue

            response = requests.get(url, stream=True, timeout=10)
            if response.status_code != 200:
                results.append({"url": url, "status": "failed", "error": f"HTTP {response.status_code}"})
                continue

            # Detect extension or default to jpg
            content_type = response.headers.get("content-type", "")
            ext = ".jpg"
            if "image/png" in content_type: ext = ".png"
            elif "image/webp" in content_type: ext = ".webp"
            elif "image/gif" in content_type: ext = ".gif"
            
            filename = url.split("/")[-1].split("?")[0] or "imported_asset"
            if not any(filename.endswith(e) for e in [".jpg", ".jpeg", ".png", ".webp", ".gif"]):
                filename += ext
            
            unique_filename = f"{uuid.uuid4()}_{filename}"
            file_path = UPLOAD_DIR / unique_filename

            with open(file_path, "wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)

            relative_url = f"/images/uploads/{unique_filename}"
            new_media = models.Media(
                file_url=relative_url,
                file_name=filename,
                mime_type=content_type,
                size_bytes=os.path.getsize(file_path),
                created_by_id=current_user.id
            )
            db.add(new_media)
            results.append({"url": url, "status": "success", "file_url": relative_url})
            
        except Exception as e:
            results.append({"url": url, "status": "failed", "error": str(e)})

    db.commit()
    return {"results": results}

# ── STATS & DASHBOARD ────────────────────────────────────────────────

@router.get("/stats", summary="Get Admin Dashboard Stats")
def get_dashboard_stats(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_admin),
):
    from core.models import ContactSubmission, CMSPage, User, Order

    total_submissions = db.query(ContactSubmission).count()
    total_users = db.query(User).count()
    total_orders = db.query(Order).count()
    cms_pages = db.query(CMSPage).count()

    return {
        "total_submissions": total_submissions,
        "total_users": total_users,
        "total_orders": total_orders,
        "cms_pages_count": cms_pages,
        "recent_submissions": db.query(ContactSubmission).order_by(models.ContactSubmission.created_at.desc()).limit(5).all()
    }

@router.post("/reset-cache", summary="Clear System Throttling Cache")
def reset_system_cache(
    admin: models.User = Depends(auth.require_super_admin)
):
    """Super-Admin only: Clears all login failure throttling."""
    auth.reset_all_throttling()
    return {"message": "System throttling cache cleared successfully."}


# ── CATCH-ALL DYNAMIC PAGE ROUTER ─────────────────────────────────────

@router.get("/{slug:path}", summary="Get Public CMS Page Content")
def get_public_page_content(
    slug: str, 
    preview: bool = False,
    db: Session = Depends(database.get_db),
    current_user: Optional[models.User] = Depends(auth.get_optional_user)
):
    """Public endpoint for fetching assembled page content (SSOT)."""
    # Only allow preview if user is admin
    should_preview = preview and current_user and current_user.role in ["admin", "super-admin", "editor"]
    
    content = get_ssot_page_content(db, slug, published_only=not should_preview)
    if not content:
        raise HTTPException(status_code=404, detail="Page not found")
    return content

@router.put("/{slug:path}", summary="Update CMS Page Content (SSOT)")
def update_cms_page_content(
    slug: str,
    content: Dict[str, Any],
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("cms", "write"))
):
    """Updates the component blocks and settings of a page using the SSOT system."""
    success = update_ssot_page_content(db, slug, content)
    if not success:
        raise HTTPException(status_code=400, detail="Failed to update page content")
    return get_ssot_page_content(db, slug, published_only=False)
