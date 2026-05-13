from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database configuration
# We check for standard DATABASE_URL, and Vercel-specific Supabase/Postgres variables
SQLALCHEMY_DATABASE_URL = (
    os.getenv("DATABASE_URL") or 
    os.getenv("VTO_POSTGRES_URL") or 
    os.getenv("POSTGRES_URL") or 
    "sqlite:///./sql_app.db"
)

# Handle legacy 'postgres://' prefix (Standard in Render/Heroku/Supabase URIs)
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Automatic SSL enforcement for Remote Postgres (Render/Supabase)
if ("render.com" in SQLALCHEMY_DATABASE_URL or "supabase.co" in SQLALCHEMY_DATABASE_URL) and "sslmode" not in SQLALCHEMY_DATABASE_URL:
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
