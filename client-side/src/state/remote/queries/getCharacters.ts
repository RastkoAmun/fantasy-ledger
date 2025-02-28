import { gql } from "@apollo/client";

export const getCharactersQuery = gql`
  query GetCharacters{
    characters{
      id
      name
      level
      class
      subclass
      race
      subrace
    }
  }
`