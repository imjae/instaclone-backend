import client from "./client";

export default {
  movies: () => client.movie.findMany(),
  movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
};
