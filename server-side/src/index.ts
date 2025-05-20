import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import type { IncomingMessage } from 'http'

dotenv.config()

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

const context = async ({ req }: {req: IncomingMessage}) => {
  const token = req.headers.authorization?.split(' ')[1]
  try{
    const decoded = jwt.verify(token, JWT_SECRET)
    return { prisma, userId: (decoded as any).userId }
  } catch {
    return { prisma }
  }
}


const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context
});

console.log(`Server ready at: ${url}`);
