import process from "process";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

const JWT_SECRET = process.env.JWT_SECRET!;

// --------------------------------------------------------------------------------------------
// =================================== QUERIES ================================================
// --------------------------------------------------------------------------------------------

const getCharacter = async (_: unknown, { id }: { id: string }, context) => {
  if (!context?.userId) throw new Error("Not authenticated");
  try{
    const characters = await prisma.characters.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!characters || characters.userId !== context.userId) {
      throw new Error('Unauthorized access to character');
    }

    return characters
  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}


const getAllCharacters = async (_parent, _args, context) => {
  try{
    console.log('context:', context.userId); // TEMP: See what it looks like
    if (!context?.userId) throw new Error("Not authenticated");
  
    console.log(context.userId)
    return await prisma.characters.findMany({
      where: { userId: context.userId }
    });

    // const characters = await prisma.characters.findMany();
    // // const character = await sql`SELECT id, name, level, race, subrace, class, subclass, proficiencies, ability_scores_id FROM characters`
    // console.log(characters)
    // return characters
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


const login = async (_: unknown, { input }) => {
  console.log(input)
  const user = await prisma.users.findUnique({ where: { username: input.username }})
  if (!user) throw new Error('User not found.')
  
  const valid = await bcrypt.compare(input.password, user.password)
  if (!valid) throw new Error('Incorrect Password');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d'})
  return { token, username: user.username }
}


const registerUser = async (_: unknown, { input }) => {
  const { email, username, password } = input
  console.log('Password', password)
  const existing = await prisma.users.findFirst({
    where: { OR: [{ email }, { username }]}
  })
  if (existing) throw new Error("Email or username already in use.")
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email,
      username,
      password: hashedPassword
    }
  })

  return { id: user.id, email: user.email, username: user.username, password: user.password }
}

export const resolvers = {
  Query: {
    character: (_: unknown, args, context) => getCharacter(_, args, context),
    abilityScores: (_: unknown, args: { id: number }) => getAbilityScores(_, args),
    characters: (_parent, _args, context) => getAllCharacters(_parent, _args, context)
  },

  Mutation: {
    createAbilityScores: (_: unknown, args) => createAbilityScores(_, args),
    createCharacter: (_: unknown, args) => createCharacter(_, args),
    registerUser: (_: unknown, args) => registerUser(_, args),   
    login: (_: unknown, args) => login(_, args),   
  },
};
