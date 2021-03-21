import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagObj = [];
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags.map((hashtag: String) => ({
            where: { hashtag },
            create: { hashtag },
          }));

          return client.photo.create({
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
        }
      }
    ),
  },
};

export default resolvers;
