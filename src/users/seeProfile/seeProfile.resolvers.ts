import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { userName }, { client }) => {
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

export default resolvers;
