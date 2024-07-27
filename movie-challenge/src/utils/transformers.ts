import { ApiMovie } from '../models/ApiMovie';
// import {Movie} from '../models/Movie'


export function formatMovie(apiData: ApiMovie) :ApiMovie {
    return {
        original_title: apiData.original_title,
        poster_path: apiData.poster_path,
        release_date:new Date(apiData.release_date).getFullYear(),
        // genre: apiData.genre_ids,
        // director: apiData.director,
        // rating:apiData.rating,
    };
}