import { gql } from "@apollo/client";

export const getAllCharactersQuery = gql`
  query GetAllCharacters{
    characters{
      id
      name
      level
      class
      subclass
      race
      subrace
      abilityScoresId
    }
  }
`