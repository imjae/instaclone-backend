import { disconnect } from "process";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unFollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser }) => {
        const ok = await client.user.findUnique({ where: { userName } });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfolllow user",
          };
        }

        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: { userName } } },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
