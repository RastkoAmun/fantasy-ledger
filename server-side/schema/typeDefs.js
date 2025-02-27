export const typeDefs =`#graphql
  type Query {
    abilityScores: AbilityScores!
  }

  type Mutation {
    createAbilityScores(input: CreateAbilityScoresInput!): AbilityScores!,
    createCharacter(input: CreateCharacterInput!): Character
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
    currentHealth: Int,
    maxHealth: Int,
    temporaryHealth: Int,
    hitDice: String,
    race: String,
    subrace: String,
    class: String,
    subclass: String,
    speed: Int,
    abilityScores: Int!
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
`