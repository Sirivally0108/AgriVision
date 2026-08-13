import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export default API;

// Upload Dataset
export const uploadDataset = (formData) =>
    API.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

// Dashboard
export const getDashboard = () =>
    API.get("/dashboard/dashboard");

// Analysis
export const getAnalysis = (id) =>
    API.get(`/analysis/${id}`);

// Reports
export const downloadReport = (filename) =>
    API.get(`/report/${filename}`);

// Prediction
export const predict = (data) =>
    API.post("/predict", data);