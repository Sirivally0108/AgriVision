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
            Upload an agricultural CSV dataset and let AgriVision
            automatically analyze your data, generate visualizations,
            create reports, and provide agricultural insights.
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

        <h1>What AgriVision Can Do</h1>

        <div className="feature-container">

          <div className="card">
            <h2>📂 Upload Dataset</h2>
            <p>
              Upload any supported agricultural CSV dataset
              and begin the analysis workflow.
            </p>

            <Link to="/upload">
              <button className="feature-btn">
                Upload
              </button>
            </Link>
          </div>


          <div className="card">
            <h2>📊 Data Analysis</h2>
            <p>
              Automatically inspect the uploaded dataset,
              including its structure, statistics, missing
              values, duplicates and data quality.
            </p>

            <Link to="/analysis">
              <button className="feature-btn">
                View Analysis
              </button>
            </Link>
          </div>


          <div className="card">
            <h2>📈 Visualizations</h2>
            <p>
              Explore generated charts such as histograms,
              scatter plots, heatmaps and box plots.
            </p>

            <Link to="/charts">
              <button className="feature-btn">
                View Charts
              </button>
            </Link>
          </div>


          <div className="card">
            <h2>📄 PDF Reports</h2>
            <p>
              Generate and download a report containing
              the analysis results for your uploaded dataset.
            </p>

            <Link to="/reports">
              <button className="feature-btn">
                View Reports
              </button>
            </Link>
          </div>


          <div className="card">
            <h2>🤖 AI Prediction</h2>
            <p>
              Use the machine-learning functionality to make
              predictions from agricultural data.
            </p>

            <Link to="/prediction">
              <button className="feature-btn">
                Prediction
              </button>
            </Link>
          </div>


          <div className="card">
            <h2>🌱 Agricultural Insights</h2>
            <p>
              Turn agricultural data into useful information
              that can support better farming decisions.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="cta">

        <h1>Ready to Analyze Your Agricultural Data?</h1>

        <p>
          Upload a CSV dataset and start exploring your data
          with AgriVision.
        </p>

        <Link to="/upload">
          <button className="upload-btn">
            Start Analysis
          </button>
        </Link>

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

            <Link to="/">
              Home
            </Link>

            <Link to="/upload">
              Upload Dataset
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/analysis">
              Analysis
            </Link>

            <Link to="/charts">
              Charts
            </Link>

            <Link to="/reports">
              Reports
            </Link>

            <Link to="/prediction">
              Prediction
            </Link>

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