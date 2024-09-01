import { ApiMovie } from '../models/ApiMovie';
import { GenreMovies } from '../models/Genre';
import {GenreOption} from '../models/GenresOptions';

export function formatMovie(apiData: ApiMovie,genreMap:Map<number, string>) :ApiMovie {
    const genresNames = apiData.genre_ids.map(id => genreMap.get(id) || 'Unknown') ;
    
    return {
        title: apiData.title,
        poster_path: apiData.poster_path,
        release_date:new Date(apiData.release_date).getFullYear().toString(),
        genres: genresNames,
        genre_ids:apiData.genre_ids,
        id: apiData.id,
        overview: apiData.overview,
        vote_average: apiData.vote_average || 0,
        vote_count: apiData.vote_count || 0,
    };
}

export function formatGenresToMap(genres: GenreMovies[]) : Map<number, string>{ 
    //creo una instancia de map(esta es la sintaxis)
    const genreMap = new Map<number, string>();
    genres.forEach(genre => {
        genreMap.set(genre.id, genre.name)
    })
    console.log(genreMap)
    return genreMap;
}

export function formatGenresToOptions(genres: GenreMovies[]): GenreOption[] {
    const example = genres.map(genre => ({
        value: genre.id.toString(),
        label: genre.name,
    }))
    console.log("genresopcions:",example)
    return example
    
}