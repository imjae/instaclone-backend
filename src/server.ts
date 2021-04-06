require("dotenv").config();
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
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/statics", express.static("uploads"));
apollo.applyMiddleware({ app });
apollo.installSubscriptionHandlers(app);

const PORT = process.env.PORT;

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at https://localhost:${PORT}`);
});
