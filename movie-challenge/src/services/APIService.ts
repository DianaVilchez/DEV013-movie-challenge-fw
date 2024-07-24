import {Movie} from '../models/Movie'
import { formatMovie } from '../utils/transformers'

export class APIServices {

    private apiKey: string = process.env.REACT_APP_API_KEY! ;
    private baseUrl: string = process.env.REACT_APP_BASE_URL! ;

    public async getMovies(): Promise<Movie[]> {
        const response = await fetch(`${this.baseUrl}/discover/movie}`,{
            headers:{
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const movies = data.results.map((movie: any) => formatMovie(movie));
        return movies;
    }
}