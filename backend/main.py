from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from routers import contact, ai_lab, clothing_consultation, admin_cms, user, admin_contacts
from core.database import engine, Base

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

@app.on_event("startup")
def startup_db_sync():
    """
    Universal repair logic to ensure database consistency on every deployment.
    """
    from core import database, models, auth
    from repositories.cms import cms_repository
    db = next(database.get_db())
    
    try:
        # 1. Sync Admin User
        admin_username = "annuad@#05"
        admin_pass = "annu@123"
        user = db.query(models.User).filter(models.User.username == admin_username).first()
        hashed = auth.get_password_hash(admin_pass)
        
        if user:
            user.hashed_password = hashed
            user.role = models.UserRole.ADMIN
        else:
            user = models.User(username=admin_username, hashed_password=hashed, role=models.UserRole.ADMIN)
            db.add(user)
        
        # 2. Sync CMS
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
        print(f"🚀 Database Synchronized: Admin '{admin_username}' is ready.")
    except Exception as e:
        print(f"❌ Startup Sync Failed: {e}")
        db.rollback()

# Initialize the FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

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



