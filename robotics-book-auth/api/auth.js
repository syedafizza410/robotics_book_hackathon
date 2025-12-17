import { auth } from "../src/auth";

export default async function handler(req, res) {
  return auth.handler(req, res);
}