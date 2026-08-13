import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div>

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="overlay">

          <h1>🌾 AgriVision</h1>

          <h2>AI Powered Smart Agriculture Platform</h2>

          <p>
            Upload agricultural datasets, generate analytics,
            visualize crop insights, download reports and
            predict crop yield using Artificial Intelligence.
          </p>

          <Link to="/upload">
            <button className="upload-btn">
              Upload Dataset
            </button>
          </Link>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="features">

        <h1>Our Features</h1>

        <div className="feature-container">

          <div className="card">
            <h2>📂 Upload Dataset</h2>
            <p>
              Upload agriculture datasets securely into
              the AgriVision platform.
            </p>
          </div>

          <div className="card">
            <h2>📊 Smart Analysis</h2>
            <p>
              Automatic statistical analysis of crop,
              rainfall and soil data.
            </p>
          </div>

          <div className="card">
            <h2>📈 Interactive Charts</h2>
            <p>
              Generate Histogram, Scatter Plot,
              Heatmap and Box Plot instantly.
            </p>
          </div>

          <div className="card">
            <h2>📄 PDF Reports</h2>
            <p>
              Download complete agricultural reports
              with one click.
            </p>
          </div>

          <div className="card">
            <h2>🤖 AI Prediction</h2>
            <p>
              Predict crop yield using Machine Learning
              models.
            </p>
          </div>

          <div className="card">
            <h2>🌱 Sustainable Farming</h2>
            <p>
              Improve farming decisions through
              intelligent analytics.
            </p>
          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE ================= */}

      <section className="why">

        <h1>Why Choose AgriVision?</h1>

        <div className="why-grid">

          <div className="why-card">
            🚜<br />
            Modern Farming
          </div>

          <div className="why-card">
            📊<br />
            Data Analytics
          </div>

          <div className="why-card">
            🌦<br />
            Weather Insights
          </div>

          <div className="why-card">
            🌾<br />
            Crop Management
          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="stat-box">
          <h2>500+</h2>
          <p>Datasets Processed</p>
        </div>

        <div className="stat-box">
          <h2>1200+</h2>
          <p>Charts Generated</p>
        </div>

        <div className="stat-box">
          <h2>350+</h2>
          <p>Reports Created</p>
        </div>

        <div className="stat-box">
          <h2>98%</h2>
          <p>Prediction Accuracy</p>
        </div>

      </section>
            {/* ================= WORKFLOW ================= */}

      <section className="workflow">

        <h1>How AgriVision Works</h1>

        <div className="workflow-container">

          <div className="step">
            <div className="circle">1</div>
            <h3>Upload Dataset</h3>
            <p>
              Upload agriculture CSV files securely.
            </p>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <div className="circle">2</div>
            <h3>Analyze Data</h3>
            <p>
              Automatic preprocessing and statistical analysis.
            </p>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <div className="circle">3</div>
            <h3>Generate Charts</h3>
            <p>
              Histograms, Heatmaps, Scatter Plots and more.
            </p>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <div className="circle">4</div>
            <h3>Download Report</h3>
            <p>
              Get complete PDF reports instantly.
            </p>
          </div>

          <div className="arrow">➜</div>

          <div className="step">
            <div className="circle">5</div>
            <h3>Predict Yield</h3>
            <p>
              AI predicts crop yield for better decisions.
            </p>
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer>

        <div className="footer-container">

          <div>

            <h2>🌾 AgriVision</h2>

            <p>
              AI Powered Sustainable Agriculture Analytics Platform.
            </p>

          </div>

          <div>

            <h3>Quick Links</h3>

            <p>Home</p>
            <p>Upload Dataset</p>
            <p>Dashboard</p>
            <p>Analysis</p>
            <p>Charts</p>
            <p>Reports</p>

          </div>

          <div>

            <h3>Technology</h3>

            <p>React</p>
            <p>FastAPI</p>
            <p>SQLite</p>
            <p>Machine Learning</p>

          </div>

        </div>

        <hr />

        <p className="copyright">
          © 2026 AgriVision | Artificial Intelligence & Data Science
        </p>

      </footer>

    </div>
  );
}

export default Home;