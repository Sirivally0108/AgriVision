import pandas as pd


def agriculture_summary(filepath):

    df = pd.read_csv(filepath)


    result = {

        "total_records": len(df),

        "most_common_crop":
            df["Crop"].mode()[0],

        "most_common_soil":
            df["Soil_Type"].mode()[0],

        "average_yield":
            round(
                df["Yield_tons_per_hectare"].mean(),
                2
            ),

        "maximum_yield":
            round(
                df["Yield_tons_per_hectare"].max(),
                2
            ),

        "minimum_yield":
            round(
                df["Yield_tons_per_hectare"].min(),
                2
            ),

        "average_rainfall":
            round(
                df["Rainfall_mm"].mean(),
                2
            ),

        "average_temperature":
            round(
                df["Temperature_Celsius"].mean(),
                2
            )
    }


    return result