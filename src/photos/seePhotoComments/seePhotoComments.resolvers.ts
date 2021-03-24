import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { id }) => {
      const a = await client.comment.findMany({
        where: { photoId: id },
        include: {photo: true},
        orderBy: { updatedAt: "asc" },
      });

      return a;
    },
  },
};

export default resolvers;
