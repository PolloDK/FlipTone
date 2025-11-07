from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "FlipTone"
    DEBUG: bool = True
    SUPABASE_URL: str
    SUPABASE_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()
