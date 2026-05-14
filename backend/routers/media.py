from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session
from typing import Dict, Any, List, Optional
from core import database, models, auth
import os
import shutil
import uuid
from pathlib import Path

router = APIRouter()
UPLOAD_DIR = Path("static/uploads")

@router.get("/", summary="List All Media Files")
def list_media(folder_id: Optional[int] = None, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    query = db.query(models.Media)
    if folder_id is not None:
        query = query.filter(models.Media.folder_id == folder_id)
    return query.order_by(models.Media.uploaded_at.desc()).all()

@router.post("/upload", summary="Upload Media File")
async def upload_media(
    file: UploadFile = File(...),
    folder_id: Optional[int] = Form(None),
    alt_text: Optional[str] = Form(None),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(auth.require_admin),
):
    try:
        UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server configuration error: {e}")

    ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = UPLOAD_DIR / unique_filename

    # In a real app we'd read chunks to calculate size, or use os.path.getsize
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        size_bytes = os.path.getsize(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {e}")

    relative_url = f"/images/uploads/{unique_filename}"

    new_media = models.Media(
        file_url=relative_url, 
        file_name=file.filename,
        mime_type=file.content_type,
        size_bytes=size_bytes,
        alt_text=alt_text,
        folder_id=folder_id
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    
    return new_media

@router.delete("/{media_id}", summary="Delete Media File")
def delete_media(media_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    media = db.query(models.Media).filter(models.Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
        
    # Attempt to delete file from disk
    try:
        file_path = UPLOAD_DIR / media.file_url.split("/")[-1]
        if file_path.exists():
            file_path.unlink()
    except Exception as e:
        print(f"Failed to delete file from disk: {e}")
        
    db.delete(media)
    db.commit()
    return {"status": "success"}

@router.get("/folders", summary="List Media Folders")
def list_folders(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    return db.query(models.MediaFolder).all()

@router.post("/folders", summary="Create Media Folder")
def create_folder(name: str, parent_id: Optional[int] = None, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.require_admin)):
    folder = models.MediaFolder(name=name, parent_id=parent_id)
    db.add(folder)
    db.commit()
    db.refresh(folder)
    return folder
