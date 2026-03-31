import sys
import os
from sqlalchemy.orm import Session

# Add backend to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.database import SessionLocal, engine
from core import models
from routers.outfits import map_age_group

def test_logic():
    print("🚀 Verifying Smart Clothes Planner Logic...")
    
    # 1. Test Age Mapping
    mappings = {
        2: "baby",
        8: "kids",
        15: "teen",
        25: "young_adult",
        40: "adult",
        65: "senior"
    }
    for age, expected in mappings.items():
        actual = map_age_group(age)
        assert actual == expected, f"Age Mapping Error: {age} -> {actual} (expected {expected})"
    print("✅ Age mapping matrix verified.")

    # 2. Test Recommendation Logic (Database Mock or Actual Test DB)
    db = SessionLocal()
    try:
        # Check if we have enough data to test
        count = db.query(models.ClothingPiece).count()
        print(f"Index size: {count} visuals.")
        
        # Test a suggestion query
        from routers.outfits import suggest_outfits
        # We can't call the endpoint function easily without Request object, 
        # so we test the logic via the actual query structure.
        
        test_gender = "female"
        test_style = "Casual"
        test_age = 25
        target_group = map_age_group(test_age)
        
        print(f"Testing Profile: {test_gender} | {test_style} | {target_group}")
        
        # Exact Match (Tier 1)
        tier1 = db.query(models.ClothingPiece).filter(
            models.ClothingPiece.age_group == target_group,
            models.ClothingPiece.gender == test_gender,
            models.ClothingPiece.style == test_style
        ).all()
        print(f"Tier 1 (Exact): {len(tier1)} matches.")
        
        # Tier 2 (Gender + Style)
        tier2 = db.query(models.ClothingPiece).filter(
            models.ClothingPiece.gender == test_gender,
            models.ClothingPiece.style == test_style
        ).all()
        print(f"Tier 2 (Gender+Style): {len(tier2)} matches.")

        # Tier 3 (Style)
        tier3 = db.query(models.ClothingPiece).filter(
            models.ClothingPiece.style == test_style
        ).all()
        print(f"Tier 3 (Style Only): {len(tier3)} matches.")

    finally:
        db.close()

if __name__ == "__main__":
    test_logic()
