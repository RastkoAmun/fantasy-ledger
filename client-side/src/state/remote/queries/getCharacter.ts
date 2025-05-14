import { gql } from "@apollo/client";

export const getCharacterQuery = gql`
  query GetCharacter($id: ID!){
    character(id: $id){
      id
      name
      level
      class
      subclass
      race
      subrace
      speed
      maxHealth
      currentHealth
      tempHealth
      healthDice
      proficiencies
      abilityScoresId
    }
  }
`