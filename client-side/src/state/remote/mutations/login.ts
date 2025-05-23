import { gql } from "@apollo/client";

export const loginQuery = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      username
    }
  }
`