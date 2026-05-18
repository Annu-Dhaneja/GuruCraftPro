import json
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session, joinedload
from core.models import CMSPage, CMSComponent, CMSPageComponent, GlobalSettings

def get_global_settings(db: Session) -> Dict[str, Any]:
    """Fetch site-wide settings (SSOT)."""
    try:
        settings = db.query(GlobalSettings).first()
        if not settings:
            return {
                "brand": {"name": "GurucraftPro", "logo_text": "G", "logo_url": "", "tagline": "Crafting digital excellence."},
                "contact": {"email": "hello@gurucraftpro.com", "phone": "", "address": ""},
                "footer_explore": [], "footer_support": [], "footer_bottom": {"copyright": "© 2026 GurucraftPro. All rights reserved."},
                "social": {}, "nav": [], "theme": {}
            }
        
        footer_data = {}
        if settings.footer_json:
            try:
                footer_data = json.loads(settings.footer_json)
            except Exception:
                pass
                
        social_data = {}
        if settings.social_json:
            try:
                social_data = json.loads(settings.social_json)
            except Exception:
                pass

        nav_data = []
        if hasattr(settings, 'nav_json') and settings.nav_json:
            try:
                nav_data = json.loads(settings.nav_json)
            except Exception:
                pass

        theme_data = {}
        if hasattr(settings, 'theme_json') and settings.theme_json:
            try:
                theme_data = json.loads(settings.theme_json)
            except Exception:
                pass
        
        return {
            "brand": {
                "name": settings.site_name or "GurucraftPro",
                "logo_text": settings.site_name[0] if settings.site_name else "G",
                "logo_url": settings.logo_url or "",
                "tagline": settings.address or "Crafting digital excellence."
            },
            "contact": {
                "email": settings.contact_email or "hello@gurucraftpro.com",
                "phone": settings.phone or "",
                "address": settings.address or ""
            },
            "footer_explore": footer_data.get("explore", []),
            "footer_support": footer_data.get("support", []),
            "footer_bottom": {
                "copyright": footer_data.get("copyright", "© 2026 GurucraftPro. All rights reserved.")
            },
            "social": social_data,
            "nav": nav_data,
            "theme": theme_data
        }
    except Exception as e:
        print(f"Error in get_global_settings: {e}")
        return {
            "brand": {"name": "GurucraftPro", "logo_text": "G", "logo_url": "", "tagline": "Crafting digital excellence."},
            "contact": {"email": "hello@gurucraftpro.com", "phone": "", "address": ""},
            "footer_explore": [], "footer_support": [], "footer_bottom": {"copyright": "© 2026 GurucraftPro. All rights reserved."},
            "social": {}, "nav": [], "theme": {}
        }


def update_global_settings(db: Session, data: Dict[str, Any]) -> Dict[str, Any]:
    """Upsert site-wide settings."""
    settings = db.query(GlobalSettings).first()
    if not settings:
        settings = GlobalSettings()
        db.add(settings)
    
    if "site_name" in data: settings.site_name = data["site_name"]
    if "logo_url" in data: settings.logo_url = data["logo_url"]
    if "contact_email" in data: settings.contact_email = data["contact_email"]
    if "phone" in data: settings.phone = data["phone"]
    if "address" in data: settings.address = data["address"]
    if "footer" in data: 
        settings.footer_json = json.dumps(data["footer"])
    elif any(k in data for k in ["footer_explore", "footer_support", "footer_bottom"]):
        # Supportexploded format from frontend
        current_footer = json.loads(settings.footer_json) if settings.footer_json else {}
        if "footer_explore" in data: current_footer["explore"] = data["footer_explore"]
        if "footer_support" in data: current_footer["support"] = data["footer_support"]
        if "footer_bottom" in data: current_footer["copyright"] = data["footer_bottom"].get("copyright", "")
        settings.footer_json = json.dumps(current_footer)

    if "social" in data: settings.social_json = json.dumps(data["social"])
    if "nav" in data: settings.nav_json = json.dumps(data["nav"])
    if "theme" in data: settings.theme_json = json.dumps(data["theme"])
    
    db.commit()
    db.refresh(settings)
    return get_global_settings(db)


def get_ssot_page_content(db: Session, slug: str, published_only: bool = True) -> Dict[str, Any]:
    """
    Assembles a page by fetching its components in order.
    Returns a unified object for the frontend.
    Uses explicit separate queries to avoid cartesian product duplication
    from chained joinedload/subqueryload through junction tables.
    """
    # Normalize/Alias slugs for compatibility between seed data and frontend requests
    if slug == "guruji":
        slug = "guru-ji-art"
    elif slug == "wedding-plan":
        slug = "wedding-showcase"
    elif slug == "clothing-consultation":
        slug = "7-day-clothing-consultation"

    # Step 1: Get the page (no eager loading)
    query = db.query(CMSPage).filter(CMSPage.slug == slug)
    if published_only:
        query = query.filter(CMSPage.status == "published")
    
    page = query.first()
    if not page:
        return {}

    # Step 2: Explicitly query page_components for THIS page, ordered correctly
    assocs = db.query(CMSPageComponent).filter(
        CMSPageComponent.page_id == page.id
    ).order_by(CMSPageComponent.order).all()

    # Step 3: Build clean component list with deduplication safety net
    components = []
    seen_component_ids = set()
    for assoc in assocs:
        if assoc.component_id in seen_component_ids:
            continue
        seen_component_ids.add(assoc.component_id)
        
        # Fetch the component definition
        comp = db.query(CMSComponent).filter(CMSComponent.id == assoc.component_id).first()
        if not comp:
            continue
            
        try:
            props = json.loads(assoc.props_json)
            # Auto-unpack double-nested props from legacy seeding anomalies
            if isinstance(props, dict) and "props" in props and len(props) == 1:
                props = props["props"]
        except:
            props = {}
            
        components.append({
            "id": comp.id,
            "type": comp.type,
            "name": comp.name,
            "props": props,
            "order": assoc.order
        })

    res = {
        "title": page.title,
        "slug": page.slug,
        "meta": {
            "title": page.meta_title,
            "description": page.meta_description
        },
        "components": components
    }
    
    # Bridge to V2 by exposing each component's props as a top-level key
    for comp in components:
        name = comp.get("name")
        if name and name not in res:
            res[name] = comp.get("props", {})
            
    return res


def upsert_component(db: Session, name: str, comp_type: str, schema: Dict[str, Any] = None) -> CMSComponent:
    """Creates or updates a reusable component definition."""
    comp = db.query(CMSComponent).filter(CMSComponent.name == name).first()
    if not comp:
        comp = CMSComponent(
            name=name,
            type=comp_type
        )
        db.add(comp)
    
    if schema is not None:
        comp.schema_json = json.dumps(schema)
        
    db.flush()
    db.refresh(comp)
    return comp


def link_component_to_page(db: Session, page_slug: str, comp_name: str, props: Dict[str, Any], order: int = 0) -> bool:
    """Connects a component instance to a page."""
    page = db.query(CMSPage).filter(CMSPage.slug == page_slug).first()
    if not page:
        page = CMSPage(title=page_slug.replace("-", " ").title(), slug=page_slug)
        db.add(page)
        db.flush()

    comp = db.query(CMSComponent).filter(CMSComponent.name == comp_name).first()
    if not comp:
        return False

    # Check if already linked at this order (or update existing)
    assoc = db.query(CMSPageComponent).filter(
        CMSPageComponent.page_id == page.id,
        CMSPageComponent.component_id == comp.id
    ).first()

    if not assoc:
        assoc = CMSPageComponent(page_id=page.id, component_id=comp.id, order=order, props_json=json.dumps(props))
        db.add(assoc)
    else:
        assoc.order = order
        assoc.props_json = json.dumps(props)

    db.flush()
    return True

def update_ssot_page_content(db: Session, page_slug: str, content: Dict[str, Any]) -> bool:
    """
    Updates an SSOT page.
    """
    # Normalize/Alias slugs for compatibility between seed data and frontend requests
    if page_slug == "guruji":
        page_slug = "guru-ji-art"
    elif page_slug == "wedding-plan":
        page_slug = "wedding-showcase"
    elif page_slug == "clothing-consultation":
        page_slug = "7-day-clothing-consultation"

    page = db.query(CMSPage).filter(CMSPage.slug == page_slug).first()
    if not page:
        page = CMSPage(title=page_slug.replace("-", " ").title(), slug=page_slug, status="published")
        db.add(page)
        db.flush()
    else:
        page.status = "published"

    if "meta" in content and isinstance(content["meta"], dict):
        meta = content["meta"]
        if "title" in meta: page.meta_title = meta["title"]
        if "description" in meta: page.meta_description = meta["description"]
    
    if "title" in content and content["title"]:
        page.title = content["title"]

    # CASE 1: Components array (New V3 format)
    if "components" in content and isinstance(content["components"], list):
        # Clear existing
        db.query(CMSPageComponent).filter(CMSPageComponent.page_id == page.id).delete()
        
        for idx, comp_data in enumerate(content["components"]):
            if not isinstance(comp_data, dict): continue
            
            comp_name = comp_data.get("name")
            comp_type = comp_data.get("type", "hero")
            props = comp_data.get("props", {})
            
            # Sync top-level key override if present in the payload (V2 editing bridging)
            if comp_name and comp_name in content:
                props = content[comp_name]
            
            if comp_name:
                upsert_component(db, comp_name, comp_type)
                link_component_to_page(db, page_slug, comp_name, props, order=idx)
        db.commit()
        return True

    # CASE 2: Flattened top-level keys (Legacy-compatible format)
    for key, props in content.items():
        if key in ["title", "slug", "meta"]: continue
        
        comp_type = "hero"
        if "features" in key or "list" in key or "categories" in key: comp_type = "features"
        if "cta" in key or "newsletter" in key: comp_type = "cta"
        
        upsert_component(db, key, comp_type)
        link_component_to_page(db, page_slug, key, props)
        
    db.commit()
    return True


# ── V2/V3 BRIDGING HELPERS FOR DB SEEDERS ──────────────────────────────

_seeded_contents = {}

def upsert_reusable_section(db: Session, slug: str, comp_type: str, content: Dict[str, Any]):
    """Creates or updates a reusable component definition and caches its content for page linking."""
    comp = db.query(CMSComponent).filter(CMSComponent.name == slug).first()
    if not comp:
        comp = CMSComponent(name=slug, type=comp_type)
        db.add(comp)
        db.flush()
    else:
        comp.type = comp_type
    
    # Store in database schema_json as a persistent fallback
    comp.schema_json = json.dumps(content)
    db.commit()
    
    # Store in memory for immediate linking
    _seeded_contents[slug] = content
    return comp

def link_section_to_page(db: Session, page_slug: str, section_slug: str, order: int = 0) -> bool:
    """Connects a section (component definition) to a page using cached or stored content."""
    # Apply slug normalization to linked pages
    if page_slug == "guruji":
        page_slug = "guru-ji-art"
    elif page_slug == "wedding-plan":
        page_slug = "wedding-showcase"
    elif page_slug == "clothing-consultation":
        page_slug = "7-day-clothing-consultation"

    page = db.query(CMSPage).filter(CMSPage.slug == page_slug).first()
    if not page:
        page = CMSPage(title=page_slug.replace("-", " ").title(), slug=page_slug, status="published")
        db.add(page)
        db.flush()
    else:
        page.status = "published"

    comp = db.query(CMSComponent).filter(CMSComponent.name == section_slug).first()
    if not comp:
        return False

    # Retrieve content from in-memory cache or fallback to schema_json
    props = _seeded_contents.get(section_slug)
    if props is None and comp.schema_json:
        try:
            props = json.loads(comp.schema_json)
        except:
            props = {}
    if props is None:
        props = {}

    assoc = db.query(CMSPageComponent).filter(
        CMSPageComponent.page_id == page.id,
        CMSPageComponent.component_id == comp.id
    ).first()

    if not assoc:
        assoc = CMSPageComponent(
            page_id=page.id,
            component_id=comp.id,
            order=order,
            props_json=json.dumps(props)
        )
        db.add(assoc)
    else:
        assoc.order = order
        assoc.props_json = json.dumps(props)

    db.commit()
    return True
