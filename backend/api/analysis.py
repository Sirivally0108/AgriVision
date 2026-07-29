from backend.analytics.statistics import generate_statistics
from backend.analytics.column_mapper import map_columns
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import pandas as pd

from backend.database.database import get_db
from backend.database.models import UploadedDataset, AnalysisHistory


router = APIRouter()


@router.get("/{dataset_id}")
def get_complete_analysis(
    dataset_id: int,
    db: Session = Depends(get_db)
):

    # Get dataset information

    dataset = (
        db.query(UploadedDataset)
        .filter(
            UploadedDataset.id == dataset_id
        )
        .first()
    )


    if not dataset:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )


    # Check file exists

    if not os.path.exists(dataset.filepath):

        raise HTTPException(
            status_code=404,
            detail="Dataset file missing"
        )


    # Read CSV

    df = pd.read_csv(dataset.filepath)

    df = map_columns(df)
    # Find analysis history
    statistics = generate_statistics(df)
    analysis = (
        db.query(AnalysisHistory)
        .filter(
            AnalysisHistory.dataset_id == dataset_id
        )
        .first()
    )
    print("ANALYSIS RECORD:")
    print(analysis)
    if analysis:
        print(
            analysis.rows,
            analysis.columns,
            analysis.missing_values,
            analysis.duplicate_rows,
            analysis.outliers
        )
    agriculture_summary = {}
    if "Crop" in df.columns:
        agriculture_summary["most_common_crop"] = (
            df["Crop"]
            .mode()[0]
        )


    if "Yield_tons_per_hectare" in df.columns:

        agriculture_summary["average_yield"] = (
            float(
                df["Yield_tons_per_hectare"]
                .mean()
            )
        )


    if "Rainfall_mm" in df.columns:

        agriculture_summary["average_rainfall"] = (
            float(
                df["Rainfall_mm"]
                .mean()
            )
        )


    if "Temperature_Celsius" in df.columns:

        agriculture_summary["average_temperature"] = (
            float(
                df["Temperature_Celsius"]
                .mean()
            )
        )


    if "Soil_Type" in df.columns:

        agriculture_summary["soil_distribution"] = (
            df["Soil_Type"]
            .value_counts()
            .to_dict()
        )

    return {

        "dataset": {

            "id": dataset.id,

            "filename": dataset.filename,

            "rows": len(df),

            "columns": len(df.columns),

            "column_names": list(df.columns)

        },


        "analysis": {

            "missing_values":
                analysis.missing_values
                if analysis else None,


            "duplicate_rows":
                analysis.duplicate_rows
                if analysis else None,


            "outliers":
                analysis.outliers
                if analysis else None

        },


        "statistics": statistics,


        "agriculture_summary": agriculture_summary,


        "charts": {

            "histogram":
                "/charts/histogram.png",

            "boxplot":
                "/charts/boxplot.png",

            "scatter":
                "/charts/scatter.png",

            "heatmap":
                "/charts/heatmap.png",

            "bar_chart":
                "/charts/bar_chart.png"

        },


        "report":

            f"/report/{dataset.filename.replace('.csv','_report.pdf')}"

    } 