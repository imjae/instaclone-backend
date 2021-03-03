import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("userName or email 이 존재합니다.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        return await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },

    login: async (_, { userName, password }) => {
      const user = await client.user.findUnique({
        where: {
          userName,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: `not find username`,
        };
      }

      const passwordOK = await bcrypt.compare(password, user.password);
      if(!passwordOK) {
        return {
          ok: false,
          error: `incorrected password`
        }
      }
      console.log(passwordOK);
    },
  },
};
