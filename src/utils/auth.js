export const API = "http://localhost:4000";

export async function signup(data) {
  const res = await fetch(`${API}/auth/signup/email`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function login(data) {
  const res = await fetch(`${API}/auth/signin/email`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export function googleLogin() {
  window.location.href = `${API}/auth/signin/google`;
}
