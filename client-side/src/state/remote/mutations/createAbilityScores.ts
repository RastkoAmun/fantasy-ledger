import { gql } from "@apollo/client";

export const createAbilityScores = gql`
  mutation CreateAbilityScores($input: AbilityScoresInput!) {
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

// export const useCreateAbilityScores = () =>
//   useCreateAbilityScores
