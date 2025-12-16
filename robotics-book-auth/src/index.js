const { Hono } = require("hono");
const { auth } = require("./auth");
const { cors } = require("hono/cors");

const app = new Hono();

app.use("*", cors({
  origin: ["http://localhost:3000", "https://robotics-book-hackathon-5zn2.vercel.app"],
  credentials: true
}));
app.route("/api/auth", auth.handler);

module.exports = app;