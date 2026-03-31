import sqlite3
import json
import os

def seed_clothes():
    db_path = 'backend/sql_app.db'
    if not os.path.exists(db_path):
        print(f"Error: {db_path} not found.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Clear existing data to avoid duplicates for this test
    cursor.execute('DELETE FROM clothing_pieces')

    # Sample data: (gender, age_group, style, season, occasion, color, image_url)
    clothes = [
        # Male - Young Adult - Casual
        ("male", "young_adult", "Casual", "All", "Daily wear", "#3498db", "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1000"),
        ("male", "young_adult", "Casual", "All", "Weekend", "#e74c3c", "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000"),
        ("male", "young_adult", "Casual", "All", "Daily wear", "#2ecc71", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000"),
        ("male", "young_adult", "Casual", "All", "Outing", "#f1c40f", "https://images.unsplash.com/photo-1520975954732-35dd2229969e?q=80&w=1000"),
        ("male", "young_adult", "Casual", "All", "Daily wear", "#9b59b6", "https://images.unsplash.com/photo-1550991152-124204d3080c?q=80&w=1000"),
        ("male", "young_adult", "Casual", "All", "Cafe", "#34495e", "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000"),
        ("male", "young_adult", "Casual", "All", "Daily wear", "#1abc9c", "https://images.unsplash.com/photo-1519330377309-9ee1c6783348?q=80&w=1000"),
        
        # Female - Young Adult - Casual
        ("female", "young_adult", "Casual", "All", "Daily wear", "#ff69b4", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000"),
        ("female", "young_adult", "Casual", "All", "Brunch", "#ffffff", "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000"),
        ("female", "young_adult", "Casual", "All", "Daily wear", "#000000", "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000"),
        ("female", "young_adult", "Casual", "All", "Party", "#f1c40f", "https://images.unsplash.com/photo-1539109132314-dc47750d0904?q=80&w=1000"),
        ("female", "young_adult", "Casual", "All", "Date", "#e74c3c", "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000"),
        ("female", "young_adult", "Casual", "All", "Office", "#34495e", "https://images.unsplash.com/photo-1594633313207-9255789f24e9?q=80&w=1000"),
        ("female", "young_adult", "Casual", "All", "Shopping", "#9b59b6", "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000"),
    ]

    cursor.executemany('''
        INSERT INTO clothing_pieces (gender, age_group, style, season, occasion, color, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', clothes)

    conn.commit()
    print(f"Seeded {len(clothes)} items successfully with correct columns.")
    conn.close()

if __name__ == "__main__":
    seed_clothes()
