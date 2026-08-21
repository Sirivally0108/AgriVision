import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default API;

export const uploadDataset = (formData) =>
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getDashboard = () =>
  API.get("/dashboard/dashboard");

export const getAnalysis = (id) =>
  API.get(`/analysis/${id}`);

export const downloadReport = (filename) =>
  API.get(`/report/${filename}`);

export const getPredictionSchema = (filename) =>
    API.get(`/predict/schema/${encodeURIComponent(filename)}`);

export const predict = (data) =>
  API.post("/predict", data);