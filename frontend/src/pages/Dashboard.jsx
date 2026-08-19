import dashboardBg from "../assets/dashboard.jpg";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${dashboardBg})`,
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
          maxWidth: "1000px",
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
          Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Datasets</h2>
            <h1>10</h1>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Reports</h2>
            <h1>8</h1>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Charts</h2>
            <h1>12</h1>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Prediction</h2>
            <h1>95%</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;