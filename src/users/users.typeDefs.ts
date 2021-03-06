import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    likes: [Like]
  }
`;
