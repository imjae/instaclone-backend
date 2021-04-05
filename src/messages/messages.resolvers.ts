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
    unreadTotal: () => 0,
  },
};

export default resolvers;
