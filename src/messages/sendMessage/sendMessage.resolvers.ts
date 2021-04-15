import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, userId, roomId }, { client, loggedInUser }) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });

          if (!user) {
            return {
              ok: false,
              error: "This user does not exist.",
            };
          }

          // protectedResolver에서 로그인한 유저를 체크된 상태
          // userId로 넘어온 대상 user가 존재하는지 체크된 상태
          // 로그인 user와 대상 user를 하나의 방에 connect 해주어야 한다.
          room = await client.room.create({
            data: {
              users: {
                connect: [{ id: userId }, { id: loggedInUser.id }],
              },
            },
            select: {
              id: true,
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "This room does not exist.",
            };
          }
        }

        const message = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
