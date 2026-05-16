from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "GurucraftPro Neural API"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "b39883528b9a4c8a8e1e8e8e8e8e8e8e" # Should be changed in prod
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 1 week
    
    # Infrastructure
    DATABASE_URL: str = "sqlite:///./sql_app.db"
    DEBUG: bool = False
    
    # AI Service Keys
    GEMINI_API_KEY: Optional[str] = ""
    OPENAI_API_KEY: Optional[str] = ""
    
    # Virtual Try-On
    NANO_BANANA_API_KEY: Optional[str] = ""
    NANO_BANANA_API_URL: str = "https://api.banana.dev/v1/models/try-on/predict"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
