import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const verifyToken: any = jwt.verify(token, process.env.SECRET_KEY);
    if (verifyToken) {
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
  root,
  args,
  context,
  info
) => {
  if (!context.loggedInUser) {
    const isQuery = info.operation.operation === "query";
    if (isQuery) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
  } else {
    return ourResolver(root, args, context, info);
  }
};
