import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: (_, { hashtag }) => {
      return client.hashtag.findUnique({ where: { hashtag } });
    },
  },
};

export default resolvers;