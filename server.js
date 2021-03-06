require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver: protectedResolver,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/statics", express.static("uploads"));
server.applyMiddleware({ app });

const PORT = process.env.PORT;

app.listen({port: PORT}, () => {
  console.log(`🚀 Server ready at https://localhost:${PORT}`);
});
