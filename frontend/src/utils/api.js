import axios from "axios";

// ==================================
// Axios Setup
// ==================================

// ✅ Use env variable if available, otherwise fallback to localhost
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://blog-new-bakend.vercel.app/api",
});

// ✅ Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================================
// Auth API
// ==================================

// Login
export const login = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data; // contains { token, user }
};

// Signup
export const signup = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Get user profile (protected)
export const getUserProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

// ==================================
// Blogs API
// ==================================

// Get all blogs
export const getAllBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

// Create a new blog
export const createBlog = async (blogData) => {
  const res = await api.post("/blogs", blogData);
  return res.data;
};

// Delete a blog
export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

// ==================================
// Users API
// ==================================

// ✅ Axios version (recommended)
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// ⚠️ Fetch version (alternative)
const API_URL = import.meta.env.VITE_API_URL || "https://blog-new-bakend.vercel.app/api";

export async function getUsersFetch() {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export default api;
