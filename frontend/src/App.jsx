import { Routes, Route } from "react-router-dom";
import Analysis from "./pages/Analysis";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UploadDataset from "./pages/UploadDataset";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import Reports from "./pages/Reports";
import Prediction from "./pages/Prediction";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadDataset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </>
  );
}

export default App;