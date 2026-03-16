from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from routers import contact, ai_lab, clothing_consultation, admin_cms, user, admin_contacts
from core.database import engine, Base

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize the FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

@app.on_event("startup")
def startup_db_sync():
    """
    Ensure basic database consistency (schema and CMS) without modifying users.
    """
    from core import database, models
    from repositories.cms import cms_repository
    db = next(database.get_db())
    
    try:
        # 1. Sync CMS only if missing
        page = db.query(models.Page).filter(models.Page.slug == "home").first()
        if not page:
            cms_repository.update_page_content(db, "home", {
                "hero": {
                    "badge": "AI DESIGN STUDIO",
                    "headline_prefix": "Transform Your",
                    "headline_highlight": "Virtual Identity",
                    "headline_suffix": "Seamlessly",
                    "subheadline": "Experience the future of fashion with our AI-powered try-on technology."
                }
            })
        
        db.commit()
        print("🚀 Database Consistency Verified.")
    except Exception as e:
        print(f"❌ Startup Sync Failed: {e}")
        db.rollback()

# CORS Configuration - Explicit for production stability
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://annus.netlify.app",
        "https://virtual-trys.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """
    Health check endpoint for monitoring purposes.
    Returns:
        dict: Status 'ok' if healthy.
    """
    return {"status": "ok", "message": "Annu Design Studio API Backend"}

# Include Routers
app.include_router(user.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["contact"])
app.include_router(ai_lab.router, prefix="/api/v1/ai-lab", tags=["ai-lab"])
app.include_router(clothing_consultation.router, prefix="/api/v1/consultation", tags=["consultation"])
app.include_router(admin_cms.router, prefix="/api/v1/cms", tags=["cms"])
app.include_router(admin_contacts.router, prefix="/api/v1/admin", tags=["admin"])



