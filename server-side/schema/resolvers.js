import process from "process";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

const getCharacters = async () => {
  try{
    const result = await sql`SELECT id, name, level, race, subrace, class, subclass FROM characters`
    console.log(result)
    return result
  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

const getAbilityScores = async () => {
  try {
    const result = await sql`SELECT * FROM ability_scores WHERE id = 1`;
    return result[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

const createAbilityScores = async (_, { input }) => {
  if (!input) {
    throw new Error("No input received in mutation.");
  }
  try {
    const [newAbilityScores] = await sql`
      INSERT INTO ability_scores (strength, dexterity, constitution, intelligence, wisdom, charisma)
      VALUES (${input.strength}, ${input.dexterity}, ${input.constitution}, ${input.intelligence}, ${input.wisdom}, ${input.charisma})
      RETURNING *;
    `;
    console.log(newAbilityScores);
    return newAbilityScores;
  } catch (error) {
    throw new Error("Failed to insert ability scores: " + error.message);
  }
};

const createCharacter = async (_, { input }) => {
  const {
    name,
    level,
    race,
    subrace,
    subclass,
    speed,
    currentHealth,
    temporaryHealth,
    hitDice,
    maxHealth,
    abilityScores,
  } = { ...input };

  try {
    const [newCharacter] = await sql`
      INSERT INTO characters(
        name, level, race, subrace, class, subclass, speed, 
        current_health, max_health, temp_health, health_dice, ability_scores
      )
      VALUES (
        ${name}, ${level}, ${race}, ${subrace}, ${input.class}, ${subclass}, ${speed}, 
        ${currentHealth}, ${maxHealth}, ${temporaryHealth}, ${hitDice}, ${abilityScores}
      )
      RETURNING *;
    `;

    return newCharacter;
  } catch (error) {
    throw new Error("Failed to insert new character: " + error.message);
  }
};

export const resolvers = {
  Query: {
    abilityScores: () => getAbilityScores(),
    characters: () => getCharacters()
  },

  Mutation: {
    createAbilityScores: (_, args) => createAbilityScores(_, args),
    createCharacter: (_, args) => createCharacter(_, args),
  },
};
