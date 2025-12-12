import React, { useState } from "react";
import { login, googleLogin } from "../utils/auth";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.user) window.location.href = "/";
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
      <h1>Login</h1>

      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />

      <button onClick={handleSubmit}>Login</button>

      <button onClick={googleLogin} style={{ marginTop: 10 }}>
        Login with Google
      </button>

      <p style={{ marginTop: 20 }}>
        Don’t have an account? <a href="/signup">Create Account</a>
      </p>
    </div>
  );
}
