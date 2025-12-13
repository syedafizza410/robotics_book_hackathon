import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email } = req.body;
  if (!email) return res.json({ exists: false });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.json({ exists: false });
  }

  return res.json({
    exists: true,
    provider: user.provider
  });
}