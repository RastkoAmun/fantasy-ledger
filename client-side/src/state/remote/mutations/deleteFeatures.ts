import { gql } from "@apollo/client";

export const deleteFeature = gql`
  mutation DeleteFeature($id: ID!){
    deleteFeature(id: $id){
      id
    }
  }
`