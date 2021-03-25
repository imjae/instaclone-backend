import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { id, page }) => {
      const commentList2Paging = await client.comment.findMany({
        where: { photoId: id },
        orderBy: { updatedAt: "asc" },
        take: 5,
        skip: page ? 1 : 0,
        ...(page && { cursor: { id: page } }),
      });

      return commentList2Paging;
    },
  },
};

export default resolvers;
