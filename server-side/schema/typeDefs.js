export const typeDefs =`#graphql
  type Query {
    abilityScores: AbilityScores!
  }

  type Mutation {
    createAbilityScores(input: CreateAbilityScoresInput!): AbilityScores!
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

  input CreateAbilityScoresInput {
    strength: Int!,
    dexterity: Int!,
    constitution: Int!,
    intelligence: Int!,
    wisdom: Int!,
    charisma: Int!
  }

  # input UpdateAbilityScoresInput {
  #   id: Int!,
  #   ...CreateAbilityScoresInput
  # }
`