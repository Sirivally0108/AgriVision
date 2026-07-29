def map_columns(df):

    column_mapping = {

        "Crop": [
            "crop",
            "crop_name",
            "crop_type"
        ],

        "Soil_Type": [
            "soil",
            "soil_type",
            "soil_category"
        ],

        "Rainfall_mm": [
            "rainfall",
            "rainfall_mm",
            "annual_rainfall"
        ],

        "Temperature_Celsius": [
            "temperature",
            "temp",
            "temperature_celsius"
        ],

        "Yield_tons_per_hectare": [
            "yield",
            "production",
            "yield_tons",
            "yield_tons_per_hectare"
        ]

    }


    rename_columns = {}


    for standard_name, possible_names in column_mapping.items():

        for col in df.columns:

            if col.lower() in possible_names:

                rename_columns[col] = standard_name


    df = df.rename(
        columns=rename_columns
    )


    return df