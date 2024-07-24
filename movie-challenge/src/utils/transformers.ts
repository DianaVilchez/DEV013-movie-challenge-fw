import {Movie} from '../models/Movie'

export function formatMovie(apiData: any) :Movie {
    return {
        title: apiData.title,
        posterImg: apiData.posterImg,
        releaseYear:new Date(apiData.releaseYear).getFullYear(),
        genre: apiData.genre,
        director: apiData.director,
        rating:apiData.rating,
    };
}