import pandas as pd
import numpy as np

def load_dataset(file_path):
    """
    Load CSV dataset.
    """
    return pd.read_csv(file_path)


def check_missing_values(df):
    """
    Returns missing value count for each column.
    """
    return df.isnull().sum().to_dict()


def count_duplicate_rows(df):
    """
    Returns total duplicate rows.
    """
    return int(df.duplicated().sum())
def detect_outliers(df):
    """
    Detect outliers in numeric columns using the IQR method.
    Returns the number of outliers in each numeric column.
    """

    outlier_counts = {}

    numeric_columns = df.select_dtypes(include=np.number).columns

    for column in numeric_columns:

        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)

        IQR = Q3 - Q1

        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR

        outliers = df[(df[column] < lower) | (df[column] > upper)]

        outlier_counts[column] = len(outliers)

    return outlier_counts