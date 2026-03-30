import sqlite3
import json

def check_ssot_data():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    print("--- SSOT CMS DATA ---")
    
    # 1. Check cms_pages
    print("\n[CMS Pages]")
    try:
        cursor.execute("SELECT id, title, slug FROM cms_pages")
        pages = cursor.fetchall()
        for p in pages:
            print(f"ID={p[0]}, Title='{p[1]}', Slug='{p[2]}'")
            
            # For each page, find associated sections
            cursor.execute("""
                SELECT rs.slug, rs.type, rs.content 
                FROM reusable_sections rs
                JOIN page_section_associations psa ON rs.id = psa.section_id
                WHERE psa.page_id = ?
                ORDER BY psa.[order]
            """, (p[0],))
            sections = cursor.fetchall()
            print(f"  Sections found: {len(sections)}")
            for s in sections:
                content_preview = s[2][:100] + "..." if len(s[2]) > 100 else s[2]
                print(f"    - [{s[1]}] {s[0]}: {content_preview}")
                
    except Exception as e:
        print(f"Error checking SSOT data: {e}")

    # 2. Check Global Settings
    print("\n[Global Settings]")
    try:
        cursor.execute("SELECT * FROM global_settings")
        settings = cursor.fetchall()
        for s in settings:
            print(s)
    except:
        print("GlobalSettings table not found")

    conn.close()

if __name__ == "__main__":
    check_ssot_data()
