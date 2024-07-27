import React from 'react';
import {ApiMovie} from '../models/ApiMovie';
import MovieCard from './MovieCard';

interface MovieListType {
    movies:ApiMovie[]
}
const MovieList: React.FC<MovieListType> = ({ movies }) => {
    return (
        <div className="movies-list">
            {movies.map((movie) => (
        <li key={movie.original_title} > {/* Usa una propiedad única como id para la clave */}
          <MovieCard 
            original_title={movie.original_title}
            poster_path={movie.poster_path}
            release_date={movie.release_date} 
          />
        </li>
      ))}
        </div>
    );
};

export default MovieList;

// {movies.map((movie) => (
//     <MovieCard
//         key={movie.id} // Usa una propiedad única como id para la clave
//         original_title={movie.original_title}
//         poster_path={movie.poster_path}
//         release_date={movie.release_date}
//     />
// ))}