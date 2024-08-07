import process from "process";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

const getAbilityScores = async () => {
  try {
    const result = await sql`SELECT * FROM ability_scores WHERE id = 1`;
    return result[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

export const resolvers = {
  Query: {
    abilityScores: () => getAbilityScores(),
  },
};
