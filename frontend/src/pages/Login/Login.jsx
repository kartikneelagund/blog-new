import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import "./Login.css";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth(); // context login function
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle input changes
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      const { token, isAdmin } = res.data;

      if (!token) {
        setError("Login failed: token missing from server response");
        return;
      }

      // Save token in context and localStorage
      login(token);
      localStorage.setItem("token", token);

      // Redirect based on role
      if (isAdmin) {
        navigate("/admin"); // admin dashboard
      } else {
        navigate("/profile"); // regular user profile
      }
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Login failed, please try again"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="error">{error}</div>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
