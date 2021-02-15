import client from "./client";

export default {
  createMovie: (_, { title, year, genre }) => {
    console.log("create data info :" + title, year, genre);
    return client.movie.create({
      data: {
        title,
        year,
        genre,
      },
    });
  },
  deleteMovie: (_, { id }) => {
    console.log("delete data id : " + id);
    return client.movie.delete({ where: { id } });
  },
  updateMovie: (_, { id, year }) =>
    client.movie.update({ where: { id }, data: { year } }),
};
