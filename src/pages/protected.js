import React, { useEffect, useState } from "react";
import { API } from "../utils/auth";

export default function Protected() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => window.location.href = "/login");
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome {user.name}</p>
    </div>
  );
}
