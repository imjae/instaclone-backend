import * as jwt from "jsonwebtoken";
import client from "../client";
import { Context, Resolver, Resolvers } from "../types";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const verifyToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      const user = await client.user.findUnique({
        where: {
          id: verifyToken.id,
        },
      });

      if (user) {
        return user;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const protectedResolver = (ourResolver: Resolver) => (
  root: any,
  args: any,
  context: Context,
  info: any
) => {
  console.log("context가 있니 ? "+context.loggedInUser);
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Please log in to perform this action.",
    };
  } else {
    return ourResolver(root, args, context, info);
  }
};
