// src/utils/api.js
import axios from "axios";

// You can change this baseURL to your backend server URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend API endpoint
});

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
