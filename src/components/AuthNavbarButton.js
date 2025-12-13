import React, { useEffect, useState } from "react";
import { getSession, logout } from "../utils/authClient";

export default function AuthNavbarButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getSession().then((s) => setLoggedIn(!!s));
  }, []);

  if (!loggedIn) {
    return (
      <>
        <a href="/login">Sign In</a>
        <a href="/signup" style={{ marginLeft: 12 }}>Sign Up</a>
      </>
    );
  }

  return (
    <button
      onClick={logout}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Logout
    </button>
  );
}
