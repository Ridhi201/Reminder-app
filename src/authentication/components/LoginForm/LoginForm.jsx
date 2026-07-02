import { useState } from "react";

import Typography from "../../../components/common/Typography";
import Input from "../../../components/common/Input";
import PasswordInput from "../../../components/common/PasswordInput";
import Checkbox from "../../../components/common/Checkbox";
import Button from "../../../components/common/Button";

import "./LoginForm.css";

export default function LoginForm() {

  const [remember, setRemember] = useState(false);

  return (

    <div className="login-form">

      <Typography variant="h2">
        Welcome Back 👋
      </Typography>

      <Typography
        color="secondary"
        className="subtitle"
      >
        Sign in to continue to Reminder Admin
      </Typography>

      <Input
        label="Email or Phone"
        placeholder="Enter email or phone number"
        required
      />

      <PasswordInput
        label="Password"
        required
      />

      <div className="login-options">

        <Checkbox
          label="Remember Me"
          checked={remember}
          onChange={(e)=>setRemember(e.target.checked)}
        />

        <button className="forgot-btn">
          Forgot Password?
        </button>

      </div>

      <Button
        fullWidth
      >
        Login
      </Button>

      <Typography
        variant="caption"
        color="secondary"
        align="center"
        className="version"
      >
        Version 1.0.0
      </Typography>

    </div>

  );

}
