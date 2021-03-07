import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      await client.user.update({
        where: { id: loggedInUser.id },
        data: { following: { connect: { userName } } },
      });

      return {
        ok: true,
      };
    }),
  },
};
