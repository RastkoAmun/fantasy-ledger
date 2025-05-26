import { gql } from "@apollo/client";

export const getFeatures = gql`
  query GetFeatures($id: ID!){
    features(id: $id){
      id
      name
      description
      level
      characterId
    }
  }
`