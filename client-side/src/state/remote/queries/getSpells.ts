import { gql } from "@apollo/client";

export const getSpells = gql`
  query GetSpells($id: ID!){
    spells(id: $id){
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
`