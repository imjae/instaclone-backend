import client from "../../client";

export default {
  Query: {
    seeFollows: async (_, { userName, page }) => {
      const followers = await client.user
        .findUnique({ where: { userName } })
        .followers({ take: 3, skip: (page - 1) * 3 });

      return {
        ok: true,
        followers,
      };
    },
  },
};
