from fastapi import APIRouter, HTTPException
from app.core.supabase_client import get_supabase_client
from datetime import datetime
from fastapi import Query
import unicodedata


router = APIRouter(prefix="/api/guitars", tags=["Guitars"])
supabase = get_supabase_client()

def normalize_text(txt: str | None) -> str | None:
    """Normaliza texto (minúsculas, sin tildes, sin símbolos raros)"""
    if not txt:
        return None
    txt = txt.lower().strip()
    txt = unicodedata.normalize("NFD", txt)
    txt = "".join(c for c in txt if unicodedata.category(c) != "Mn")  # quita tildes
    txt = "".join(c for c in txt if c.isalnum() or c.isspace())        # deja letras/números/espacios
    return txt

def is_desconocido(txt: str | None) -> bool:
    """Detecta textos genéricos como 'desconocido' o 'sin marca'"""
    if not txt:
        return True
    desconocidos = ["desconocido", "no identificable", "sin marca", "generica", "generico", "genérica", "unknown"]
    return any(word in txt for word in desconocidos)

@router.get("/")
def get_guitars(limit: int = 80):
    """Obtiene las últimas guitarras desde Supabase"""
    response = supabase.table("guitarras_historial")\
        .select("*")\
        .order("fecha_scraping", desc=True)\
        .limit(limit)\
        .execute()

    if response.data is None:
        raise HTTPException(status_code=500, detail="Error al consultar Supabase")

    return response.data

@router.get("/analytics")
def get_guitar_analytics(
    marca: str = Query(..., description="Marca de la guitarra"),
    modelo: str = Query(..., description="Modelo de la guitarra")
):
    """Calcula precio promedio y tiempo promedio de venta para un modelo."""

    # 1️⃣ Normalización
    marca_norm = normalize_text(marca)
    modelo_norm = normalize_text(modelo)

    modelo_normalizado = None
    if not is_desconocido(marca_norm) and not is_desconocido(modelo_norm):
        modelo_normalizado = f"{marca_norm}_{modelo_norm}".replace(" ", "_")
    elif not is_desconocido(marca_norm):
        modelo_normalizado = marca_norm.replace(" ", "_")
    elif not is_desconocido(modelo_norm):
        modelo_normalizado = modelo_norm.replace(" ", "_")

    if not modelo_normalizado:
        return {"error": "No se pudo generar modelo_normalizado válido"}

    # 2️⃣ Consultar Supabase
    response = supabase.table("guitarras_historial")\
        .select("precio, fecha_publicacion, fecha_scraping, is_sold")\
        .eq("modelo_normalizado", modelo_normalizado)\
        .order("fecha_scraping", desc=True)\
        .execute()

    data = response.data or []
    if not data:
        return {"modelo_normalizado": modelo_normalizado, "avg_price": None, "avg_days_to_sell": None}

    # 3️⃣ Calcular métricas
    precios = [float(d["precio"]) for d in data if d.get("precio") is not None]
    avg_price = round(sum(precios) / len(precios), 1) if precios else None

    # 4️⃣ Calcular promedio de días entre publicación y venta
    days = []
    for d in data:
        if d.get("is_sold") and d.get("fecha_publicacion") and d.get("fecha_scraping"):
            try:
                pub = datetime.fromisoformat(d["fecha_publicacion"].replace("Z", "+00:00"))
                sold = datetime.fromisoformat(d["fecha_scraping"].replace("Z", "+00:00"))
                diff_days = (sold - pub).days
                if diff_days >= 0:
                    days.append(diff_days)
            except Exception:
                continue

    avg_days_to_sell = round(sum(days) / len(days), 1) if days else None

    return {
        "marca": marca,
        "modelo": modelo,
        "modelo_normalizado": modelo_normalizado,
        "avg_price": avg_price,
        "avg_days_to_sell": avg_days_to_sell,
        "n_registros": len(data)
    }
