from sqlalchemy.orm import Session
from backend.database.models import UploadedDataset


def create_uploaded_dataset(db: Session, filename: str, filepath: str):

    dataset = UploadedDataset(
        filename=filename,
        filepath=filepath
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    return dataset
from backend.database.models import AnalysisHistory

def create_analysis_history(
    db,
    dataset_id,
    rows,
    columns,
    missing_values,
    duplicate_rows,
    outliers
):

    analysis = AnalysisHistory(
        dataset_id=dataset_id,
        rows=rows,
        columns=columns,
        missing_values=missing_values,
        duplicate_rows=duplicate_rows,
        outliers=outliers
    )

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis