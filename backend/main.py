import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import traceback

from core.config import settings
from core.database import Base, engine, get_db
from routers import (
    admin_cms, admin_contacts, ai_lab, clothing_consultation, 
    contact, user, wardrobe, site_config, outfits, wedding, products
)
from services.seeding_service import SeedingService
from universal_schema_fix import fix_schema

# Create tables if they don't exist
try:
    print("Startup: Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Startup: Database tables verified.")
except Exception as e:
    print(f"Startup Error: Failed to create/verify tables: {e}")
    # We don't exit here to allow the app to potentially start and show 500s 
    # instead of crashing the whole process immediately.

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# ── Global Exception Handler ──────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"GLOBAL ERROR: {str(exc)}")
    traceback.print_exc()
    # We check if DEBUG exists in settings, default to False if not
    debug_mode = getattr(settings, "DEBUG", False)
    
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal Server Error",
            "detail": str(exc) if debug_mode else "An unexpected error occurred"
        },
    )

# ── CORS Middleware ──────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Startup Events ───────────────────────────────────────────────────
@app.on_event("startup")
def startup_event():
    try:
        print("Startup Event: Running schema repairs...")
        fix_schema()
        
        print("Startup Event: Running seeding/migration...")
        db = next(get_db())
        try:
            SeedingService.run_all(db)
            print("Startup Event: Seeding/migration completed.")
        except Exception as seed_err:
            print(f"Startup Event Error (Seeding): {seed_err}")
            traceback.print_exc()
        finally:
            db.close()
    except Exception as e:
        print(f"Startup Event Error (General): {e}")
        traceback.print_exc()

# ── Welcome Route ───────────────────────────────────────────────────
@app.get("/")
def read_root():
    return {
        "message": "Welcome to GurucraftPro API",
        "status": "online",
        "documentation": "/docs",
        "health": "/health"
    }

# ── Health Check ─────────────────────────────────────────────────────
@app.get("/health")
def health_check():
    return {"status": "ok", "api": "online", "database": "connected"}

# ── Routers ──────────────────────────────────────────────────────────
app.include_router(user.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["contact"])
app.include_router(ai_lab.router, prefix="/api/v1/ai-lab", tags=["ai-lab"])
app.include_router(clothing_consultation.router, prefix="/api/v1/consultation", tags=["consultation"])
app.include_router(admin_cms.router, prefix="/api/v1/cms", tags=["cms"])
app.include_router(admin_contacts.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(wardrobe.router, prefix="/api/v1/wardrobe", tags=["wardrobe"])
app.include_router(site_config.router, prefix="/api/v1/site-config", tags=["site-config"])
app.include_router(outfits.router, prefix="/api/v1/outfits", tags=["outfits"])
app.include_router(wedding.router, prefix="/api/v1/wedding", tags=["wedding"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])

# ── Static Files ─────────────────────────────────────────────────────
static_path = os.path.join(os.path.dirname(__file__), "static")
try:
    os.makedirs(os.path.join(static_path, "uploads"), exist_ok=True)
except Exception as e:
    print(f"Startup Warning: Could not create static uploads directory: {e}")

if os.path.exists(static_path):
    app.mount("/static", StaticFiles(directory=static_path), name="static")

# Mount frontend images if local
frontend_images = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "images")
if os.path.exists(frontend_images):
    app.mount("/images", StaticFiles(directory=frontend_images), name="images")
