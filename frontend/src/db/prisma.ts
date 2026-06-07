import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined; pool: Pool | undefined };

const connectionString = process.env.DATABASE_URL;

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({
    connectionString,
    options: "-c search_path=public"
  });
  const adapter = new PrismaPg(pool, { schema: "public" });
  prisma = new PrismaClient({ adapter });
} else {
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({
      connectionString,
      options: "-c search_path=public"
    });
  }
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg(globalForPrisma.pool, { schema: "public" });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
