import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createComment: async (_, { photoId, payload }, { loggedInUser }) => {
      const ok = await client.photo.findUnique({ where: { id: photoId } });
      if (!ok) {
        return {
          ok: false,
          error: "Not photo found",
        };
      }

      const newComment = await client.comment.create({
        data: {
          payload,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          photo: {
            connect: {
              id: photoId,
            },
          },
        },
      });

      return {
        ok: true,
        id: newComment.id,
      };
    },
  },
};

export default resolvers;
