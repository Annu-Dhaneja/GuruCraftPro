from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database configuration
# We check for various Vercel/Supabase/Render environment variables
# Database configuration
raw_url = (
    os.getenv("DATABASE_URL") or 
    os.getenv("VTO_POSTGRES_URL_NON_POOLING") or 
    os.getenv("VTO_POSTGRES_URL") or 
    os.getenv("POSTGRES_URL") or 
    "sqlite:///./sql_app.db"
)

# Clean the URL (remove quotes, whitespace, etc. which often cause "invalid dsn" errors)
SQLALCHEMY_DATABASE_URL = raw_url.strip().strip("'").strip('"')

# Handle legacy 'postgres://' prefix and ensure it's treated as a URI
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Debug helper (Safe: masks password)
def get_safe_url(url):
    if "@" in url:
        parts = url.split("@")
        return f"{parts[0].split(':')[0]}:***@{parts[1]}"
    return url

print(f"Connecting to Database: {get_safe_url(SQLALCHEMY_DATABASE_URL)}")

# Automatic SSL enforcement for Remote Postgres (Render/Supabase/Vercel)
if not SQLALCHEMY_DATABASE_URL.startswith("sqlite") and "sslmode" not in SQLALCHEMY_DATABASE_URL:
    delimiter = "&" if "?" in SQLALCHEMY_DATABASE_URL else "?"
    SQLALCHEMY_DATABASE_URL += f"{delimiter}sslmode=require"

if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # Optimized for PostgreSQL with pooling
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        pool_size=10,
        max_overflow=20,
        pool_pre_ping=True,
        pool_recycle=3600,
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
