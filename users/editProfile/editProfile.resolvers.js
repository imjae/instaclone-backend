import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password: newPassword },
      { loggedInUser }
    ) => {
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      const editUser = await client.user.update({
        where: {
          id: loggedInUser.id
        },
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });

      if (editUser) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Failed editProfile",
        };
      }
    },
  },
};
