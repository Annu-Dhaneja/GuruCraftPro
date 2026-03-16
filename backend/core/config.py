from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Annu Design Studio API"
    API_V1_STR: str = "/api/v1"
    CORS_ORIGINS: list = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # API Keys
    # Note: NANO_BANANA_API_KEY is currently used for Google Gemini Key
    NANO_BANANA_API_KEY: str = ""
    NANO_BANANA_API_URL: str = "https://api.banana.dev/v1/models/try-on/predict" 
    OPENAI_API_KEY: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
