from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet

from datetime import datetime
import os



def generate_report(
    dataset_id,
    filename,
    rows,
    columns,
    missing_values,
    duplicate_rows,
    outliers,
    statistics,
    agriculture_summary
):

    report_folder = os.path.join(
        "backend",
        "reports",
        f"dataset_{dataset_id}"
    )

    os.makedirs(report_folder, exist_ok=True)

    report_path = os.path.join(
        report_folder,
        filename.replace(".csv", "_report.pdf")
    )


    doc = SimpleDocTemplate(report_path)


    styles = getSampleStyleSheet()


    elements = []


    # =========================
    # TITLE
    # =========================

    elements.append(
        Paragraph(
            "AgriVision Dataset Analysis Report",
            styles["Title"]
        )
    )


    elements.append(
        Paragraph(
            f"Generated Date: {datetime.now().strftime('%d-%m-%Y %H:%M:%S')}",
            styles["BodyText"]
        )
    )


    elements.append(
        Spacer(1,20)
    )


    # =========================
    # DATASET SUMMARY
    # =========================


    elements.append(
        Paragraph(
            "Dataset Summary",
            styles["Heading2"]
        )
    )


    summary_data = [

        ["Property","Value"],

        ["Dataset Name",filename],

        ["Total Rows",rows],

        ["Total Columns",columns],

        ["Duplicate Rows",duplicate_rows]

    ]


    summary_table = Table(summary_data)


    summary_table.setStyle(
        TableStyle([

            ("GRID",
             (0,0),
             (-1,-1),
             1,
             colors.black)

        ])
    )


    elements.append(summary_table)


    elements.append(
        Spacer(1,20)
    )



    # =========================
    # MISSING VALUES
    # =========================


    elements.append(
        Paragraph(
            "Missing Value Analysis",
            styles["Heading2"]
        )
    )


    missing_data = [
        [
            "Column",
            "Missing Count"
        ]
    ]


    for key,value in missing_values.items():

        missing_data.append(
            [
                key,
                str(value)
            ]
        )


    missing_table = Table(missing_data)


    missing_table.setStyle(
        TableStyle([

            ("GRID",
             (0,0),
             (-1,-1),
             1,
             colors.black)

        ])
    )


    elements.append(missing_table)


    elements.append(
        Spacer(1,20)
    )



    # =========================
    # OUTLIERS
    # =========================


    elements.append(
        Paragraph(
            "Outlier Analysis",
            styles["Heading2"]
        )
    )


    outlier_data = [

        [
            "Column",
            "Outlier Count"
        ]

    ]


    for key,value in outliers.items():

        outlier_data.append(
            [
                key,
                str(value)
            ]
        )


    outlier_table = Table(outlier_data)


    outlier_table.setStyle(
        TableStyle([

            ("GRID",
             (0,0),
             (-1,-1),
             1,
             colors.black)

        ])
    )


    elements.append(outlier_table)


    elements.append(
        Spacer(1,20)
    )



    # =========================
    # STATISTICAL SUMMARY
    # =========================


    elements.append(
        Paragraph(
            "Statistical Summary",
            styles["Heading2"]
        )
    )


    stat_data = [

        [
            "Feature",
            "Mean",
            "Median",
            "Std",
            "Min",
            "Max"
        ]

    ]


    for feature,values in statistics.items():

        stat_data.append(

            [

                feature,

                values.get("mean"),

                values.get("median"),

                values.get("std"),

                values.get("min"),

                values.get("max")

            ]

        )


    stat_table = Table(stat_data)


    stat_table.setStyle(
        TableStyle([

            ("GRID",
             (0,0),
             (-1,-1),
             1,
             colors.black)

        ])
    )


    elements.append(stat_table)


    elements.append(
        Spacer(1,20)
    )



    # =========================
    # AGRICULTURE INSIGHTS
    # =========================


    elements.append(
        Paragraph(
            "Agriculture Insights",
            styles["Heading2"]
        )
    )


    for key,value in agriculture_summary.items():

        elements.append(

            Paragraph(

                f"{key}: {value}",

                styles["BodyText"]

            )

        )



    elements.append(
        Spacer(1,20)
    )



    # =========================
    # EDA CHARTS
    # =========================


    elements.append(
        Paragraph(
            "EDA Visualizations",
            styles["Heading2"]
        )
    )


    chart_folder = "backend/charts"


    charts = [

        "histogram.png",

        "boxplot.png",

        "scatter.png",

        "heatmap.png",

        "bar_chart.png"

    ]



    for chart in charts:


        chart_path = os.path.join(
            chart_folder,
            chart
        )


        if os.path.exists(chart_path):


            elements.append(

                Paragraph(

                    chart.replace(".png","")
                    .replace("_"," ")
                    .title(),

                    styles["Heading3"]

                )

            )


            img = Image(chart_path)


            img.drawWidth = 400

            img.drawHeight = 250


            elements.append(img)


            elements.append(
                Spacer(1,20)
            )



    doc.build(elements)


    return report_path