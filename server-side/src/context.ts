import { PrismaClient } from "@prisma/client";

export interface MyContext {
  prisma: PrismaClient;
  userId?: string;
}
