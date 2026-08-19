import analysisBg from "../assets/analysis.jpg";

function Analysis() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${analysisBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1100px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px",
          color: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "42px",
          }}
        >
          Dataset Analysis
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <Card title="Missing Values" value="0" />
          <Card title="Duplicate Rows" value="2" />
          <Card title="Outliers" value="15" />
          <Card title="Mean" value="25.6" />
          <Card title="Median" value="24.8" />
          <Card title="Std Deviation" value="5.2" />
        </div>

        <div
          style={{
            marginTop: "40px",
            background: "rgba(255,255,255,.2)",
            borderRadius: "15px",
            padding: "25px",
          }}
        >
          <h2>Agriculture Summary</h2>

          <ul style={{ lineHeight: "2", marginTop: "15px" }}>
            <li>🌾 Most Common Crop : Rice</li>
            <li>🌱 Soil Type : Clay</li>
            <li>🌧 Average Rainfall : 1100 mm</li>
            <li>🌡 Average Temperature : 29°C</li>
            <li>🚜 Average Yield : 4.8 Tons/Hectare</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.2)",
        padding: "25px",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export default Analysis;