import client from "../../client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: async (_, { keyword }) => {
      return await client.photo.findMany({ where: { caption: { startsWith: keyword } } });
    },
  },
};

export default resolvers;
