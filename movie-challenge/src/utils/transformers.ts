import { ApiMovie } from '../models/ApiMovie';
import {Movie} from '../models/Movie'


export function formatMovie(apiData: ApiMovie) :Movie {
    return {
        title: apiData.title,
        posterImg: apiData.poster_path,
        releaseYear:new Date(apiData.release_date).getFullYear(),
        // genre: apiData.genre_ids,
        // director: apiData.director,
        // rating:apiData.rating,
    };
}