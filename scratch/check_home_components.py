import sys, os
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from core.database import engine
from sqlalchemy import text

with engine.connect() as c:
    rows = c.execute(text(
        "SELECT pc.id, p.slug, c.name, c.type, pc.page_id, pc.component_id "
        "FROM cms_page_components pc "
        "JOIN cms_pages p ON p.id=pc.page_id "
        "JOIN cms_components c ON c.id=pc.component_id "
        "WHERE p.slug='home' ORDER BY pc.id"
    )).fetchall()
    for r in rows:
        print(f"assoc_id={r[0]} page={r[1]} comp_name={r[2]} comp_type={r[3]} page_id={r[4]} comp_id={r[5]}")
    print(f"Total home rows: {len(rows)}")
