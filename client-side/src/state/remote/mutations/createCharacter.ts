import { gql } from "@apollo/client";

export const createCharacter = gql`
  mutation CreateCharacter($input: CreateCharacterInput!){
    createCharacter(input: $input){
      id
      name
      level
      currentHealth
      maxHealth
      temporaryHealth
      hitDice
      race
      subrace
      class
      subclass
    }
  }
`