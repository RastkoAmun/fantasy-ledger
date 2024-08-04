import { gql } from "@apollo/client";

const query = gql`
  query GetAbilityScores {
    abilityScores {
      strength
      dexterity
      constitution
      intelligence
      wisdom
      charisma
    }
  }
`;

export default query;