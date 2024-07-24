import React from 'react';
import {Movie} from '../models/Movie';
import MovieCard from './MovieCard';

interface MovieListType {
    movies:Movie[]
}
const MovieList: React.FC<MovieListType> = ({ movies }) => {
    return (
        <div className="movies-list">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.title} // Usa una propiedad única como id para la clave
                    title={movie.title}
                    posterImg={movie.posterImg}
                    releaseYear={movie.releaseYear}
                />
            ))}
        </div>
    );
};

export default MovieList;