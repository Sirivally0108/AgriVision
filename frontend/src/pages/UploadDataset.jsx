import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadBg from "../assets/upload.jpg";
import { uploadDataset } from "../services/api";

function UploadDataset() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    try {
      const response = await uploadDataset(file);

      console.log(response.data);

      setMessage("✅ Dataset Uploaded Successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error(error);
      setMessage("❌ Upload Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url(${uploadBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Upload Dataset</h1>

        <br />

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        <button
          onClick={handleUpload}
          style={{
            padding: "12px 30px",
            background: "#2E7D32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Upload
        </button>

        <br />
        <br />

        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default UploadDataset;