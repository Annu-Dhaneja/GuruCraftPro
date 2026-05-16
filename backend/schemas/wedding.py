from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from .base import AuditBase

class WeddingTaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: str = "pending"
    category: str = "General"
    priority: str = "Medium"

class WeddingTaskCreate(WeddingTaskBase):
    pass

class WeddingTask(WeddingTaskBase, AuditBase):
    id: int
    wedding_id: int

class WeddingGuestBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    category: str = "Friend"
    status: str = "pending"
    plus_one: bool = False
    dietary_reqs: Optional[str] = None

class WeddingGuestCreate(WeddingGuestBase):
    pass

class WeddingGuest(WeddingGuestBase, AuditBase):
    id: int
    wedding_id: int

class WeddingVendorBase(BaseModel):
    name: str
    category: str
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    total_quote: int = 0
    paid_amount: int = 0
    status: str = "hired"
    contract_url: Optional[str] = None

class WeddingVendorCreate(WeddingVendorBase):
    pass

class WeddingVendor(WeddingVendorBase, AuditBase):
    id: int
    wedding_id: int

class WeddingBudgetBase(BaseModel):
    category: str
    allocated_amount: int = 0
    spent_amount: int = 0

class WeddingBudgetCreate(WeddingBudgetBase):
    pass

class WeddingBudget(WeddingBudgetBase, AuditBase):
    id: int
    wedding_id: int

class WeddingPlanBase(BaseModel):
    partner_names: Optional[str] = None
    wedding_date: Optional[datetime] = None
    location: Optional[str] = None
    total_budget: int = 0
    guest_count: int = 0
    priority: str = "Decor"
    allocation_json: str = "{}"

class WeddingPlanCreate(WeddingPlanBase):
    pass

class WeddingPlanUpdate(BaseModel):
    partner_names: Optional[str] = None
    wedding_date: Optional[datetime] = None
    location: Optional[str] = None
    total_budget: Optional[int] = None
    guest_count: Optional[int] = None
    priority: Optional[str] = None

class WeddingDashboardData(BaseModel):
    plan: WeddingPlanBase
    stats: dict
    tasks: List[WeddingTask]
    guests: List[WeddingGuest]
    vendors: List[WeddingVendor]
    budget: List[WeddingBudget]
