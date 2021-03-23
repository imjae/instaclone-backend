import { Resolvers } from "../types";
import { protectedResolver } from "../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser, client }) => id),
  },
};

export default resolvers;
