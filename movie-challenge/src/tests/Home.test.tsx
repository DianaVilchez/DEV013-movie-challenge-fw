
import {render, screen, waitFor } from "@testing-library/react";
import Home from "../components/Home";
import { getMovies } from "../services/APIService";
import { getMovieGenres } from "../services/movieGenresService";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("../services/APIService", () => ({
    getMovies: jest.fn(),
  }));
  jest.mock("../services/movieGenresService", () => ({
    getMovieGenres: jest.fn(),
  }));

const mockMovies = [
  {
    id: 1,
    title: "Movie 1",
    poster_path: "/poster1.jpg",
    release_date: "2020",
    genres: ["Action", "Adventure"],
    genre_ids: [28, 12],
  },
  {
    id: 2,
    title: "Movie 2",
    poster_path: "/poster2.jpg",
    release_date: "2021",
    genres: ["Drama"],
    genre_ids: [18],
  },
];

const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 18, name: "Drama" },
];

describe("Home Component", () => {
  beforeEach(() => {
    // Mockear las respuestas de las funciones de API
    (getMovies as jest.Mock).mockResolvedValue({
      movies: mockMovies,
      metaData: { pagination: { totalPages: 10 } },
    });

    (getMovieGenres as jest.Mock).mockResolvedValue(mockGenres);
  });

  test("render movie list", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Esperar a que se carguen los datos de las películas
    await waitFor(() => {
      expect(getMovies).toHaveBeenCalled();
      expect(getMovieGenres).toHaveBeenCalled();
    });

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  })

  test("render pagination", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getMovies).toHaveBeenCalled();
      expect(getMovieGenres).toHaveBeenCalled();
    });

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  })
  test("render Header Component ", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getMovies).toHaveBeenCalled();
      expect(getMovieGenres).toHaveBeenCalled();
    });

    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText('Genres')).toBeInTheDocument();
    expect(screen.getByText('Vote')).toBeInTheDocument();
  })
  // test('handles genre selection', async () => {
  //   render(
  //     <BrowserRouter>
  //       <Home />
  //     </BrowserRouter>
  //   );

  //   // Espera que los géneros se carguen
  //   await waitFor(() => expect(getMovieGenres).toHaveBeenCalled());

  //   // Simula la selección de un género
  //   // const genreOption = screen.getByText('Action');
  //   console.log(screen.getByText('Action'))
  //   fireEvent.click(screen.getByText('Action'));


  //   // Verifica que el estado se actualiza correctamente y la llamada a getMovies incluye los géneros
  //   await waitFor(() =>
  //     expect(getMovies).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         filters: { genreIds: ['28'], page: 1, sortBy: null, year: null },
  //       })
  //     )
  //   );
  // });
})