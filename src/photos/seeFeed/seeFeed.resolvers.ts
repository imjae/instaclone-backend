import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    seeFeed: protectedResolver(async (_, __, { loggedInUser, client }) => {
      return await client.photo.findMany({
        where: {
          OR: [
            { user: { followers: { some: { id: loggedInUser.id } } } },
            { userId: loggedInUser.id },
          ],
        },
        orderBy: { updatedAt: "desc" },
      });
    }),
  },
};

export default resolvers;
