import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

import Typography from "../../../components/common/Typography";
import Input from "../../../components/common/Input";
import PasswordInput from "../../../components/common/PasswordInput";
import Checkbox from "../../../components/common/Checkbox";
import Button from "../../../components/common/Button";

import "./LoginForm.css";

// Mock credentials — swap for real API call when backend is ready
const MOCK_USERS = [
  {
    id: 1,
    name: "Admin",
    email: "admin@reminder.com",
    phone: "9999999999",
    role: "Super Admin",
    avatar: "https://i.pravatar.cc/150?img=5",
    password: "admin123",
  },
];

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

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const found = MOCK_USERS.find(
      (u) =>
        (u.email === identifier || u.phone === identifier) &&
        u.password === password
    );

    if (found) {
      const { password: _pw, ...safeUser } = found;
      login(safeUser, remember);
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email/phone or password. Try admin@reminder.com / admin123");
    }

    setLoading(false);
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
