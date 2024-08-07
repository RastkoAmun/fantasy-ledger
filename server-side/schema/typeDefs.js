export const typeDefs =`#graphql
  type Query {
    abilityScores: AbilityScores!
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
`