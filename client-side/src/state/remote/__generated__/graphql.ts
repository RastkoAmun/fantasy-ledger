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

export type Character = {
  __typename?: 'Character';
  abilityScores: Scalars['Int']['output'];
  class?: Maybe<Scalars['String']['output']>;
  currentHealth?: Maybe<Scalars['Int']['output']>;
  hitDice?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  level: Scalars['Int']['output'];
  maxHealth?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  race?: Maybe<Scalars['String']['output']>;
  speed?: Maybe<Scalars['Int']['output']>;
  subclass?: Maybe<Scalars['String']['output']>;
  subrace?: Maybe<Scalars['String']['output']>;
  temporaryHealth?: Maybe<Scalars['Int']['output']>;
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
  abilityScores: Scalars['Int']['input'];
  class: Scalars['String']['input'];
  currentHealth: Scalars['Int']['input'];
  hitDice: Scalars['String']['input'];
  level: Scalars['Int']['input'];
  maxHealth: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  race: Scalars['String']['input'];
  subclass: Scalars['String']['input'];
  subrace: Scalars['String']['input'];
  temporaryHealth: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAbilityScores: AbilityScores;
  createCharacter?: Maybe<Character>;
};


export type MutationCreateAbilityScoresArgs = {
  input: CreateAbilityScoresInput;
};


export type MutationCreateCharacterArgs = {
  input: CreateCharacterInput;
};

export type Query = {
  __typename?: 'Query';
  abilityScores: AbilityScores;
};
