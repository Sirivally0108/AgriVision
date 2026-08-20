from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter()


@router.get("/{filename}")
def download_report(filename: str):

    report_filename = filename.replace(".csv", "_report.pdf")

    path = os.path.join(
        "backend",
        "reports",
        report_filename
    )

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return FileResponse(
        path,
        media_type="application/pdf",
        filename=report_filename
    )