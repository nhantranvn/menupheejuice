import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const client =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

let prismaClient: PrismaClient | undefined;

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    prismaClient ??= createPrismaClient();
    return Reflect.get(prismaClient, property, receiver);
  },
});
