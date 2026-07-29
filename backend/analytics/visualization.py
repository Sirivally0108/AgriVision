
import pandas as pd
import os
import matplotlib.pyplot as plt

def generate_histogram(df, dataset_id):

    chart_folder = os.path.join(
        "backend",
        "charts",
        f"dataset_{dataset_id}"
    )

    os.makedirs(chart_folder, exist_ok=True)

    path = os.path.join(chart_folder, "histogram.png")

    df.hist(figsize=(10, 8))

    plt.savefig(path)

    plt.close()

    return path


# -----------------------------
# Box Plot
# -----------------------------
def generate_boxplot(df, dataset_id):

    chart_folder = os.path.join(
        "backend",
        "charts",
        f"dataset_{dataset_id}"
    )

    os.makedirs(chart_folder, exist_ok=True)

    numeric_columns = df.select_dtypes(include="number").columns

    if len(numeric_columns) == 0:
        return None

    plt.figure(figsize=(8,5))

    df[numeric_columns].boxplot()

    plt.title("Box Plot")

    path = os.path.join(chart_folder, "boxplot.png")

    plt.savefig(path)

    plt.close()

    return path
def generate_scatter(df, dataset_id):

    chart_folder = os.path.join(
        "backend",
        "charts",
        f"dataset_{dataset_id}"
    )

    os.makedirs(chart_folder, exist_ok=True)

    numeric_columns = df.select_dtypes(include="number").columns

    if len(numeric_columns) < 2:
        return None

    plt.figure(figsize=(8,5))

    plt.scatter(
        df[numeric_columns[0]],
        df[numeric_columns[1]]
    )

    plt.xlabel(numeric_columns[0])
    plt.ylabel(numeric_columns[1])

    plt.title("Scatter Plot")

    path = os.path.join(chart_folder, "scatter.png")

    plt.savefig(path)

    plt.close()

    return path
# -----------------------------
# Correlation Heatmap
# -----------------------------
def generate_heatmap(df, dataset_id):

    chart_folder = os.path.join(
        "backend",
        "charts",
        f"dataset_{dataset_id}"
    )

    os.makedirs(chart_folder, exist_ok=True)

    numeric_df = df.select_dtypes(include="number")

    if numeric_df.shape[1] < 2:
        return None

    correlation = numeric_df.corr()

    plt.figure(figsize=(8,6))

    plt.imshow(correlation)

    plt.xticks(
        range(len(correlation.columns)),
        correlation.columns,
        rotation=90
    )

    plt.yticks(
        range(len(correlation.columns)),
        correlation.columns
    )

    plt.colorbar()

    plt.title("Correlation Heatmap")

    path = os.path.join(chart_folder, "heatmap.png")

    plt.savefig(path, bbox_inches="tight")

    plt.close()

    return path
# -----------------------------
# Bar Chart
# -----------------------------
def generate_bar_chart(df, dataset_id):

    chart_folder = os.path.join(
        "backend",
        "charts",
        f"dataset_{dataset_id}"
    )

    os.makedirs(chart_folder, exist_ok=True)

    numeric_columns = df.select_dtypes(include="number").columns

    if len(numeric_columns) == 0:
        return None

    means = df[numeric_columns].mean()

    plt.figure(figsize=(8,5))

    means.plot(kind="bar")

    plt.title("Average Value of Numeric Features")

    plt.ylabel("Mean")

    path = os.path.join(chart_folder, "bar_chart.png")

    plt.savefig(path)

    plt.close()

    return path