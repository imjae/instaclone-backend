require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0NzU0NjExfQ.yxU8huSb7gI2Sl0PIFSf2-vX3I1fmXAw1ksJxim1HSI",
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at https://localhost:${PORT}        a`);
});
