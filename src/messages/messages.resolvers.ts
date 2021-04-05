import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: async ({ id }) => client.room.findUnique({ where: { id } }).users(),
    messages: async ({ id }) => {
      client.message.findMany({
        where: {
          roomId: id,
        },
      });
    },
    unreadTotal: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      } else {
        return await client.message.count({
          where: {
            read: false,
            roomId: id,
            user: {
              id: {
                not: loggedInUser.id,
              },
            },
          },
        });
      }
    },
  },
};

export default resolvers;
