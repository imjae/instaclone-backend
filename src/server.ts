require("dotenv").config();
import * as http from "http";
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import pubsub from "./pubsub";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
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
        loggedInUser: context,
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
      return loggedInUser;
    },
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/statics", express.static("uploads"));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT;

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at https://localhost:${PORT}`);
});
