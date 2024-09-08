// import { getMovieDetail } from "../services/getMovieDetail";
// import "@testing-library/jest-dom";
// import { getMovieDetail } from "../services/getMovieDetail";
// import { ApiMovie } from "../models/ApiMovie";

// jest.mock("../utils/env", () => ({
//   getToken: () => "faketoken"
// }));

// describe("getMovieDetail", () => {
//   const movieId = 831815;
//   const data = {
//   "title": "Saving Bikini Bottom: The Sandy Cheeks Movie",
//   "poster_path": "/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
//   "release_date": "2024",
//   "genres": [
//       "Animation",
//       "Comedy",
//       "Adventure",
//       "Family"
//   ],
//   "genre_ids": [
//       16,
//       35,
//       12,
//       10751
//   ],
//   "id": 831815,
//   "overview": "When Bikini Bottom is scooped from the ocean, scientific squirrel Sandy Cheeks and her pal SpongeBob SquarePants saddle up for Texas to save their town.",
//   "vote_average": 6.418,
//   "vote_count": 201
// }
  
//   test("Returns a Movie type object", async () => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve(data),
//       }),
//     ) as jest.Mock;
//     const result = await getMovieDetail(movieId);
//     expect(result).toEqual(data);
//   });

// });

// describe("getMovieDetail", () => {
//   beforeEach(() => {
//     global.fetch = jest.fn().mockImplementation((url) => {
//       if (url.includes("movie")) {
//         return Promise.resolve({
//           ok: true,
//           json: () =>
//             Promise.resolve({
//                 "title": "Saving Bikini Bottom: The Sandy Cheeks Movie",
//                 "poster_path": "/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
//                 "release_date": "2024",
//                 "genres": [
//                     "Animation",
//                     "Comedy",
//                     "Adventure",
//                     "Family"
//                 ],
//                 "genre_ids": [
//                     16,
//                     35,
//                     12,
//                     10751
//                 ],
//                 "id": 831815,
//                 "overview": "When Bikini Bottom is scooped from the ocean, scientific squirrel Sandy Cheeks and her pal SpongeBob SquarePants saddle up for Texas to save their town.",
//                 "vote_average": 6.418,
//                 "vote_count": 201
//               }),
//         });
//       }
//     });
//   });

//   afterEach(() => {
//     (global.fetch as jest.Mock).mockClear();
//   });

//   test("fetches movie details successfully", async () => {
//     const movieId = 653346;

//     const movieDetail = await getMovieDetail(movieId);

//     expect(global.fetch).toHaveBeenCalledWith(
//       `https://api.themoviedb.org/3/movie/${movieId}`,
//       {
//         headers: {
//           Authorization: `Bearer your_mock_api_key`,
//         },
//       }
//     );

//     expect(movieDetail.id).toBe(movieId);
//     expect(movieDetail.title).toBe("Saving Bikini Bottom: The Sandy Cheeks Movie");
//   });
// });

import { getMovieDetail } from "../services/getMovieDetail";
import { getMovieGenres } from "../services/movieGenresService";
import { formatGenresToMap, formatMovie } from "../utils/transformers";

// Mockear las funciones que se utilizan en getMovieDetail
jest.mock("../services/movieGenresService", () => ({
  getMovieGenres: jest.fn(),
}));

jest.mock("../utils/transformers", () => ({
  formatGenresToMap: jest.fn(),
  formatMovie: jest.fn(),
}));
jest.mock("../utils/env", () => ({
  getToken: () => "faketoken"
}));


describe("getMovieDetail", () => {
  const mockMovieResponse = {
    id: 1,
    title: "Inception",
    poster_path: "/inception.jpg",
    release_date: "2010",
    overview: "A skilled thief is given a chance to erase his criminal record...",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Sci-Fi" }
    ],
  };

  const mockGenres = [
    { id: 28, name: "Action" },
    { id: 878, name: "Sci-Fi" },
  ];

  const mockFormattedMovie = {
    id: 1,
    title: "Inception",
    poster_path: "/inception.jpg",
    release_date: "2010",
    overview: "A skilled thief is given a chance to erase his criminal record...",
    genres: ["Action", "Sci-Fi"],
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovieResponse),
      })
    ) as jest.Mock;

    (getMovieGenres as jest.Mock).mockResolvedValue(mockGenres);
    (formatGenresToMap as jest.Mock).mockReturnValue(new Map(mockGenres.map(genre => [genre.id, genre.name])));
    (formatMovie as jest.Mock).mockReturnValue(mockFormattedMovie);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches movie details and formats them correctly", async () => {
    const movieId = 1;
    const result = await getMovieDetail(movieId);

    // Verifica que la función fetch fue llamada con la URL correcta
    expect(fetch).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: expect.any(String),
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    // Verifica que getMovieGenres fue llamado
    expect(getMovieGenres).toHaveBeenCalled();

    // Verifica que formatGenresToMap fue llamado con los géneros correctos
    expect(formatGenresToMap).toHaveBeenCalledWith(mockGenres);

    // Verifica que formatMovie fue llamado con los datos y el genreMap
    expect(formatMovie).toHaveBeenCalledWith(mockMovieResponse, expect.any(Map));

    // Verifica que el resultado es el objeto formateado
    expect(result).toEqual(mockFormattedMovie);
  });
});

  // test("throws an error if fetch fails", async () => {
  //   global.fetch = jest.fn(() => Promise.resolve({ ok: false, statusText: "Not Found" })) as jest.Mock;

  //   await expect(getMovieDetail(1)).rejects.toThrow("Failed to fetch movie details: Not Found");
  // });


  
