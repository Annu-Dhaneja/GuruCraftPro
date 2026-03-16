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

# CORS Configuration - Permissive for development and multi-cloud sync
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for easier multi-environment orchestration
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



