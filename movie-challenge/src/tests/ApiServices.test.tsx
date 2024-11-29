import { getMovies } from '../services/APIService';
import { getMovieGenres } from '../services/movieGenresService';
import { formatMovie,formatGenresToMap } from '../utils/transformers';

jest.mock("../utils/env", () => ({
  getToken: () => "faketoken"
}));

jest.mock('../services/movieGenresService', () => ({
  getMovieGenres: jest.fn(),
}));

jest.mock('../utils/transformers', () => ({
  formatGenresToMap: jest.fn(),
  formatMovie: jest.fn(),
}));

describe('getMovies', () => {
  test('should return movies with metadata', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          page: 1,
          results: [
            {
              genre_ids: [16, 35, 10751],
              id: 1,
              title: "Fake Movie",
              vote_average: 7.5,
              vote_count: 100,
              overview: "A test movie",
              poster_path: "/fake.jpg",
              release_date: "2024-01-01",
            }
          ],
          total_pages: 10,
        }),
      })
    ) as jest.Mock;

    const mockGenres = [
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 10751, name: "Family" },
    ];
    const mockGenreMap = new Map([[16, "Animation"], [35, "Comedy"], [10751, "Family"]]);

    (getMovieGenres as jest.Mock).mockResolvedValue(mockGenres);
    (formatGenresToMap as jest.Mock).mockReturnValue(mockGenreMap);
    (formatMovie as jest.Mock).mockReturnValue({
      id: 1,
      title: "Fake Movie",
      vote_average: 7.5,
      vote_count: 100,
      genres: ["Animation", "Comedy", "Family"],
      overview: "A test movie",
      poster_path: "/fake.jpg",
      release_date: "2024-01-01",
    });

    const filters = { page: 1, genreIds: null, sortBy: null, year: null };
    const result = await getMovies({ filters });

    expect(result).toEqual({
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 10,
        },
      },
      movies: [
        {
          id: 1,
          title: "Fake Movie",
          vote_average: 7.5,
          vote_count: 100,
          genres: ["Animation", "Comedy", "Family"],
          overview: "A test movie",
          poster_path: "/fake.jpg",
          release_date: "2024-01-01",
        },
      ],
    });

    // Comprobar que las funciones mockeadas fueron llamadas correctamente
    expect(getMovieGenres).toHaveBeenCalled();
    expect(formatGenresToMap).toHaveBeenCalledWith(mockGenres);
    expect(formatMovie).toHaveBeenCalled();
  });
});
