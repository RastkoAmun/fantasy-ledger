/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AbilityScores = {
  __typename?: 'AbilityScores';
  charisma: Scalars['Int']['output'];
  constitution: Scalars['Int']['output'];
  dexterity: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  intelligence: Scalars['Int']['output'];
  strength: Scalars['Int']['output'];
  wisdom: Scalars['Int']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Character = {
  __typename?: 'Character';
  abilityScoresId?: Maybe<Scalars['Int']['output']>;
  armor?: Maybe<Scalars['Int']['output']>;
  class: Scalars['String']['output'];
  currentHealth: Scalars['Int']['output'];
  healthDice: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  level: Scalars['Int']['output'];
  maxHealth: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  proficiencies: Array<Scalars['String']['output']>;
  race: Scalars['String']['output'];
  savingThrows: Array<Scalars['String']['output']>;
  speed?: Maybe<Scalars['Int']['output']>;
  subclass: Scalars['String']['output'];
  subrace: Scalars['String']['output'];
  tempHealth: Scalars['Int']['output'];
};

export type CreateAbilityScoresInput = {
  charisma: Scalars['Int']['input'];
  constitution: Scalars['Int']['input'];
  dexterity: Scalars['Int']['input'];
  intelligence: Scalars['Int']['input'];
  strength: Scalars['Int']['input'];
  wisdom: Scalars['Int']['input'];
};

export type CreateCharacterInput = {
  abilityScoresId: Scalars['Int']['input'];
  armor: Scalars['Int']['input'];
  class: Scalars['String']['input'];
  currentHealth: Scalars['Int']['input'];
  healthDice: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  maxHealth: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  proficiencies: Array<Scalars['String']['input']>;
  race: Scalars['String']['input'];
  savingThrows: Array<Scalars['String']['input']>;
  speed: Scalars['Int']['input'];
  subclass: Scalars['String']['input'];
  subrace: Scalars['String']['input'];
  tempHealth: Scalars['Int']['input'];
};

export type CreateFeatureInput = {
  characterId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateSpellInput = {
  casting: Scalars['String']['input'];
  characterId: Scalars['Int']['input'];
  components: Scalars['String']['input'];
  description: Scalars['String']['input'];
  duration: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  range: Scalars['String']['input'];
  school: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Feature = {
  __typename?: 'Feature';
  characterId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAbilityScores: AbilityScores;
  createCharacter?: Maybe<Character>;
  createFeature: Feature;
  createSpell: Spell;
  deleteFeature?: Maybe<Feature>;
  deleteSpell?: Maybe<Spell>;
  login: AuthPayload;
  registerUser: User;
  updateAbilityScores: AbilityScores;
  updateCharacter?: Maybe<Character>;
  updateHealth?: Maybe<Character>;
};


export type MutationCreateAbilityScoresArgs = {
  input: CreateAbilityScoresInput;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};


export type MutationCreateFeatureArgs = {
  input: CreateFeatureInput;
};


export type MutationCreateSpellArgs = {
  input: CreateSpellInput;
};


export type MutationDeleteFeatureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSpellArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateAbilityScoresArgs = {
  id: Scalars['ID']['input'];
  input: CreateAbilityScoresInput;
};


export type MutationUpdateCharacterArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCharacterInput;
};


export type MutationUpdateHealthArgs = {
  id: Scalars['ID']['input'];
  input: UpdateHealthInput;
};

export type Query = {
  __typename?: 'Query';
  abilityScores: AbilityScores;
  character: Character;
  characters?: Maybe<Array<Maybe<Character>>>;
  features?: Maybe<Array<Maybe<Feature>>>;
  spells?: Maybe<Array<Maybe<Spell>>>;
};


export type QueryAbilityScoresArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFeaturesArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySpellsArgs = {
  id: Scalars['ID']['input'];
};

export type Spell = {
  __typename?: 'Spell';
  casting: Scalars['String']['output'];
  characterId: Scalars['Int']['output'];
  components: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  range: Scalars['String']['output'];
  school: Scalars['String']['output'];
};

export type UpdateCharacterInput = {
  armor: Scalars['Int']['input'];
  class: Scalars['String']['input'];
  currentHealth: Scalars['Int']['input'];
  healthDice: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  maxHealth: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  proficiencies: Array<Scalars['String']['input']>;
  race: Scalars['String']['input'];
  savingThrows: Array<Scalars['String']['input']>;
  speed: Scalars['Int']['input'];
  subclass: Scalars['String']['input'];
  subrace: Scalars['String']['input'];
  tempHealth: Scalars['Int']['input'];
};

export type UpdateHealthInput = {
  currentHealth: Scalars['Int']['input'];
  tempHealth: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};
