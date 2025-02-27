import { gql } from "@apollo/client";

export const createAbilityScores = gql`
  mutation CreateAbilityScores($input: CreateAbilityScoresInput!) {
    createAbilityScores(input: $input) {
      id
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
    }
  }
`;