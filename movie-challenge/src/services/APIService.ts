import { ApiMovie } from "../models/ApiMovie";
import { formatGenresToMap, formatMovie } from "../utils/transformers";
import { yearFilter } from "../components/yearFilter";
import { getMovieGenres } from "./movieGenresService";
import { getToken } from "../utils/env";
// const token = import.meta.env.VITE_TOKEN_API!;
const token = getToken();

export const getMovies = async ({
  filters: { page = 1, genreIds = [], sortBy ,year},
}: {
  filters: {
    page: number;
    genreIds: string[] | null;
    sortBy: string | null;
    year: string | null;
  };
}): Promise<{
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: ApiMovie[];
}> => {
  // Consulta para obtener géneros
  const genres = await getMovieGenres();
  const genreMap = formatGenresToMap(genres);

  // Construcción de los parámetros de consulta
  const queryParams = new URLSearchParams({
    page: page.toString(),
    // sort_by: sortBy || "popularity.desc",
  });

  // Agregar los géneros seleccionados a los parámetros de consulta
  if (genreIds) {
    if (genreIds.length > 0) {
      queryParams.set("with_genres", genreIds.join(","));
    } else {
      queryParams.set("with_genres", "16"); 
    }
  }
  
  if (year) {
    const allAges = yearFilter(year);
    queryParams.set("release_date.gte", allAges.startYear);
    queryParams.set("release_date.lte", allAges.endYear);
    console.log("ages",queryParams.set("release_date.gte", allAges.startYear))
  }
  //revisar mañana................................
  if(sortBy){
    const sortByMap: { [key: string]: string } = {
      "Mas valoradas": "vote_average.desc",
      "Menos Valoradas": "vote_average.asc",
    };
    queryParams.append("sort_by", sortByMap[sortBy]);
  }
 //...................................................
  // Imprime la URL final para depurar
  console.log(
    "Constructed URL:",
    `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`
  );

  // Solicitud a la API
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("API Response Data:", data);

  const movies = data.results.map((movie: ApiMovie) =>
    formatMovie(movie, genreMap)
  );
console.log("movies",movies)
  const returnMovies = {
    metaData: {
      pagination: {
        currentPage: data.page,
        totalPages: data.total_pages,
      },
    },
    movies,
  };

  console.log("returnMovies:", returnMovies);
  return returnMovies;
};