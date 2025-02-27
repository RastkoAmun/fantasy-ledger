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

const createAbilityScores = async (_, { input }) => {
  if (!input) {
    console.error("❌ No input received in mutation!");
    throw new Error("No input received in mutation.");
  }
  try {
    const [newAbilityScores] = await sql`
      INSERT INTO ability_scores (strength, dexterity, constitution, intelligence, wisdom, charisma)
      VALUES (${input.strength}, ${input.dexterity}, ${input.constitution}, ${input.intelligence}, ${input.wisdom}, ${input.charisma})
      RETURNING *;
    `;

    // This will print id that is generated
    // Use this later to connect id of AbilityScore with id of Character
    console.log(newAbilityScores.id)

    return newAbilityScores;
  } catch (error) {
    throw new Error("Failed to insert ability scores: " + error.message);
  }
}

export const resolvers = {
  Query: {
    abilityScores: () => getAbilityScores(),
  },

  Mutation: {
    createAbilityScores: (_, args) => createAbilityScores(_, args)
  }
};
