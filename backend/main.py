from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.api.upload import router as upload_router
from backend.api.dashboard import router as dashboard_router
from backend.api.report import router as report_router
from backend.api.analysis import router as analysis_router
from backend.api.prediction import router as prediction_router

app = FastAPI(
    title="AgriVision API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount(
    "/charts",
    StaticFiles(directory="backend/charts"),
    name="charts"
)

app.mount(
    "/reports",
    StaticFiles(directory="backend/reports"),
    name="reports"
)

app.include_router(upload_router)


app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    report_router,
    prefix="/report",
    tags=["Report"]
)

app.include_router(
    analysis_router,
    prefix="/analysis",
    tags=["Analysis"]
)
app.include_router(prediction_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to AgriVision API"
    }