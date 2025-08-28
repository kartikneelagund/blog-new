import axios from "axios";

// ✅ Base URL should point to API root, not a specific endpoint
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================
// Blogs API
// ==========================
export const getAllBlogs = async () => {
  const res = await api.get("/blogs"); // baseURL + /blogs
  return res.data;
};

export default api;
