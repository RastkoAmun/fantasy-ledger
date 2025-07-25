export const typeDefs =`#graphql
  type Query {
    character(id: ID!): Character!
    abilityScores(id: ID!): AbilityScores!
    characters: [Character]
    features(id: ID!): [Feature]
  }

  type Mutation {
    createAbilityScores(input: CreateAbilityScoresInput!): AbilityScores!,
    createCharacter(input: CreateCharacterInput!): Character,
    createFeature(input: CreateFeatureInput!): Feature!,
    registerUser(input: CreateUserInput!): User!
    login(input: LoginInput!): AuthPayload!
    updateHealth(id: ID!, input: UpdateHealthInput!): Character
    deleteFeature(id: ID!): Feature
  }

  type AbilityScores {,
    id: Int!
    strength: Int!,
    dexterity: Int!,
    constitution: Int!,
    intelligence: Int!,
    wisdom: Int!,
    charisma: Int!
  }

  type Character {
    id: Int!,
    name: String!,
    level: Int!,
    class: String,
    subclass: String,
    race: String,
    subrace: String,
    speed: Int
    armor: Int
    maxHealth: Int!,
    currentHealth: Int!,
    tempHealth: Int!,
    healthDice: String,
    proficiencies: [String]
    savingThrows: [String]
    abilityScoresId: Int
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    username: String!
  }

  type Feature {
    id: ID!
    name: String!
    description: String
    level: Int!
    characterId: Int!
  }

  input CreateAbilityScoresInput {
    strength: Int!,
    dexterity: Int!,
    constitution: Int!,
    intelligence: Int!,
    wisdom: Int!,
    charisma: Int!
  }

  input CreateCharacterInput {
    name: String!,
    level: Int!,
    currentHealth: Int!,
    maxHealth: Int!,
    temporaryHealth: Int!,
    hitDice: String!,
    race: String!,
    subrace: String!,
    class: String!,
    subclass: String!,
    abilityScores: Int!
  }

  input CreateUserInput {
    email: String!
    username: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input UpdateHealthInput {
    currentHealth: Int!,
    tempHealth: Int!
  }

  input CreateFeatureInput {
    name: String!
    description: String
    level: Int!
    characterId: Int!
  }
`