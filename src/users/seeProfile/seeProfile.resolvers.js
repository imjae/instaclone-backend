import client from "../../client";

export default {
  Query: {
    seeProfile: async (_, { userName }) => {
      return await client.user.findUnique({
        where: { userName },
        include: {
          followers: true,
          following: true,
        },
      });
    },
  },
};
