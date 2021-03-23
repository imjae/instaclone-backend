import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const photo = await client.photo.findUnique({ where: { id } });
        if (!photo) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }

        const wherePhotoIdUserId = {
          photoId_userId: {
            photoId: photo.id,
            userId: loggedInUser.id,
          },
        };

        const like = await client.like.findUnique({
          where: wherePhotoIdUserId,
        });

        if (like) {
          await client.like.delete({ where: wherePhotoIdUserId });
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: loggedInUser.id } },
              photo: { connect: { id: photo.id } },
            },
          });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
