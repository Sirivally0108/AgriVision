def calculate_quality_score(
    missing_values,
    duplicate_rows,
    outliers
):

    score = 100

    score -= sum(missing_values.values())

    score -= duplicate_rows

    score -= sum(outliers.values()) // 10

    if score < 0:
        score = 0

    if score >= 90:
        status = "Excellent"

    elif score >= 75:
        status = "Good"

    elif score >= 50:
        status = "Average"

    else:
        status = "Poor"

    return {
        "score": score,
        "status": status
    }