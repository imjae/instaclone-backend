import { gql } from "apollo-server";

export default gql`
  type SeeProfileResult {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(userName: String!): SeeProfileResult
  }
`;
