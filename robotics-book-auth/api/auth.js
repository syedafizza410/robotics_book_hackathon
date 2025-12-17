import { auth } from "../src/auth.js";

export default async function handler(req, res) {
  try {
    console.log("Starting Better Auth...");
    await auth.handler(req, res);
  } catch (err) {
    console.error("Better Auth initialization error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
      stack: err.stack
    });
  }
}
