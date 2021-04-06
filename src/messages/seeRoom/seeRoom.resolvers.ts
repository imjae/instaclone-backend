import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectedResolver(async (_, { id }, { loggedInUser, client }) => {
      const room = await client.room.findFirst({
        where: {
          id,
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });

      return room;
    }),
  },
};

export default resolvers;
