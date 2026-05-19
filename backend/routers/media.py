from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session
from typing import Dict, Any, List, Optional
from core import database, models, auth
import os
import shutil
import uuid
from pathlib import Path
from datetime import datetime

router = APIRouter()
UPLOAD_DIR = Path("static/uploads")

@router.get("/", summary="List All Media Files")
def list_media(folder_id: Optional[int] = None, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    query = db.query(models.Media)
    if folder_id is not None:
        query = query.filter(models.Media.folder_id == folder_id)
    return query.order_by(models.Media.created_at.desc()).all()

@router.post("/upload", summary="Upload Media File")
async def upload_media(
    file: UploadFile = File(...),
    folder_id: Optional[int] = Form(None),
    alt_text: Optional[str] = Form(None),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_permission("media", "write")),
):
    import base64
    file_content = await file.read()
    file_base64 = base64.b64encode(file_content).decode("utf-8")

    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    relative_url = f"/images/uploads/{unique_filename}"

    # Safe local write for development
    try:
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        file_path = UPLOAD_DIR / unique_filename
        with open(file_path, "wb") as buffer:
            buffer.write(file_content)
    except Exception as e:
        print(f"Skipped local filesystem save (expected on serverless): {e}")

    new_media = models.Media(
        file_url=relative_url, 
        file_name=file.filename,
        mime_type=file.content_type,
        size_bytes=len(file_content),
        alt_text=alt_text,
        folder_id=folder_id,
        file_data_base64=file_base64,
        created_by_id=current_user.id
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    
    return new_media

@router.delete("/{media_id}", summary="Delete Media File")
def delete_media(media_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_permission("media", "delete"))):
    media = db.query(models.Media).filter(models.Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
        
    # Soft delete: update deleted_at
    media.deleted_at = datetime.utcnow()
    media.updated_by_id = current_user.id
    db.commit()
    return {"status": "success", "message": "Media archived"}

@router.get("/folders", summary="List Media Folders")
def list_folders(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    return db.query(models.MediaFolder).all()

@router.post("/folders", summary="Create Media Folder")
def create_folder(name: str, parent_id: Optional[int] = None, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_permission("media", "write"))):
    folder = models.MediaFolder(name=name, parent_id=parent_id, created_by_id=current_user.id)
    db.add(folder)
    db.commit()
    db.refresh(folder)
    return folder
