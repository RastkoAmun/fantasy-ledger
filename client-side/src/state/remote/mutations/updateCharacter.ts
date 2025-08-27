import { gql } from "@apollo/client";

export const updateCharacter = gql`
  mutation UpdateCharacter($id: ID!, $input: UpdateCharacterInput!){
    updateCharacter(id: $id, input: $input){
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
    }
  }
`