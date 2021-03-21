import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import processHashtag from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser, client }) => {
        const oldPhotos = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!oldPhotos) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }

        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhotos.hashtags,
              connectOrCreate: processHashtag(caption),
            },
          },
        });

        if (photo) {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
