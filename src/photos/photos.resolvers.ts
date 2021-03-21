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
  },
  Hashtag: {
      
  }
};

export default resolvers;
