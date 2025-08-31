import { gql } from "@apollo/client";

export const createSpell = gql`
  mutation CreateSpell($input: CreateSpellInput!) {
    createSpell(input: $input) {
      id
      name
      level
      school
      casting
      range
      components
      duration
      description
      characterId
    }
  }
`;
