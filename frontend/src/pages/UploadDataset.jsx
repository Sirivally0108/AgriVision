import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadBg from "../assets/upload.jpg";
import { uploadDataset } from "../services/api";

function UploadDataset() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setMessage("");
      return;
    }

    // Only allow CSV files
    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setFile(null);
      setMessage("❌ Please select a CSV file.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a CSV file first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("Uploading dataset...");

      // Create multipart/form-data
      const formData = new FormData();

      // IMPORTANT:
      // "file" must match the parameter name expected by FastAPI
      formData.append("file", file);

      // Send file to FastAPI
      const response = await uploadDataset(formData);

      console.log("Upload response:", response.data);

      setMessage("✅ Dataset uploaded successfully!");

      // Give user a moment to see success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("Upload error:", error);

      if (error.response) {
        console.error("Backend response:", error.response.data);

        const detail = error.response.data?.detail;

        if (detail) {
          setMessage(`❌ Upload failed: ${detail}`);
        } else {
          setMessage(
            `❌ Upload failed. Server returned ${error.response.status}.`
          );
        }
      } else if (error.request) {
        setMessage(
          "❌ Could not connect to the backend. Make sure FastAPI is running."
        );
      } else {
        setMessage("❌ Upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
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
          url(${uploadBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "500px",
          maxWidth: "100%",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(12px)",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,.25)",
        }}
      >
        <h1>Upload Dataset</h1>

        <p style={{ marginBottom: "25px" }}>
          Select a CSV dataset to upload and analyze.
        </p>

        {/* File selector */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={uploading}
          style={{
            width: "100%",
            padding: "10px",
            background: "white",
            color: "black",
            borderRadius: "8px",
            border: "none",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        />

        {/* Selected file */}
        {file && (
          <p
            style={{
              marginTop: "15px",
              fontSize: "14px",
              wordBreak: "break-word",
            }}
          >
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        <br />

        {/* Upload button */}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            padding: "12px 30px",
            background:
              !file || uploading
                ? "#777"
                : "#2E7D32",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor:
              !file || uploading
                ? "not-allowed"
                : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            minWidth: "150px",
          }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <br />
        <br />

        {/* Status message */}
        {message && (
          <h3
            style={{
              fontSize: "16px",
              marginTop: "15px",
            }}
          >
            {message}
          </h3>
        )}
      </div>
    </div>
  );
}

export default UploadDataset;