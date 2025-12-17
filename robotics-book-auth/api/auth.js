import { auth } from "../src/auth.js";

export default async function handler(req, res) {
  return auth.handler(req, res);
}