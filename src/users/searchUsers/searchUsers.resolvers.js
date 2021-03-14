import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) =>
      await client.user.findMany({
        where: { userName: { startsWith: keyword } },
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
