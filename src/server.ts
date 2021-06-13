require("dotenv").config();
const http = require('http');
const express = require('express');
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";
import client from "./client";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  uploads: false,
  introspection: true,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
        client,
      };
    }
  },
  subscriptions: {
    onConnect: async (param) => {
      const token = param["token"];
      if (!param.hasOwnProperty("token")) {
        throw new Error("You can't listen.");
      }
      const loggedInUser = await getUser(token);
      return { loggedInUser };
    },
  },
});

const app = express();
app.use(logger("tiny"));
// app.use("/statics", express.static("uploads"));

app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT;

httpServer.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
