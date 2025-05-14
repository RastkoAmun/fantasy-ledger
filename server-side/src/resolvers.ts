import process from "process";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// --------------------------------------------------------------------------------------------
// =================================== QUERIES ================================================
// --------------------------------------------------------------------------------------------

const getCharacter = async (_: unknown, { id }: { id: string }) => {
  try{
    const characters = await prisma.characters.findUnique({
      where: { id: parseInt(id) }
    });
    console.log(characters)
    return characters
  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}


const getAllCharacters = async () => {
  try{
    const characters = await prisma.characters.findMany();
    // const character = await sql`SELECT id, name, level, race, subrace, class, subclass, proficiencies, ability_scores_id FROM characters`
    console.log(characters)
    return characters
    // console.log(character)
    // return character
  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

const getAbilityScores = async (_: unknown, { id }: { id: number}) => {
  try {
    const result = await sql`SELECT * FROM ability_scores WHERE id = ${id}`;
    return result[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};


// --------------------------------------------------------------------------------------------
// =================================== MUTATIONS ==============================================
// --------------------------------------------------------------------------------------------

const createAbilityScores = async (_: unknown, { input }) => {
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

const createCharacter = async (_: unknown, { input }) => {
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
    abilityScoresID,
  } = { ...input };

  try {
    const [newCharacter] = await sql`
      INSERT INTO characters(
        name, level, race, subrace, class, subclass, speed, 
        current_health, max_health, temp_health, health_dice, ability_scores_id
      )
      VALUES (
        ${name}, ${level}, ${race}, ${subrace}, ${input.class}, ${subclass}, ${speed}, 
        ${currentHealth}, ${maxHealth}, ${temporaryHealth}, ${hitDice}, ${abilityScoresID}
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
    character: (_: unknown, args) => getCharacter(_, args),
    abilityScores: (_: unknown, args: { id: number }) => getAbilityScores(_, args),
    characters: () => getAllCharacters()
  },

  Mutation: {
    createAbilityScores: (_: unknown, args) => createAbilityScores(_, args),
    createCharacter: (_: unknown, args) => createCharacter(_, args),
  },
};
