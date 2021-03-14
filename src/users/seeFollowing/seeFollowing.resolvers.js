import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { userName, lastId }) => {
      const ok = await client.user.findUnique({ where: { userName } });
      if (!ok) {
        return {
          ok: false,
          error: "Can't unfolllow user",
        };
      }

      const following = await client.user.findMany({
        where: { followers: { some: { userName } } },
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });

      //   const following = await client.user
      //     .findUnique({ where: { userName } })
      //     .followers({
      //       take: 3,
      //       skip: lastId ? 1 : 0,
      //       ...(lastId && { cursor: lastId }),
      //     });

      return {
        ok: true,
        following,
      };
    },
  },
};
