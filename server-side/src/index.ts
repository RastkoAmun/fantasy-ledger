// index.ts
// @ts-nocheck
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./resolvers.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import type { IncomingMessage } from "http";
import { MyContext } from "./context";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { gql } from "graphql-tag";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- read schema from dist or src ---
const candidates = [
  path.join(__dirname, "schema.graphql"),            // e.g., server-side/dist/schema.graphql
  path.resolve(__dirname, "../src/schema.graphql"),  // fallback: server-side/src/schema.graphql
  path.resolve(process.cwd(), "server-side/src/schema.graphql"), // monorepo fallback
];

let sdl: string | undefined;
for (const p of candidates) {
  try {
    sdl = fs.readFileSync(p, "utf8");
    break;
  } catch {}
}

if (!sdl) {
  console.error("schema.graphql not found. Looked in:", candidates);
  process.exit(1);
}

const typeDefs = gql(sdl);

// --- rest unchanged ---
dotenv.config();
const PORT = 3000;

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

const context = async ({ req }: { req: IncomingMessage }): Promise<MyContext> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return { prisma };
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { prisma, userId: (decoded as any).userId };
  } catch {
    return { prisma };
  }
};

const server = new ApolloServer<MyContext>({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context,
});
console.log(`Server ready at: ${url}`);
