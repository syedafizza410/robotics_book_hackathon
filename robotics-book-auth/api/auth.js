import { auth } from "../src/auth.js";

export default async function handler(req, res) {
  try {
    await auth.handler(req, res);
  } catch (err) {
    console.error("Auth function crashed:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
