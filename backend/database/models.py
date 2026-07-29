from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from backend.database.database import Base

class UploadedDataset(Base):
    __tablename__ = "uploaded_datasets"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    filepath = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
from sqlalchemy import ForeignKey

class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)

    dataset_id = Column(Integer, ForeignKey("uploaded_datasets.id"))

    rows = Column(Integer)

    columns = Column(Integer)

    missing_values = Column(Integer)

    duplicate_rows = Column(Integer)

    outliers = Column(Integer)

    analyzed_at = Column(DateTime, default=datetime.utcnow)