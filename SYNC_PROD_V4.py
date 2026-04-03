import os
import sys
import json
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# ── PRODUCTION CONFIGURATION ──────────────────────────────────────────
# Using the Render Postgres URL found in FINAL_PRODUCTION_SYNC.py
DB_URL = "postgresql://annu_project_user:TWdBAMY4k7bHurZnY9sOEUHraNJdPk7E@dpg-d6rou5k50q8c73f6c8s0-a.oregon-postgres.render.com/annu_project?sslmode=require"

print(f"--- CONNECTING TO PRODUCTION RENDER DB ---")
print(f"Target: dpg-d6rou5k50q8c73f6c8s0-a.oregon-postgres.render.com")

engine = create_engine(DB_URL)

def sync_production_data():
    try:
        with engine.connect() as conn:
            print("[SYNC] Verifying table structure...")
            
            # --- 1. SYNC GURU JI ART DATA ---
            print("[SYNC] Updating Guru Ji Art (Divine Studio) content...")
            guruji_data = {
                "slug": "guru-ji-art",
                "hero": {
                    "title": "Guru Ji Art Work",
                    "subtitle": "THE DIVINE COLLECTION",
                    "description": "Experience the intersection of sacred symbolism and contemporary artistry. Our studio crafts premium bracelets, daily wisdom, and spiritual digital assets designed to bring peace and positivity to your life.",
                    "image": "https://images.unsplash.com/photo-1573408302315-924f7a250517?q=80&w=2400&auto=format&fit=crop"
                },
                "artworks": [
                    {
                        "title": "Divine Presence",
                        "desc": "Oil on canvas, 36x48 inches. Capturing the eternal calm and wisdom.",
                        "src": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop"
                    },
                    {
                        "title": "Sacred Geometry",
                        "desc": "Digital Art. The mathematical harmony of the universe.",
                        "src": "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=2670&auto=format&fit=crop"
                    }
                ],
                "story": {
                    "title": "The Legacy of Divine Art",
                    "description": "Our journey began with a simple mission: to make the divine visible. Annu Design Studio bridges the gap between ancient spiritual symbolism and modern artistic expression.",
                    "points": [
                        "Hand-painted traditional techniques",
                        "Premium archival quality materials",
                        "Each piece blessed and personalized",
                        "International Shipping"
                    ],
                    "image": "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop"
                },
                "products": [
                    { 
                        "id": "item1", 
                        "title": "Divine Energy Bracelet", 
                        "slug": "divine-energy-bracelet",
                        "description": "Handcrafted premium stone bracelets designed for spiritual balance, positive energy, and inner peace. Suitable for meditation, healing, and daily wear.",
                        "category": "Guru Ji Art",
                        "subCategory": "Product",
                        "price": "₹ 0", 
                        "priceType": "Fixed",
                        "tags": "spiritual, bracelet",
                        "image": "https://images.unsplash.com/photo-1611078838275-5fc0c75ff0d1?q=80&w=2574&auto=format&fit=crop",
                        "status": "active",
                        "displayOrder": 1
                    },
                    { 
                        "id": "item2", 
                        "title": "Daily Wisdom Quotes", 
                        "slug": "daily-wisdom-quotes",
                        "description": "Receive beautifully designed daily motivational and spiritual quotes. Perfect for inspiration, social media content, and personal growth.",
                        "category": "Guru Ji Art",
                        "subCategory": "Digital Content",
                        "price": "Free", 
                        "priceType": "Free",
                        "tags": "quotes, digital",
                        "image": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=2400&auto=format&fit=crop",
                        "status": "active",
                        "displayOrder": 2
                    },
                    { 
                        "id": "item3", 
                        "title": "Satsang Message", 
                        "slug": "satsang-message",
                        "description": "Weekly spiritual insights, Guru teachings, and Vedic astrology guidance delivered in simple language for life clarity and positivity.",
                        "category": "Guru Ji Art",
                        "subCategory": "Subscription Content",
                        "price": "Subscription", 
                        "priceType": "Subscription",
                        "tags": "satsang, teachings",
                        "image": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2400&auto=format&fit=crop",
                        "status": "active",
                        "displayOrder": 3
                    }
                ],
                "cta": {
                    "title": "Own a Masterpiece",
                    "link": "/contact",
                    "description": "\"A home with divine art is a home with divine protection.\" - Guruji"
                }
            }

            # Upsert the page content
            conn.execute(text("""
                UPDATE pages SET content = :content, updated_at = NOW() WHERE slug = 'guru-ji-art'
            """), {"content": json.dumps(guruji_data)})
            
            # --- 2. SYNC VANTAGE ECOM DATA ---
            print("[SYNC] Updating VantageEcom (Industrial Tech) content...")
            vantage_data = {
                "slug": "vantage-ecom",
                "hero": {
                    "title": "VantageEcom",
                    "subtitle": "SMART MENU LAYOUT",
                    "description": "Professional-grade post-production and e-commerce growth strategies. We transform imagery into high-conversion assets.",
                    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop"
                },
                "category_a": {
                    "title": "Category A — Creative Product",
                    "items": [
                        { "id": "srv1", "title": "Post-Production Editing", "slug": "post-production-editing", "description": "Professional photo editing optimized for e-commerce platforms.", "price": "₹499 / image", "image": "https://images.unsplash.com/photo-1626025211913-add5082bcac7?q=80&w=2400&auto=format&fit=crop" },
                        { "id": "srv2", "title": "Ghost Mannequin Effect", "slug": "ghost-mannequin-effect", "description": "Apparel editing for premium clothing presentation.", "price": "₹799 / image", "image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2400&auto=format&fit=crop" },
                        { "id": "srv3", "title": "All-Brand Product Editing", "slug": "all-brand-product-editing", "description": "Product imagery for Amazon, Flipkart, & Etsy.", "price": "₹599 / image", "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2400&auto=format&fit=crop" }
                    ]
                },
                "category_b": {
                    "title": "Category B — Technical E-com Assets",
                    "items": [
                        { "id": "srv4", "title": "Jersey Task Editing", "slug": "jersey-task-editing", "description": "Sportswear editing and texture enhancement.", "price": "₹699 / image", "image": "https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=2400&auto=format&fit=crop" },
                        { "id": "srv5", "title": "Custom Size Charts", "slug": "custom-size-charts", "description": "Branded charts optimized for conversion.", "price": "₹999 / chart", "image": "https://images.unsplash.com/photo-1621535497217-062e087d0dd6?q=80&w=2400&auto=format&fit=crop" }
                    ]
                },
                "category_c": {
                    "title": "Category C — Knowledge & Strategy",
                    "items": [
                        { "id": "srv6", "title": "E-books & Blueprints", "slug": "e-books-blueprints", "description": "Step-by-step guides for the Digital Merchant model.", "price": "₹1499", "image": "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2400&auto=format&fit=crop" }
                    ]
                }
            }
            
            # Upsert the page content
            conn.execute(text("""
                UPDATE pages SET content = :content, updated_at = NOW() WHERE slug = 'vantage-ecom'
            """), {"content": json.dumps(vantage_data)})
            
            conn.commit()
            print("Successfully synchronized all production data!")
            print("--- PRODUCTION SYNC COMPLETE ---")

    except Exception as e:
        print(f"Error during production sync: {e}")

if __name__ == "__main__":
    sync_production_data()
