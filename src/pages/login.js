import React, { useState } from "react";
import "../css/custom.css";
import { loginWithEmail, loginWithGoogle } from "../utils/authClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("/api/check-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.exists) {
        alert("Your account does not exist. Please create a new one.");
        return;
      }

      if (data.provider === "google") {
        alert("Please login using Google.");
        return;
      }

      await loginWithEmail(email, password);
      window.location.href = "/";
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login to Read</h1>

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <button className="auth-button auth-google" onClick={loginWithGoogle}>
          Login with Google
        </button>

        <div className="auth-footer">
          Don’t have an account? <a href="/signup">Create a new one</a>
        </div>
      </div>
    </div>
  );
}