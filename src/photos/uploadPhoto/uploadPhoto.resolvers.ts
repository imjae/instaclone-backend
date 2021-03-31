import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import processHashtag from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtag(caption);
        } 

        await client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
