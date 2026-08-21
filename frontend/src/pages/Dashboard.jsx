import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardBg from "../assets/dashboard.jpg";
import { getDashboard } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDashboard();

        console.log("Dashboard API response:", response.data);

        setDashboardData(response.data);
      } catch (err) {
        console.error("Dashboard error:", err);

        if (err.response) {
          setError(
            `Failed to load dashboard (${err.response.status})`
          );
        } else {
          setError(
            "Could not connect to the backend. Make sure FastAPI is running."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /*
   * We don't hardcode dashboard numbers.
   *
   * The backend response is displayed below temporarily so
   * we can match the cards to your actual API response.
   */

  const renderValue = (value) => {
    if (value === null || value === undefined) {
      return "—";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,.45),
            rgba(0,0,0,.45)
          ),
          url(${dashboardBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
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
          boxShadow: "0 8px 32px rgba(0,0,0,.25)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "42px",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            opacity: 0.9,
          }}
        >
          Dataset analysis overview
        </p>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              fontSize: "18px",
            }}
          >
            Loading dashboard...
          </div>
        )}

        {error && (
          <div
            style={{
              background: "rgba(255,0,0,.2)",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h3>{error}</h3>

            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && dashboardData && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
              }}
            >
              {Object.entries(dashboardData).map(
                ([key, value]) => (
                  <div
                    key={key}
                    style={{
                      background: "rgba(255,255,255,.2)",
                      padding: "25px",
                      borderRadius: "15px",
                      textAlign: "center",
                      minHeight: "130px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "20px",
                        marginBottom: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      {key.replace(/_/g, " ")}
                    </h2>

                    <h1
                      style={{
                        fontSize: "30px",
                        margin: 0,
                        wordBreak: "break-word",
                      }}
                    >
                      {renderValue(value)}
                    </h1>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "30px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => navigate("/analysis")}
                style={{
                  padding: "12px 25px",
                  background: "#2E7D32",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                View Analysis
              </button>

              <button
                onClick={() => navigate("/charts")}
                style={{
                  padding: "12px 25px",
                  background: "#388E3C",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                View Charts
              </button>

              <button
                onClick={() => navigate("/reports")}
                style={{
                  padding: "12px 25px",
                  background: "#43A047",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                View Reports
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;