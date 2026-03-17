import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from core.config import settings
from core.database import Base, engine
from routers import admin_cms, admin_contacts, ai_lab, clothing_consultation, contact, user

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)


# ── CORS MUST be registered BEFORE routes ────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://annus.netlify.app",
        "https://virtual-trys.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_sync() -> None:
    """
    On every boot:
    1) Migrate old Enum columns to VARCHAR (safe for PostgreSQL)
    2) Upsert admin users from environment variables
    3) Ensure minimal CMS home content exists
    """
    from core import auth, database, models
    from repositories.cms import cms_repository

    db = next(database.get_db())

    # ── 0. Migrate Enum columns to VARCHAR (only needed once, safe to re-run) ──
    try:
        with engine.connect() as conn:
            # Check if we're on PostgreSQL (not SQLite)
            dialect = engine.dialect.name
            if dialect == "postgresql":
                # Convert role column from enum to varchar
                conn.execute(text("ALTER TABLE users ALTER COLUMN role TYPE VARCHAR USING role::text"))
                # Convert status columns from enum to varchar  
                conn.execute(text("ALTER TABLE pages ALTER COLUMN status TYPE VARCHAR USING status::text"))
                conn.execute(text("ALTER TABLE posts ALTER COLUMN status TYPE VARCHAR USING status::text"))
                # Drop the old enum types if they exist
                conn.execute(text("DROP TYPE IF EXISTS userrole CASCADE"))
                conn.execute(text("DROP TYPE IF EXISTS pagestatus CASCADE"))
                conn.commit()
                print("Startup: Enum→VARCHAR migration complete")
    except Exception as exc:
        print(f"Startup: Enum migration skipped (already done or N/A): {exc}")

    # ── 1. Seed admin users ──────────────────────────────────────────
    try:
        admin_pairs = [
            (os.getenv("ADMIN_USERNAME_1"), os.getenv("ADMIN_PASSWORD_1")),
            (os.getenv("ADMIN_USERNAME_2"), os.getenv("ADMIN_PASSWORD_2")),
        ]
        synced = []

        for uname, pwd in admin_pairs:
            if not uname or not pwd:
                continue

            row = db.query(models.User).filter(models.User.username == uname).first()
            hashed = auth.get_password_hash(pwd)

            if row:
                row.hashed_password = hashed
                row.role = "admin"
            else:
                db.add(models.User(
                    username=uname,
                    hashed_password=hashed,
                    role="admin",
                ))
            synced.append(uname)

        db.commit()
        print(f"Startup: admin sync OK → {synced or 'no env vars'}")
    except Exception as exc:
        db.rollback()
        print(f"Startup: admin sync FAILED → {exc}")

    # ── 2. Seed CMS home page ────────────────────────────────────────
    try:
        if not db.query(models.Page).filter(models.Page.slug == "home").first():
            cms_repository.update_page_content(db, "home", {
                "hero": {
                    "badge": "AI DESIGN STUDIO",
                    "headline_prefix": "Transform Your",
                    "headline_highlight": "Virtual Identity",
                    "headline_suffix": "Seamlessly",
                    "subheadline": "Experience the future of fashion with our AI-powered try-on technology.",
                }
            })
        db.commit()
        print("Startup: CMS sync OK")
    except Exception as exc:
        db.rollback()
        print(f"Startup: CMS sync FAILED → {exc}")
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Annu Design Studio API Backend"}


# ── Routers ──────────────────────────────────────────────────────────
app.include_router(user.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["contact"])
app.include_router(ai_lab.router, prefix="/api/v1/ai-lab", tags=["ai-lab"])
app.include_router(clothing_consultation.router, prefix="/api/v1/consultation", tags=["consultation"])
app.include_router(admin_cms.router, prefix="/api/v1/cms", tags=["cms"])
app.include_router(admin_contacts.router, prefix="/api/v1/admin", tags=["admin"])
