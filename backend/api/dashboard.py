from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.database.models import UploadedDataset
import pandas as pd
import os
from fastapi import HTTPException
from backend.analytics.agricultural import agriculture_summary

router = APIRouter()


@router.get("/datasets")
def get_datasets(db: Session = Depends(get_db)):
    datasets = db.query(UploadedDataset).all()

    return [
        {
            "id": d.id,
            "filename": d.filename,
            "filepath": d.filepath,
            "uploaded_at": d.uploaded_at
        }
        for d in datasets
    ]
from backend.database.models import AnalysisHistory


@router.get("/analysis")
def get_analysis(db: Session = Depends(get_db)):
    analysis = db.query(AnalysisHistory).all()

    return [
        {
            "id": a.id,
            "dataset_id": a.dataset_id,
            "rows": a.rows,
            "columns": a.columns,
            "missing_values": a.missing_values,
            "duplicate_rows": a.duplicate_rows,
            "outliers": a.outliers,
            "analyzed_at": a.analyzed_at
        }
        for a in analysis
    ]
from sqlalchemy import func


@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    total_datasets = db.query(UploadedDataset).count()

    total_analysis = db.query(AnalysisHistory).count()

    return {
        "total_datasets": total_datasets,
        "total_analysis": total_analysis
    }
@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):

    total_datasets = db.query(UploadedDataset).count()

    total_analysis = db.query(AnalysisHistory).count()

    return {
        "total_datasets": total_datasets,
        "total_analysis": total_analysis
    }
@router.get("/crop-summary")
def crop_summary(db: Session = Depends(get_db)):

    latest_dataset = (
        db.query(UploadedDataset)
        .order_by(UploadedDataset.uploaded_at.desc())
        .first()
    )

    if not latest_dataset:
        raise HTTPException(status_code=404, detail="No dataset found")

    if not os.path.exists(latest_dataset.filepath):
        raise HTTPException(status_code=404, detail="Dataset file not found")

    df = pd.read_csv(latest_dataset.filepath)

    return {
        "total_records": len(df),
        "most_common_crop": df["Crop"].mode()[0],
        "average_yield": round(df["Yield_tons_per_hectare"].mean(), 2),
        "average_rainfall": round(df["Rainfall_mm"].mean(), 2),
        "average_temperature": round(df["Temperature_Celsius"].mean(), 2),
        "most_common_soil": df["Soil_Type"].mode()[0]
    }
@router.get("/crop-distribution")
def crop_distribution(db: Session = Depends(get_db)):

    latest_dataset = (
        db.query(UploadedDataset)
        .order_by(UploadedDataset.uploaded_at.desc())
        .first()
    )

    if not latest_dataset:
        raise HTTPException(status_code=404, detail="No dataset found")

    df = pd.read_csv(latest_dataset.filepath)

    return df["Crop"].value_counts().to_dict()
@router.get("/soil-distribution")
def soil_distribution(db: Session = Depends(get_db)):

    latest_dataset = (
        db.query(UploadedDataset)
        .order_by(UploadedDataset.uploaded_at.desc())
        .first()
    )

    if not latest_dataset:
        raise HTTPException(status_code=404, detail="No dataset found")

    df = pd.read_csv(latest_dataset.filepath)

    return df["Soil_Type"].value_counts().to_dict()
@router.get("/weather-summary")
def weather_summary(db: Session = Depends(get_db)):

    latest_dataset = (
        db.query(UploadedDataset)
        .order_by(UploadedDataset.uploaded_at.desc())
        .first()
    )

    if not latest_dataset:
        raise HTTPException(status_code=404, detail="No dataset found")

    df = pd.read_csv(latest_dataset.filepath)

    return {
        "average_temperature": round(df["Temperature_Celsius"].mean(), 2),
        "highest_temperature": round(df["Temperature_Celsius"].max(), 2),
        "lowest_temperature": round(df["Temperature_Celsius"].min(), 2),
        "average_rainfall": round(df["Rainfall_mm"].mean(), 2)
    }
@router.get("/yield-analysis")
def yield_analysis(db: Session = Depends(get_db)):

    latest_dataset = (
        db.query(UploadedDataset)
        .order_by(UploadedDataset.uploaded_at.desc())
        .first()
    )

    if not latest_dataset:
        raise HTTPException(status_code=404, detail="No dataset found")

    df = pd.read_csv(latest_dataset.filepath)

    return {
        "minimum_yield": round(df["Yield_tons_per_hectare"].min(), 2),
        "maximum_yield": round(df["Yield_tons_per_hectare"].max(), 2),
        "average_yield": round(df["Yield_tons_per_hectare"].mean(), 2),
        "median_yield": round(df["Yield_tons_per_hectare"].median(), 2)
    }
@router.get("/agriculture-summary")
def agriculture_dashboard(
    db: Session = Depends(get_db)
):

    dataset = (
        db.query(UploadedDataset)
        .order_by(
            UploadedDataset.uploaded_at.desc()
        )
        .first()
    )


    if not dataset:
        raise HTTPException(
            status_code=404,
            detail="No dataset found"
        )


    return agriculture_summary(
        dataset.filepath
    )