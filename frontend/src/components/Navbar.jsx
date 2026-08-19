import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaChartBar,
  FaSearch,
  FaChartPie,
  FaFilePdf,
  FaRobot,
  FaLeaf,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/upload", name: "Upload", icon: <FaUpload /> },
    { path: "/dashboard", name: "Dashboard", icon: <FaChartBar /> },
    { path: "/analysis", name: "Analysis", icon: <FaSearch /> },
    { path: "/charts", name: "Charts", icon: <FaChartPie /> },
    { path: "/reports", name: "Reports", icon: <FaFilePdf /> },
    { path: "/prediction", name: "Prediction", icon: <FaRobot /> },
  ];

  return (
    <nav
      style={{
        background: "linear-gradient(90deg,#2E7D32,#43A047)",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 3px 15px rgba(0,0,0,.3)",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaLeaf />
        AgriVision
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              padding: "10px 16px",
              borderRadius: "10px",
              background:
                location.pathname === item.path
                  ? "#1B5E20"
                  : "transparent",
              transition: "0.3s",
              fontWeight: "bold",
            }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;