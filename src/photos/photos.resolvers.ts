import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: async ({ id }) => {
      return await client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likeCount: async ({ id }) => {
      return await client.like.count({ where: { photoId: id } });
    },
    commentCount: async ({ id }) => {
      return await client.comment.count({ where: { photoId: id } });
    },
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
  Hashtag: {
    photos: ({ id }, { page }) =>
      client.hashtag.findUnique({ where: { id } }).photos(),
    totalPhotos: async ({ id }) => {
      return await client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};

export default resolvers;
