import { createAuthClient } from "better-auth/react";
import { BetterAuth } from 'better-auth';

export const authClient = createAuthClient({
  baseURL: "https://robotics-book-hackathon-5zn2.vercel.app/api/auth",
});

export const getSession = async () => {
  try {
    const res = await authClient.getSession();
    return res?.session || null;
  } catch {
    return null;
  }
};

export const loginWithEmail = (email, password) =>
  authClient.signIn({ email, password });

export const signupWithEmail = (data) =>
  authClient.signUp({
    email: data.email,
    password: data.password,
    name: data.name,
    background: data.background,
    provider: "credentials",
  });

export const loginWithGoogle = () =>
  authClient.signInWithProvider("google", { callbackURL: "/" });

export const logout = async () => {
  await authClient.signOut();
  window.location.href = "/login";
};
