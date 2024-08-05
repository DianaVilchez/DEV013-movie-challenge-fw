import { ApiMovie } from '../models/ApiMovie';
// import {Movie} from '../models/Movie'
import { formatMovie } from '../utils/transformers'

     const apiKey = import.meta.env.VITE_API_KEY! ;
     const baseUrl =  import.meta.env.VITE_BASE_URL! ;

    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [totalPages, setTotalPages] = useState<number>(1); 

    // async function  getMovies(): Promise<ApiMovie[]> {
    export const getMovies = async({ filters: { page = 1 } }: { filters: { page?: number } }, genreMap:Map<number, string>) :Promise<{ metaData: { pagination: { currentPage: number; totalPages: number } }, movies: ApiMovie[] }>  => {
        // const page = parseInt(page as string, 10) || 1; // Página actual
        // const limit = parseInt(limitQuery as string, 10) || 10; // Tamaño de página
        //with_generes:filtrado para obtener peliculas a nimadas (id-16=animation)
        
    //     //para traer los elementos(cambiar de pagina a otra)
    //     const lastIndex = currentPage * 20;// 2*6 =12
    //     const firstIndex = lastIndex - 20;//12-6=6 
    // //slice(firstIndex,lastIndex): (6,12) trae los elementos de de la poscion 6 a la 12 

        
        const response = await fetch(`${baseUrl}/discover/movie?with_genres=16,28,35&page=${page}&api_key=${apiKey}`,{
            headers:{
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("data:",data)
        console.log("total_page",data.total_pages)
        const movies = data.results.map((movie: ApiMovie) => formatMovie(movie, genreMap));
        return {
            metaData: { 
                pagination:{
                    currentPage:data.page, 
                    totalPages:data.total_pages
                    
                }
            }, 
            movies
            // .slice(firstIndex,lastIndex)
        };
    }

// export default getMovies()