import process from "process";
import { config } from "dotenv";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client';
import { 
  AbilityScores, 
  Character, 
  Feature, 
  LoginInput, 
  MutationCreateAbilityScoresArgs, 
  MutationCreateCharacterArgs, 
  MutationCreateFeatureArgs, 
  MutationCreateSpellArgs, 
  MutationDeleteFeatureArgs, 
  MutationDeleteSpellArgs, 
  MutationRegisterUserArgs, 
  MutationUpdateAbilityScoresArgs, 
  MutationUpdateCharacterArgs, 
  MutationUpdateHealthArgs, 
  Resolvers,
  Spell
} from "./graphql/generated-types";
import { MyContext } from "./context";

const prisma = new PrismaClient();

config();

const JWT_SECRET = process.env.JWT_SECRET!;

// --------------------------------------------------------------------------------------------
// =================================== QUERIES ================================================
// --------------------------------------------------------------------------------------------

const getCharacter = async (_: unknown, { id }: { id: string }, context: MyContext) => {
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

const getFeatures = async (_: unknown, { id }: {id: string }) => {
  try{
    const features = await prisma.features.findMany({
      where: { characterId: parseInt(id) }
    });

    return features.map((f) => ({
      ...f,
      id: f.id.toString(),
    }));
  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

const getSpells = async (_: unknown, { id }: {id: string }) => {
  try{
    const spells = await prisma.spells.findMany({
      where: { characterId: parseInt(id) }
    });

    return spells.map((s) => ({
      ...s,
      id: s.id.toString(),
    }));
  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

const getAllCharacters = async (_parent: unknown, _args: unknown, context: MyContext) => {
  try{
    if (!context?.userId) throw new Error("Not authenticated");

    return await prisma.characters.findMany({
      where: { userId: context.userId }
    });

  }catch(error){
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

const getAbilityScores = async (
  _parent: unknown,
  args: { id: string }
): Promise<AbilityScores> => {
  try {
    const result = await prisma.ability_scores.findUnique({
      where: { id: Number(args.id) },
    });
    return result as AbilityScores;
  } catch (error) {
    console.error('Error fetching ability scores:', error);
    throw new Error('Error fetching data');
  }
};


// --------------------------------------------------------------------------------------------
// =================================== MUTATIONS ==============================================
// --------------------------------------------------------------------------------------------

export const createAbilityScores = async (
  _parent: unknown,
  args: MutationCreateAbilityScoresArgs
): Promise<AbilityScores> => {
  const input = args.input;

  if (!input) {
    throw new Error("No input received in mutation.");
  }

  try {
    const newAbilityScores = await prisma.ability_scores.create({
      data: {
        strength: input.strength,
        dexterity: input.dexterity,
        constitution: input.constitution,
        intelligence: input.intelligence,
        wisdom: input.wisdom,
        charisma: input.charisma,
      },
    });

    return newAbilityScores as AbilityScores;
  } catch (error: any) {
    console.error("Error creating ability scores:", error);
    throw new Error("Failed to insert ability scores: " + error.message);
  }
};

export const updateAbilityScores = async (
  _parent: unknown,
  args: MutationUpdateAbilityScoresArgs
): Promise<AbilityScores> => {
  const input = args.input;

  if (!input) {
    throw new Error("No input received in mutation.");
  }

  try {
    const updatedAbilityScores = await prisma.ability_scores.update({
      where: { id: Number(args.id) },
      data: {
        strength: input.strength,
        dexterity: input.dexterity,
        constitution: input.constitution,
        intelligence: input.intelligence,
        wisdom: input.wisdom,
        charisma: input.charisma,
      },
    });

    return updatedAbilityScores as AbilityScores;
  } catch (error: any) {
    console.error("Error updating ability scores:", error);
    throw new Error("Failed to insert ability scores: " + error.message);
  }
};

export const createCharacter = async (
  _parent: unknown,
  args: MutationCreateCharacterArgs,
  context: MyContext
): Promise<Character> => {
  const input = args.input;

  if (!input) {
    throw new Error("No input received in mutation.");
  }

  try {
    const newCharacter = await prisma.characters.create({
      data: {
        name: input.name,
        level: input.level,
        race: input.race,
        subrace: input.subrace,
        class: input.class,
        subclass: input.subclass,
        speed: input.speed,
        armor: input.armor,
        currentHealth: input.currentHealth, 
        maxHealth: input.maxHealth,
        tempHealth: input.tempHealth ?? 0,
        healthDice: input.healthDice,
        abilityScoresId: input.abilityScoresId ?? null,
        proficiencies: input.proficiencies,
        savingThrows: input.savingThrows,
        userId: context.userId as string,
      },
    });

    return newCharacter as Character;
  } catch (error: any) {
    console.error("Error creating character:", error);
    throw new Error("Failed to insert new character: " + error.message);
  }
};

export const updateCharacter = async (
  _parent: unknown,
  args: MutationUpdateCharacterArgs
): Promise<Character> => {
  const input = args.input;

  if (!input) {
    throw new Error("No input received in mutation.");
  }

  try {
    const updatedCharacter = await prisma.characters.update({
      where: { id: Number(args.id) },
      data: {
        name: input.name,
        level: input.level,
        race: input.race,
        subrace: input.subrace,
        class: input.class,
        subclass: input.subclass,
        speed: input.speed,
        armor: input.armor,
        currentHealth: input.currentHealth, 
        maxHealth: input.maxHealth,
        tempHealth: input.tempHealth ?? 0,
        healthDice: input.healthDice,
        proficiencies: input.proficiencies,
        savingThrows: input.savingThrows,
      },
    });

    return updatedCharacter as Character;
  } catch (error: any) {
    console.error("Error creating character:", error);
    throw new Error("Failed to insert new character: " + error.message);
  }
};

const updateHealth = async (
  _parent: unknown,
  args: MutationUpdateHealthArgs
): Promise<Character> => {
  try {
    const characterId = Number(args.id);
    const updated = await prisma.characters.update({
      where: { id: characterId },
      data: args.input,
    });

    return {
      ...updated,
      id: updated.id,
    } as Character;

  } catch (error) {
    console.error('Error updating health:', error);
    throw new Error('Error updating health');
  }
};

const createFeature = async (
  _parent: unknown, 
  args: MutationCreateFeatureArgs
) => {
  try {
    const { name, description, characterId, level } = args.input;
    const newFeature = await prisma.features.create({
      data: {
        name,
        description: description ?? "",
        characterId: Number(characterId),
        level: level ?? 1,
      },
    });

    return {
      ...newFeature,
      id: newFeature.id.toString()
    };
  } catch (error) {
    console.error('Error creating feature:', error);
    throw new Error('Failed to create feature. Please try again.');
  }
};

const createSpell = async (_parent: unknown, args: MutationCreateSpellArgs) => {
  try {
    const newSpell = await prisma.spells.create({
      data: args.input,
    });

    return {
      ...newSpell,
      id: newSpell.id.toString()
    };
  } catch (error) {
    console.error('Error creating spell:', error);
    throw new Error('Failed to create spell. Please try again.');
  }
};

const deleteFeature = async (
  _parent: unknown, 
  args: MutationDeleteFeatureArgs): Promise<Feature> => {
  try{
    const deleted = await prisma.features.delete({
      where: { id: BigInt(args.id) }
    })

    return {
      ...deleted,
      id: deleted.id.toString(),
    } as Feature;
  }catch (error) {
    console.error('Error deleting feature:', error);
    throw new Error('Failed to delete feature. Please try again.');
  }
}

const deleteSpell = async (_parent: unknown, 
  args: MutationDeleteSpellArgs): Promise<Spell> => {
  try{
    const deleted = await prisma.spells.delete({
      where: { id: BigInt(args.id) }
    })

    return {
      ...deleted,
      id: deleted.id.toString(),
    } as Spell;
  }catch (error) {
    console.error('Error deleting spell:', error);
    throw new Error('Failed to delete spell. Please try again.');
  }
}


const login = async (_: unknown, { input }: {input: LoginInput}) => {
  const user = await prisma.users.findUnique({ where: { username: input.username }})
  if (!user) throw new Error("Username does not exist")
  
  const valid = await bcrypt.compare(input.password, user.password)
  if (!valid) throw new Error('Incorrect Password');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d'})
  return { token, username: user.username }
}


const registerUser = async (_: unknown, args: MutationRegisterUserArgs) => {
  const { email, username, password } = args.input

  const existingUsername = await prisma.users.findFirst({
    where: { username }
  })
  if (existingUsername) throw new Error("Username already in use.")

  const existingEmail = await prisma.users.findFirst({
    where: { email }
  })
  if (existingEmail) throw new Error("Email already in use.")

  if (password.length < 8) throw new Error("Too weak password, use at least 8 characters")
  
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

export const resolvers: Resolvers<MyContext> = {
  Query: {
    character: (_parent, args, context) => getCharacter(_parent, args, context),
    abilityScores: (_parent, args, _context) => getAbilityScores(_parent, args),
    characters: (_parent, _args, context) => getAllCharacters(_parent, _args, context),
    features: (_parent, args, _context) => getFeatures(_parent, args),
    spells: (_parent, args, _context) => getSpells(_parent, args)
  },

  Mutation: {
    createAbilityScores: (_parent, args, _context) => createAbilityScores(_parent, args),
    updateAbilityScores: (_parent, args, _context) => updateAbilityScores(_parent, args),
    createCharacter: (_parent, args, context) => createCharacter(_parent, args, context),
    updateCharacter: (_parent, args, _context) => updateCharacter(_parent, args),
    updateHealth: (_parent, args, _context) => updateHealth(_parent, args),
    createFeature: (_parent, args, _context) => createFeature(_parent, args),
    createSpell: (_parent, args, _context) => createSpell(_parent, args),
    registerUser: (_parent, args, _context) => registerUser(_parent, args),
    login: (_parent, args, _context) => login(_parent, args),
    deleteFeature: (_parent, args, _context) => deleteFeature(_parent, args),
    deleteSpell: (_parent, args, _context) => deleteSpell(_parent, args),
  },
};
