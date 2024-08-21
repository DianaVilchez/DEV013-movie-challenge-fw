// import { ApiMovie } from "../models/ApiMovie";
// // import {Movie} from '../models/Movie'
// import { formatGenresToMap, formatMovie } from "../utils/transformers";
// import { getMovieGenres } from "./movieService";

// const apiKey = import.meta.env.VITE_API_KEY!;
// const baseUrl = import.meta.env.VITE_BASE_URL!;

// // const [currentPage, setCurrentPage] = useState<number>(1);
// // const [totalPages, setTotalPages] = useState<number>(1);

// // async function  getMovies(): Promise<ApiMovie[]> {
// export const getMovies = async ({
//   filters: { page = 1, genreIds = [], sortBy },
// }: {
//   filters: { page: number; genreIds: string[]; sortBy: string | null };
// }): Promise<{
//   metaData: { pagination: { currentPage: number; totalPages: number } };
//   movies: ApiMovie[];
// }> => {
//   //with_generes:filtrado para obtener peliculas a nimadas (id-16=animation)
//   // //slice(firstIndex,lastIndex): (6,12) trae los elementos de de la poscion 6 a la 12
//     // Consulta para obtener géneros
//     const genres = await getMovieGenres();
//     // console.log("genres:",genres)
//     //transforma todos los generos de id a name
//     const genreMap = formatGenresToMap(genres);
//     // console.log("genreMap:",genreMap)
//      // El error: no se puede asignar null a string , por eso se crea una constante que contenga a null
//      const queryParams = new URLSearchParams({
//       api_key: apiKey,
//       page:page?.toString(),
//       sort_by: sortBy || 'popularity.desc', // Ejemplo de uso de 'sortBy'
//     });

//     if (genreIds.length > 0) {
//       queryParams.append('with_genres', genreIds.join(','));
//     } else {
//       queryParams.append('with_genres', '16'); // Por ejemplo, incluir solo 'Animation' si no hay géneros seleccionados
//     }
//      const sortByValue = sortBy || '';
//   // const genreQuery = genreId ? `&with_genres=16,${genreId}` : "&with_genres=16";
//   // const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";
//   const response = await fetch(
//     `${baseUrl}/discover/movie?${queryParams.toString()}`,
//     {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   console.log('response:', response)
//   console.log('response:')
//   const data = await response.json();
//   // console.log("data:", data); 
//   // console.log("total_page", data.total_pages);
//   const movies = data.results.map((movie: ApiMovie) =>
//     formatMovie(movie, genreMap, sortByValue)
//   );
//   const returnMovies ={
//     metaData: {
//       pagination: {
//         currentPage: data.page,
//         totalPages: data.total_pages,
//       },
//     },
//     movies,
//   };
//   console.log ("returnMovies:",returnMovies)
//   return returnMovies

// };

// // export default getMovies()
import { ApiMovie } from "../models/ApiMovie";
import { formatGenresToMap, formatMovie } from "../utils/transformers";
import { getMovieGenres } from "./movieService";

const apiKey = import.meta.env.VITE_API_KEY!;
const baseUrl = import.meta.env.VITE_BASE_URL!;

export const getMovies = async ({
  filters: { page = 1, genreIds = [], sortBy },
}: {
  filters: { page: number; genreIds: string[]; sortBy: string | null };
}): Promise<{
  metaData: { pagination: { currentPage: number; totalPages: number } };
  movies: ApiMovie[];
}> => {
  // Consulta para obtener géneros
  const genres = await getMovieGenres();
  const genreMap = formatGenresToMap(genres);

  // Construcción de los parámetros de consulta
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    page: page.toString(),
    sort_by: sortBy || 'popularity.desc',
  });

  // Agregar los géneros seleccionados a los parámetros de consulta
  if (genreIds.length > 0) {
    queryParams.set('with_genres', genreIds.join(','));
  } else {
    queryParams.set('with_genres', '16'); // Valor predeterminado si no hay géneros seleccionados
  }

  // Imprime la URL final para depurar
  console.log("Constructed URL:", `${baseUrl}/discover/movie?${queryParams.toString()}`);

  // Solicitud a la API
  const response = await fetch(
    `${baseUrl}/discover/movie?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
    formatMovie(movie, genreMap, sortBy || '')
  );

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