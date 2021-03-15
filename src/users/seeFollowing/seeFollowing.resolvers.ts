import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { userName, lastId }, { client }) => {
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

export default resolvers;
