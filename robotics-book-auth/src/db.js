import { PrismaClient } from "@prisma/client";

let prisma;

if (global.prisma) {
  prisma = global.prisma;
} else {
  prisma = new PrismaClient({
    log: ["error"]
  });
  global.prisma = prisma;
}

export { prisma as db };
