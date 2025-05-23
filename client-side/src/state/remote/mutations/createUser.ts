import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!){
    registerUser(input: $input){
      id
      email
      username
      password
    }
  }
`