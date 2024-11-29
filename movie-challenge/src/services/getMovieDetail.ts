import { ApiMovie } from "../models/ApiMovie";
import { getToken } from "../utils/env";
import { formatGenresToMap, formatMovie } from "../utils/transformers";
import { getMovieGenres } from "./movieGenresService";

export const getMovieDetail = async (
  id: number
): Promise<ApiMovie> => {
  // const baseUrl = import.meta.env.VITE_BASE_URL!;
  // const token = import.meta.env.VITE_TOKEN_API!;
  const token = getToken();

  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }
  const genres = await getMovieGenres();
  const genreMap = formatGenresToMap(genres);
  const dataDetails = await response.json();

  if (dataDetails.genres) {
    dataDetails.genre_ids = dataDetails.genres.map((genre: { id: number; name: string }) => genre.id);
}

const movie: ApiMovie = formatMovie(dataDetails, genreMap);
console.log("Formatted Movie:", movie);
console.log("overview",movie.overview)
console.log("moviecomplete",movie)
return movie as ApiMovie;

};
