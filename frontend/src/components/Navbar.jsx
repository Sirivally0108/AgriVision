import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#2E7D32",
        padding: "15px",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>

      <Link to="/upload" style={{ color: "white", textDecoration: "none" }}>
        Upload Dataset
      </Link>

      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>

      <Link to="/charts" style={{ color: "white", textDecoration: "none" }}>
        Charts
      </Link>

      <Link to="/reports" style={{ color: "white", textDecoration: "none" }}>
        Reports
      </Link>

      <Link
        to="/prediction"
        style={{ color: "white", textDecoration: "none" }}
      >
        Prediction
      </Link>
    </nav>
  );
}

export default Navbar;