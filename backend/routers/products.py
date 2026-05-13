from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from core.database import get_db
from core.models import Product
from core.auth import require_admin
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()


# ── Schemas ──────────────────────────────────────────────────────────

class ProductOut(BaseModel):
    id: int
    name: str
    slug: str
    description: str
    price: int
    category: str
    image_url: str
    inventory_count: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ProductCreate(BaseModel):
    name: str
    slug: str
    description: str = ""
    price: int
    category: str
    image_url: str
    inventory_count: int = 100
    is_active: bool = True


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    inventory_count: Optional[int] = None
    is_active: Optional[bool] = None


# ── Public Routes ────────────────────────────────────────────────────

@router.get("/", response_model=List[ProductOut])
def list_products(
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List all active products. Optionally filter by category."""
    query = db.query(Product).filter(Product.is_active == True)
    if category and category != "All Creations":
        query = query.filter(Product.category == category)
    return query.order_by(Product.created_at.desc()).all()


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a single product by ID."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# ── Admin Routes (CRUD) ─────────────────────────────────────────────

@router.post("/", response_model=ProductOut)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    """Create a new product (admin only)."""
    existing = db.query(Product).filter(Product.slug == product.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Product slug already exists")
    
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    updates: ProductUpdate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    """Update a product (admin only)."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    for key, value in updates.dict(exclude_unset=True).items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product


@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    """Delete a product (admin only)."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"message": f"Product '{db_product.name}' deleted"}
