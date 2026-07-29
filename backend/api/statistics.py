import numpy as np

def generate_statistics(df):
    """
    Generate descriptive statistics for all numeric columns.
    """

    numeric_df = df.select_dtypes(include=np.number)

    statistics = {}

    for column in numeric_df.columns:
        statistics[column] = {
            "mean": round(float(numeric_df[column].mean()), 2),
            "median": round(float(numeric_df[column].median()), 2),
            "std_dev": round(float(numeric_df[column].std()), 2),
            "minimum": round(float(numeric_df[column].min()), 2),
            "maximum": round(float(numeric_df[column].max()), 2)
        }

    return statistics