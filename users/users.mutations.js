import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ userName }, { email }],
        },
      });
      console.log(existingUser);

      const uglyPassword = await bcrypt.hash(password, 10);
      console.log(uglyPassword);

      return client.user.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          password: uglyPassword,
        },
      });
    },
  },
};
