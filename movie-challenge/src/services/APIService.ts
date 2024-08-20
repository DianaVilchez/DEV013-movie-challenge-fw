import { ApiMovie } from "../models/ApiMovie";
// import {Movie} from '../models/Movie'
import { formatGenresToMap, formatMovie } from "../utils/transformers";
import { getMovieGenres } from "./movieService";

const apiKey = import.meta.env.VITE_API_KEY!;
const baseUrl = import.meta.env.VITE_BASE_URL!;

// const [currentPage, setCurrentPage] = useState<number>(1);
// const [totalPages, setTotalPages] = useState<number>(1);

// async function  getMovies(): Promise<ApiMovie[]> {
export const getMovies = async ({
  filters: { page = 1, genreId, sortBy },
}: {
  filters: { page: number; genreId: number | null; sortBy: string | null };
}): Promise<{
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: ApiMovie[];
}> => {
  //with_generes:filtrado para obtener peliculas a nimadas (id-16=animation)
  // //slice(firstIndex,lastIndex): (6,12) trae los elementos de de la poscion 6 a la 12
    // Consulta para obtener géneros
    const genres = await getMovieGenres();
    // console.log("genres:",genres)
    //transforma todos los generos de id a name
    const genreMap = formatGenresToMap(genres);
    // console.log("genreMap:",genreMap)
     // El error: no se puede asignar null a string , por eso se crea una constante que contenga a null
  const sortByValue = sortBy || '';
  const genreQuery = genreId ? `&with_genres=16,${genreId}` : "&with_genres=16";
  const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";
  const response = await fetch(
    `${baseUrl}/discover/movie?api_key=${apiKey}${genreQuery}${sortQuery}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  // console.log("data:", data); 
  // console.log("total_page", data.total_pages);
  const movies = data.results.map((movie: ApiMovie) =>
    formatMovie(movie, genreMap, sortByValue)
  );
  const returnMovies ={
    metaData: {
      pagination: {
        currentPage: data.page,
        totalPages: data.total_pages,
      },
    },
    movies,
  };
  console.log ("returnMovies:",returnMovies)
  return returnMovies

};

// export default getMovies()
