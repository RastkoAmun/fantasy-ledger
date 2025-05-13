import { gql } from "@apollo/client";

const query = gql`
  query GetAbilityScores($id: ID!) {
    abilityScores(id: $id) {
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

export default query;