import { ApiMovie } from "../models/ApiMovie";
import { formatMovie } from "./transformers";

describe("formatMovie", () => {
  test("should format the movie data correctly", () => {
    const apiDataTest: ApiMovie = {
      title: "Test Movie",
      poster_path: "/test.jpg",
      release_date: "1969-12-06",
      genre_ids: [16],
      id: 401,
      overview: "This is a test movie",
      vote_average: 8.5,
      vote_count: 100,
      genres: [],
    };
    const genreMapTest = new Map<number, string>([[16, "Animation"]]);
    const formattedMovieTest = formatMovie(apiDataTest, genreMapTest);

    expect(formattedMovieTest).toEqual({
      title: "Test Movie",
      poster_path: "/test.jpg",
      release_date: "1969",
      genre_ids: [16],
      id: 401,
      overview: "This is a test movie",
      vote_average: 8.5,
      vote_count: 100,
      genres: ["Animation"],
    });
  });
});
