from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.analytics.preprocessing import (
    load_dataset,
    check_missing_values,
    count_duplicate_rows,
    detect_outliers
)
from backend.analytics.quality import calculate_quality_score
from backend.analytics.statistics import generate_statistics
from backend.analytics.visualization import (
    generate_histogram,
    generate_boxplot,
    generate_scatter,
    generate_heatmap,
    generate_bar_chart
)
from fastapi import Depends
from sqlalchemy.orm import Session
from backend.reports.report_generator import generate_report
from backend.database.database import get_db
from backend.database.crud import create_analysis_history, create_uploaded_dataset
from backend.analytics.column_mapper import map_columns
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "backend/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    dataset_record = create_uploaded_dataset(
        db,
        file.filename,
        file_path
    )
    df = load_dataset(file_path)
    df = map_columns(df)
    preview = df.head(10).to_dict(
        orient="records"
    )
    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="Dataset is empty"
        )
    required_columns = [
        "Crop",
        "Soil_Type",
        "Rainfall_mm",
        "Temperature_Celsius",
        "Yield_tons_per_hectare"
    ]


    missing_columns = [
        col for col in required_columns
        if col not in df.columns
    ]


    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Missing required agriculture columns",
                "missing_columns": missing_columns
            }
        )
    missing_values = check_missing_values(df)
    duplicate_rows = count_duplicate_rows(df)
    outliers = detect_outliers(df)
    statistics = generate_statistics(df)
    agriculture_summary = {}

    if "Crop" in df.columns:
        agriculture_summary["Most Common Crop"] = (
            df["Crop"].mode()[0]
        )

    if "Soil_Type" in df.columns:
        agriculture_summary["Most Common Soil Type"] = (
            df["Soil_Type"].mode()[0]
        )

    if "Yield_tons_per_hectare" in df.columns:
        agriculture_summary["Average Yield"] = (
            round(
                df["Yield_tons_per_hectare"].mean(),
                2
            )
        )

    if "Rainfall_mm" in df.columns:
        agriculture_summary["Average Rainfall"] = (
            round(
                df["Rainfall_mm"].mean(),
                2
            )
        )

    if "Temperature_Celsius" in df.columns:
        agriculture_summary["Average Temperature"] = (
            round(
                df["Temperature_Celsius"].mean(),
                2
            )
        )
    
    histogram = generate_histogram(
        df,
        dataset_record.id
    )

    boxplot = generate_boxplot(
        df,
        dataset_record.id
    )

    scatter = generate_scatter(
        df,
        dataset_record.id
    )

    heatmap = generate_heatmap(
        df,
        dataset_record.id
    )

    bar_chart = generate_bar_chart(
        df,
        dataset_record.id
    )
    total_missing = sum(missing_values.values())

    total_outliers = sum(outliers.values())
    quality = calculate_quality_score(
        missing_values,
        duplicate_rows,
        outliers
    )
    analysis = create_analysis_history(
        db=db,
        dataset_id=dataset_record.id,
        rows=len(df),
        columns=len(df.columns),
        missing_values=total_missing,
        duplicate_rows=duplicate_rows,
        outliers=total_outliers
    )
    report = generate_report(
        dataset_id=dataset_record.id,
        filename=file.filename,
        rows=len(df),
        columns=len(df.columns),
        missing_values=missing_values,
        duplicate_rows=duplicate_rows,
        outliers=outliers,
        statistics=statistics,
        agriculture_summary=agriculture_summary
    )
    return {
        "message": "Dataset uploaded successfully",
        "dataset_id": dataset_record.id,
        "filename": file.filename,
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": list(df.columns),
        "missing_values": missing_values,
        "duplicate_rows": duplicate_rows,
        "outliers": outliers,
        "statistics": statistics,
        "charts": {
            "histogram": histogram,
            "boxplot": boxplot,
            "scatter": scatter,
            "heatmap": heatmap,
            "bar_chart": bar_chart
        },
        "report": report,
        "preview": preview,
        "quality": quality
    }