import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) =>
      await client.user.findMany({
        where: { userName: { startsWith: keyword } },
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
