import client from "../../client";

export default {
  Query: {
    seeFollows: async (_, { userName, page }) => {
      const ok = await client.user.findUnique({ where: { userName } });
      if (!ok) {
        return {
          ok: false,
          error: "Can't unfolllow user",
        };
      }
      //   const followers = await client.user.findUnique({ where: { userName } });
      //   .followers({ take: 3, skip: (page - 1) * 3 });

      //   userName을 팔로잉하고있는 유저들을 모두 검색해야 한다.
      const aFollowers = await client.user.findMany({
        where: {
          following: {
            some: {
              userName,
            },
          },
        },
        take: 3,
        skip: (page - 1) * 3,
      });

      return {
        ok: true,
        followers: aFollowers,
      };
    },
  },
};
