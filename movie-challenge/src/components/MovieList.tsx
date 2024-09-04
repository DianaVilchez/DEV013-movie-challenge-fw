import React from "react";
import { ApiMovie } from "../models/ApiMovie";
import MovieCard from "./MovieCard";
interface MovieListType {
  movies: ApiMovie[];
}
const MovieList: React.FC<MovieListType> = ({ movies }) => {
  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <li key={movie.title}>
          <MovieCard
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            genres={movie.genres}
            genre_ids={movie.genre_ids}
          />
        </li>
      ))}
    </div>
  );
};

export default MovieList;
