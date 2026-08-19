import predictionBg from "../assets/prediction.jpg";

function Prediction() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${predictionBg})`,
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
          width: "95%",
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
          🌾 Crop Yield Prediction
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
          }}
        >
          {/* Form */}

          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2>Prediction Details</h2>

            <br />

            <label>Crop Name</label>

            <input style={input} placeholder="Rice" />

            <label>Soil Type</label>

            <select style={input}>
              <option>Clay</option>
              <option>Loamy</option>
              <option>Sandy</option>
              <option>Black Soil</option>
            </select>

            <label>Rainfall (mm)</label>

            <input
              type="number"
              style={input}
              placeholder="1200"
            />

            <label>Temperature (°C)</label>

            <input
              type="number"
              style={input}
              placeholder="28"
            />

            <label>Humidity (%)</label>

            <input
              type="number"
              style={input}
              placeholder="75"
            />

            <label>Fertilizer Used</label>

            <input
              style={input}
              placeholder="Organic"
            />

            <button
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                background: "#2E7D32",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Predict Yield
            </button>
          </div>

          {/* Result */}

          <div
            style={{
              background: "rgba(255,255,255,.2)",
              padding: "25px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Prediction Result</h2>

            <br />

            <h1 style={{ fontSize: "55px" }}>
              🌾 4.8
            </h1>

            <h2>Tons / Hectare</h2>

            <br />

            <p>
              Crop : Rice
            </p>

            <p>
              Soil : Clay
            </p>

            <p>
              Yield Quality : Excellent
            </p>

            <br />

            <div
              style={{
                background: "#2E7D32",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              AI Recommendation

              <br /><br />

              Continue current farming
              practices for maximum yield.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
};

export default Prediction;