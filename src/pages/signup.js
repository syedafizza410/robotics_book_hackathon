import React, { useState } from "react";
import "../css/custom.css";
import { signupWithEmail, loginWithGoogle } from "../utils/authClient";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    background: "",
  });

  const handleSignup = async () => {
    if (!form.email || !form.password) {
      alert("Email and password are required");
      return;
    }

    try {
      await signupWithEmail(form);
      alert("Account created successfully");
      window.location.href = "/";
    } catch {
      alert("Account already exists or signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>

        <input
          className="auth-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="auth-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="auth-input"
          placeholder="Tech / Robotics background (optional)"
          value={form.background}
          onChange={(e) => setForm({ ...form, background: e.target.value })}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="auth-button" onClick={handleSignup}>
          Create Account
        </button>

        <button className="auth-button auth-google" onClick={loginWithGoogle}>
          Signup with Google
        </button>

        <div className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}
