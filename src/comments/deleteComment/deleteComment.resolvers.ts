import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: async (_, { id }, { loggedInUser, client }) => {
      const comment = await client.comment.findUnique({ where: { id } });
      if (!comment) {
        return {
          ok: false,
          error: "comment not found.",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    },
  },
};

export default resolvers;
