import { auth } from "../src/auth.js";

export default async function handler(req, res) {
  try {
    console.log("Request received:", req.method, req.url);
    await auth.handler(req, res);
  } catch (err) {
    console.error("Auth function crashed:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
