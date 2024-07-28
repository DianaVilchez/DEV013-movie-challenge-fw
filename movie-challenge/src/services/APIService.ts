import { ApiMovie } from '../models/ApiMovie';
// import {Movie} from '../models/Movie'
import { formatMovie } from '../utils/transformers'

     const apiKey = import.meta.env.VITE_API_KEY! ;
     const baseUrl =  import.meta.env.VITE_BASE_URL! ;

    // async function  getMovies(): Promise<ApiMovie[]> {
    export const getMovies = async({ filters: { page: number } }) :Promise<ApiMovie[]> => {
        const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}?page=`,{
            headers:{
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        const movies = data.results.map((movie: ApiMovie) => formatMovie(movie));
        return movies;
    }

// export default getMovies()