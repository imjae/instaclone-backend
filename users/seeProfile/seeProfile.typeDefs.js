import { gql } from "apollo-server";

export default gql`
  type SeeProfileResult {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(userName: String!): SeeProfileResult
  }
`;
