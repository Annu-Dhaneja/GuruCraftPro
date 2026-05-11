from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Annu Design Studio API"
    API_V1_STR: str = "/api/v1"
    CORS_ORIGINS: list = ["*"]
    DATABASE_URL: str = "sqlite:///./sql_app.db"
    
    # AI Service Keys
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    
    # Virtual Try-On (Legacy/External)
    NANO_BANANA_API_KEY: str = ""
    NANO_BANANA_API_URL: str = "https://api.banana.dev/v1/models/try-on/predict"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
