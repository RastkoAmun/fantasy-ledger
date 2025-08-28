import { gql } from "@apollo/client";

export const updateAbilityScores = gql`
  mutation UpdateAbilityScores($id: ID!, $input: CreateAbilityScoresInput!) {
    updateAbilityScores(id: $id, input: $input) {
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