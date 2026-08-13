import chartsBg from "../assets/charts.jpg";

function Charts() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${chartsBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: "1200px",
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
            fontSize: "42px",
            marginBottom: "35px",
          }}
        >
          Data Visualization
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          <ChartCard title="Histogram" />
          <ChartCard title="Scatter Plot" />
          <ChartCard title="Heatmap" />
          <ChartCard title="Box Plot" />
          <ChartCard title="Bar Chart" />
          <ChartCard title="Pie Chart" />
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.2)",
        borderRadius: "15px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>{title}</h2>

      <div
        style={{
          marginTop: "20px",
          height: "220px",
          borderRadius: "12px",
          background: "rgba(255,255,255,.25)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        📊 Chart will appear here
      </div>
    </div>
  );
}

export default Charts;