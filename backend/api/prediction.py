from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path

import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error


router = APIRouter()

UPLOAD_DIR = Path("backend/uploads").resolve()


class PredictionRequest(BaseModel):
    filename: str
    target_column: str
    features: dict


def get_dataset_path(filename: str) -> Path:
    """
    Safely locate a dataset inside backend/uploads.
    """

    path = (UPLOAD_DIR / filename).resolve()

    if not str(path).startswith(str(UPLOAD_DIR)):
        raise HTTPException(
            status_code=400,
            detail="Invalid dataset path"
        )

    if not path.exists():
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )

    if path.suffix.lower() != ".csv":
        raise HTTPException(
            status_code=400,
            detail="Only CSV datasets are supported"
        )

    return path


@router.get("/predict/schema/{filename}")
def get_prediction_schema(filename: str):

    path = get_dataset_path(filename)

    try:
        df = pd.read_csv(path)

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="Dataset is empty"
            )

        columns = []

        for column in df.columns:

            dtype = str(df[column].dtype)

            columns.append({
                "name": column,
                "dtype": dtype,
                "numeric": pd.api.types.is_numeric_dtype(df[column]),
                "missing": int(df[column].isna().sum()),
                "unique": int(df[column].nunique())
            })

        numeric_columns = [
            column
            for column in df.columns
            if pd.api.types.is_numeric_dtype(df[column])
        ]

        return {
            "filename": filename,
            "rows": len(df),
            "columns": columns,
            "numeric_columns": numeric_columns
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Could not read dataset: {str(e)}"
        )


@router.post("/predict")
def predict(request: PredictionRequest):

    path = get_dataset_path(request.filename)

    try:

        df = pd.read_csv(path)

        if request.target_column not in df.columns:
            raise HTTPException(
                status_code=400,
                detail=f"Target column '{request.target_column}' not found"
            )

        # Target must be numeric for regression
        target = pd.to_numeric(
            df[request.target_column],
            errors="coerce"
        )

        valid_rows = target.notna()

        df = df.loc[valid_rows].copy()
        target = target.loc[valid_rows]

        if len(df) < 10:
            raise HTTPException(
                status_code=400,
                detail="Dataset must contain at least 10 valid rows"
            )

        X = df.drop(columns=[request.target_column])
        y = target

        # Remove columns that are completely empty
        X = X.dropna(axis=1, how="all")

        if X.shape[1] == 0:
            raise HTTPException(
                status_code=400,
                detail="No usable feature columns found"
            )

        numeric_features = X.select_dtypes(
            include=["number"]
        ).columns.tolist()

        categorical_features = X.select_dtypes(
            exclude=["number"]
        ).columns.tolist()

        numeric_pipeline = Pipeline(
            steps=[
                (
                    "imputer",
                    SimpleImputer(strategy="median")
                )
            ]
        )

        categorical_pipeline = Pipeline(
            steps=[
                (
                    "imputer",
                    SimpleImputer(strategy="most_frequent")
                ),
                (
                    "encoder",
                    OneHotEncoder(
                        handle_unknown="ignore"
                    )
                )
            ]
        )

        transformers = []

        if numeric_features:
            transformers.append(
                (
                    "numeric",
                    numeric_pipeline,
                    numeric_features
                )
            )

        if categorical_features:
            transformers.append(
                (
                    "categorical",
                    categorical_pipeline,
                    categorical_features
                )
            )

        preprocessor = ColumnTransformer(
            transformers=transformers
        )

        model = RandomForestRegressor(
            n_estimators=200,
            random_state=42,
            n_jobs=-1
        )

        pipeline = Pipeline(
            steps=[
                (
                    "preprocessor",
                    preprocessor
                ),
                (
                    "model",
                    model
                )
            ]
        )

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42
        )

        pipeline.fit(X_train, y_train)

        predictions = pipeline.predict(X_test)

        r2 = r2_score(y_test, predictions)
        mae = mean_absolute_error(y_test, predictions)

        # Build one-row input for prediction
        input_data = {}

        for column in X.columns:

            if column in request.features:
                input_data[column] = request.features[column]

            else:
                # Use median for numeric columns
                if pd.api.types.is_numeric_dtype(X[column]):

                    input_data[column] = float(
                        X[column].median()
                    )

                else:

                    mode = X[column].mode()

                    if len(mode) > 0:
                        input_data[column] = mode.iloc[0]
                    else:
                        input_data[column] = ""

        input_df = pd.DataFrame([input_data])

        prediction = pipeline.predict(input_df)[0]

        return {
            "success": True,
            "dataset": request.filename,
            "target_column": request.target_column,
            "prediction": float(prediction),
            "model": "Random Forest Regressor",
            "metrics": {
                "r2_score": float(r2),
                "mae": float(mae)
            },
            "features_used": list(X.columns)
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Prediction failed: {str(e)}"
        )