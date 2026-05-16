from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from core.database import get_db
from core import models, auth
from schemas import product as product_schemas
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[product_schemas.ProductRead])
def list_products(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Product).filter(models.Product.is_active == True)
    if category and category != "All Creations":
        query = query.filter(models.Product.category == category)
    return query.order_by(models.Product.created_at.desc()).all()

@router.get("/{product_id}", response_model=product_schemas.ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=product_schemas.ProductRead, status_code=status.HTTP_201_CREATED)
def create_product(
    product_data: product_schemas.ProductCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_permission("products", "write")),
):
    existing = db.query(models.Product).filter(models.Product.slug == product_data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product slug already exists")
    
    db_product = models.Product(
        **product_data.model_dump(),
        created_by_id=current_user.id,
        updated_by_id=current_user.id
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=product_schemas.ProductRead)
def update_product(
    product_id: int,
    updates: product_schemas.ProductUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_permission("products", "write")),
):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = updates.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db_product.updated_by_id = current_user.id
    db_product.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.require_permission("products", "delete")),
):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Soft delete or hard delete? User requested soft delete fields in AuditMixin
    # I'll use soft delete if deleted_at is set
    db_product.deleted_at = datetime.utcnow()
    db_product.is_active = False
    db.commit()
    return {"status": "success", "message": f"Product '{db_product.name}' archived"}
