import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../services/getMovieDetail";
import { useEffect, useState } from "react";
import { ApiMovie } from "../models/ApiMovie";
import { FaArrowLeft } from "react-icons/fa";
import StarRatings from 'react-star-ratings-component';
// import { getMovies } from '../services/APIService';
// import Home from './Home';
type Params = {
  id: string;
};

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const [movie, setMovie] = useState<ApiMovie | null>(null);
  //Manejar el caso por defecto de useParams se undefined
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id !== undefined) {
        const movieid = parseInt(id, 10);
        console.log("movieid", movieid);
        const getDetails = await getMovieDetail(movieid);
        console.log("getDetails.Movie", getDetails);

        setMovie(getDetails);
      }
    };
    fetchMovieDetails();
  }, [id]);
  console.log(movie);
  console.log("setMovie", setMovie);
  if (!movie) {
    return <div>No movie found</div>;
  }
  console.log(typeof id);
  const handleBackClick = () => {
    navigate("/"); // Redirige a la ruta '/'
  };
  // const vote = parseInt(movie.vote_average,10)
  const voteAverage = movie.vote_average ?? 0;
    // const starRating = voteAverage / 2;
    // console.log(starRating)
  
  console.log("vote",typeof movie.vote_average)
  
  console.log("vote",movie.vote_average)
  console.log("genres", movie.genres);
  console.log("movie.overview",movie.overview)
  // const genreNames = movie.genres.map(genre => genre.name);
  // const genreNames = movie.genres.map(genre => genre.name);
  return (
    <section className="movie">
      <h1 className="details-Back" onClick={handleBackClick}>
        <FaArrowLeft size={15} />
        Ir atras
      </h1>
      <div className="details-background"
        style={{
          background: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
          backgroundSize: "cover",
        }}
      >
        
      </div>
      <section className="details">
        <div>
          <img
            className="details-Img"
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
          />
        </div>
        <div>
          <h1 className="details-Title">{movie.title}</h1>
          <h1 className="details-Inf1">{movie.release_date}</h1>
          <h1 className="details-Inf1">
          {movie.genres.map((genre, index) => (
                <span key={index} style={{ margin: '0 5px',padding:'5px 10px', color: 'black', fontWeight: 'bold',background:'#EB93D2',borderRadius:'20px'}}>
                    {genre}
                </span>
            ))}
          </h1>
          <StarRatings 
                        colorFilledStar="gold"
                        colorEmptyStar="gray"
                        starSize="30px"
                        spaceBetweenStar="5px"
                        numberOfStar={5}
                        numberOfSelectedStar={Math.round(voteAverage / 2)}
                        disableOnSelect={true}

                    />
          <h1 className="details-Inf2">{voteAverage / 2}</h1>
          <h1 className="details-Inf-overview">{movie.overview}</h1>
        </div>
      </section>
    </section>
  );
};
