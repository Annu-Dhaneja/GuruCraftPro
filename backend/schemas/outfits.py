from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ClothingPieceBase(BaseModel):
    name: Optional[str] = None
    image_url: str
    gender: str
    age_group: str
    style: str
    category: Optional[str] = None
    season: str = "All"
    occasion: str = "Daily wear"

class ClothingPieceCreate(ClothingPieceBase):
    pass

class ClothingPiece(ClothingPieceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class OutfitSuggestionRequest(BaseModel):
    gender: str
    age_group: str
    style: str
    season: Optional[str] = "All"
    occasion: Optional[str] = "Daily wear"

class OutfitSuggestionResponse(BaseModel):
    outfits: List[ClothingPiece]
