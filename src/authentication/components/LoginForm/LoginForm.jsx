import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { loginUser } from "../../../services/authService";

import Typography from "../../../components/common/Typography";
import Input from "../../../components/common/Input";
import PasswordInput from "../../../components/common/PasswordInput";
import Checkbox from "../../../components/common/Checkbox";
import Button from "../../../components/common/Button";

import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]   = useState("");
  const [remember, setRemember]   = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({
        email: identifier,
        username: identifier,
        identifier: identifier,
        password: password
      });

      // Extract user info and token from response
      const user = data.user || {
        id: data.id || 1,
        name: data.name || "Admin",
        email: data.email || identifier,
        role: data.role || "Super Admin",
        avatar: data.avatar || "https://i.pravatar.cc/150?img=5"
      };
      
      const token = data.token || data.accessToken || data.jwt;

      if (token) {
        localStorage.setItem("token", token);
      }

      login(user, remember);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      // If it is a network error (e.g. backend server is not running or CORS blocked)
      const isNetworkError = err.message === "Network Error" || !err.response;
      
      if (isNetworkError && identifier === "admin@reminder.com" && password === "admin123") {
        const mockUser = {
          id: 1,
          name: "Admin (Offline Mode)",
          email: "admin@reminder.com",
          role: "Super Admin",
          avatar: "https://i.pravatar.cc/150?img=5"
        };
        login(mockUser, remember);
        navigate("/dashboard", { replace: true });
        return;
      }

      setError(
        isNetworkError 
          ? "Network Error: Could not connect to API server at http://localhost:5000. Please start your backend server, or log in with admin@reminder.com / admin123 to use offline mode."
          : (err.response?.data?.message || err.message || "Invalid credentials.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h2">
        Welcome Back 👋
      </Typography>

      <Typography color="secondary" className="subtitle">
        Sign in to continue to Reminder Admin
      </Typography>

      {error && (
        <div className="login-error" role="alert">
          {error}
        </div>
      )}

      <Input
        label="Email or Phone"
        placeholder="admin@reminder.com"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
        id="login-identifier"
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        id="login-password"
      />

      <div className="login-options">
        <Checkbox
          label="Remember Me"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          id="login-remember"
        />

        <button type="button" className="forgot-btn">
          Forgot Password?
        </button>
      </div>

      <Button fullWidth type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Login"}
      </Button>

      <Typography
        variant="caption"
        color="secondary"
        align="center"
        className="version"
      >
        Version 1.0.0
      </Typography>
    </form>
  );
}
