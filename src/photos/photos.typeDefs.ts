import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    #         id        Int       @id @default(autoincrement())
    #   createdAt DateTime  @default(now())
    #   updatedAt DateTime  @updatedAt
    #   User      User?     @relation(fields: [userId], references: [id])
    #   userId    Int?
    #   hashtags  Hashtag[]
    #   file      String
    #   caption   String?
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    #     id        Int      @id @default(autoincrement())
    #   hashtag   String
    #   createdAt DateTime @default(now())
    #   updatedAt DateTime @updatedAt
    #   photos    Photo[]
    id: Int!
    hashtag: String!
    photos: [Photo]!
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
