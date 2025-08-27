import { gql } from "@apollo/client";

export const createCharacter = gql`
  mutation CreateCharacter($input: CreateCharacterInput!){
    createCharacter(input: $input){
      id
      name
      level
      currentHealth
      maxHealth
      tempHealth
      healthDice
      race
      subrace
      class
      subclass
      speed
      armor
      proficiencies
      savingThrows
      abilityScoresId
    }
  }
`