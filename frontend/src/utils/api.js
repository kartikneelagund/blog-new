// Axios instance with baseURL + token header from localStorage
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token if present (also set in AuthContext)
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default api;
