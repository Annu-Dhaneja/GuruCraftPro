"""
Cleanup duplicate cms_page_components rows.
Keeps only the FIRST (lowest id) association per (page_id, component_id) pair.
"""
import os, sys
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from sqlalchemy import text
from core.database import engine

print("--- Cleaning duplicate cms_page_components rows ---")

try:
    with engine.connect() as conn:
        # Count before
        before = conn.execute(text("SELECT COUNT(*) FROM cms_page_components")).scalar()
        print(f"Rows BEFORE cleanup: {before}")

        # Delete duplicates, keeping only the row with the smallest id per (page_id, component_id)
        conn.execute(text("""
            DELETE FROM cms_page_components
            WHERE id NOT IN (
                SELECT MIN(id)
                FROM cms_page_components
                GROUP BY page_id, component_id
            )
        """))
        conn.commit()

        # Count after
        after = conn.execute(text("SELECT COUNT(*) FROM cms_page_components")).scalar()
        print(f"Rows AFTER cleanup:  {after}")
        print(f"Removed {before - after} duplicate rows.")

        # Show remaining
        rows = conn.execute(text("""
            SELECT pc.id, p.slug as page, c.name as component, pc."order"
            FROM cms_page_components pc
            JOIN cms_pages p ON p.id = pc.page_id
            JOIN cms_components c ON c.id = pc.component_id
            ORDER BY p.slug, pc."order"
        """)).fetchall()
        
        print("\n--- Remaining page-component mappings ---")
        for r in rows:
            print(f"  [{r[1]}] -> {r[2]} (order={r[3]})")

except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()
