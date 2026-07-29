from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/{filename}")
def download_report(filename: str):

    path = f"backend/reports/{filename}"

    return FileResponse(
        path,
        media_type="application/pdf",
        filename=filename
    )