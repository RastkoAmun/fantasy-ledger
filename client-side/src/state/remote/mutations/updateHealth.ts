import { gql } from "@apollo/client";

export const updateHealth = gql`
  mutation UpdateHealth($id: ID!, $input: UpdateHealthInput!){
    updateHealth(id: $id, input: $input){
      id
      maxHealth
      currentHealth
      tempHealth
    }
  }
`