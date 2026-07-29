from backend.database.database import SessionLocal
from backend.database.models import AnalysisHistory


db = SessionLocal()


records = db.query(AnalysisHistory).all()


for r in records:

    print(
        "ID:",
        r.id,
        "Dataset:",
        r.dataset_id,
        "Rows:",
        r.rows,
        "Columns:",
        r.columns,
        "Missing:",
        r.missing_values,
        "Duplicates:",
        r.duplicate_rows,
        "Outliers:",
        r.outliers
    )