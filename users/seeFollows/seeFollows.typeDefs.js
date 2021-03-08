import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowsResult {
    ok: Boolean!
    error: String
    followers: [User]
  }
  
  type Query {
    seeFollows(userName: String!, page: Int): SeeFollowsResult
  }
`;
