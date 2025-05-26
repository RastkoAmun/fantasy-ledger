import { gql } from "@apollo/client";

export const createFeature = gql`
  mutation CreateFeature($input: CreateFeatureInput!){
    createFeature(input: $input){
      id
      name
      description
      level
      characterId
    }
  }
`