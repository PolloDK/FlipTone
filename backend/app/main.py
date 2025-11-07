from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import guitars

app = FastAPI(title="FlipTone API", version="1.0")

# Permitir acceso desde tu frontend Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción cambia esto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(guitars.router)

@app.get("/")
def root():
    return {"message": "🎸 FlipTone API running successfully"}
