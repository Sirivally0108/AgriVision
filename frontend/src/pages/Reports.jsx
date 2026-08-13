import reportsBg from "../assets/reports.jpg";

function Reports() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${reportsBg})`,
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
            fontSize: "42px",
            marginBottom: "35px",
          }}
        >
          Reports
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
          }}
        >
          <ReportCard
            title="Crop Analysis Report"
            description="Complete analysis of uploaded agricultural dataset."
          />

          <ReportCard
            title="Soil Report"
            description="Soil statistics and quality report."
          />

          <ReportCard
            title="Yield Report"
            description="Average yield and crop performance."
          />

          <ReportCard
            title="Weather Report"
            description="Rainfall and temperature statistics."
          />
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, description }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.2)",
        borderRadius: "15px",
        padding: "25px",
        textAlign: "center",
      }}
    >
      <h2>{title}</h2>

      <p
        style={{
          marginTop: "15px",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>

      <button
        style={{
          marginTop: "25px",
          padding: "12px 30px",
          border: "none",
          borderRadius: "10px",
          background: "#2E7D32",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default Reports;