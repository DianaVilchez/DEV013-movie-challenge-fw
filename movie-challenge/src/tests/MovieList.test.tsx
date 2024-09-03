import { render, screen} from "@testing-library/react";
import MovieList from "../components/MovieList";
import { ApiMovie } from "../models/ApiMovie";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
const movies: ApiMovie[] = [
  {
    id: 1,
    title: "Movie 1",
    poster_path: "/poster1.jpg",
    release_date: "2020",
    genres: ["Animation", "Action", "Adventure"],
    genre_ids: [16, 28, 12],
  },
  {
    id: 2,
    title: "Movie 2",
    poster_path: "/poster2.jpg",
    release_date: "2024",
    genres: ["Animation","Drama"],
    genre_ids: [16],
  },
];

describe("MovieList", () => {
  test("renders a list of movies", () => {

    render(
        <BrowserRouter>
          <MovieList movies={movies} />
        </BrowserRouter>
      );

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Action, Adventure")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });
  test("renders the correct number of movies", () => {

    render(
        <BrowserRouter>
          <MovieList movies={movies} />
        </BrowserRouter>
      );
    const movieItems = screen.getAllByRole("listitem");
    expect(movieItems).toHaveLength(2);
  });
});
