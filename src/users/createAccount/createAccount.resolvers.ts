import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
      { client }
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

        const createUser = await client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword,
          },
        });

        if (createUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "crateAccount error.",
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: "crateAccount Catching error.",
        };
      }
    },
  },
};

export default resolvers;
