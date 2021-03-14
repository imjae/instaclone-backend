import client from "../../client";

export default {
  User: {
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }

      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
    //   const exist = await client.user
    //     .findUnique({ where: { id: loggedInUser.id } })
    //     .following({ where: { id } });

      const exists = await client.user.count({
        where: { userName: loggedInUser.userName, following: { some: { id } } },
      });

      return Boolean(exists);
    },
  },
};
