import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    seeRooms: protectedResolver(async (_, __, { client, loggedInUser }) => {
      return await client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
    }),
  },
};

export default resolvers;
