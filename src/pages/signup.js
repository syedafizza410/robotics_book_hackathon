import React, { useState } from "react";
import { signup, googleLogin } from "../utils/auth";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    background: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    console.log(res);
    if (res.user) window.location.href = "/";
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "auto" }}>
      <h1>Create Account</h1>

      <input placeholder="Full Name" onChange={(e)=>setForm({...form,name:e.target.value})} />
      <input placeholder="Phone Number" onChange={(e)=>setForm({...form,number:e.target.value})} />
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
      <input placeholder="Background (optional)" onChange={(e)=>setForm({...form,background:e.target.value})} />
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />

      <button onClick={handleSubmit}>Create Account</button>

      <button onClick={googleLogin} style={{ marginTop: 10 }}>
        Sign up with Google
      </button>

      <p style={{ marginTop: 20 }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
