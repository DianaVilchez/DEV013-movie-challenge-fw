import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../services/getMovieDetail";
import { useEffect, useState } from "react";
import { ApiMovie } from "../models/ApiMovie";
import { FaArrowLeft } from "react-icons/fa";
import StarRatings from "react-star-ratings-component";

type Params = {
  id: string;
};

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const [movie, setMovie] = useState<ApiMovie | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Inicializamos el estado `loading` como `true`
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id !== undefined) {
          const movieid = parseInt(id, 10);
          const getDetails = await getMovieDetail(movieid);
          console.log("getDetails.Movie", getDetails);

          setMovie(getDetails);
        }
      } catch (err) {
        setError("Error al obtener los detalles");
      } finally {
        // Cambiamos `loading` a `false` cuando se complete la carga, ya sea exitosamente o con error
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);
  console.log(movie);
  console.log("setMovie", setMovie);

  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    console.log("cargando");
    return <div className="loading">Cargando ...</div>;
  }
  if (!movie) {
    return <div>No movie found</div>;
  }
  const handleBackClick = () => {
    navigate("/");
  };
  const voteAverage = movie.vote_average ?? 0;
  return (
    <section className="movie">
      <h1 className="details-Back" onClick={handleBackClick}>
        <FaArrowLeft size={15} />
        Ir atras
      </h1>
      <div
        className="details-background"
        style={{
          background: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})`,
          backgroundSize: "cover",
        }}
      ></div>
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
              <span
                key={index}
                style={{
                  margin: "0 5px",
                  padding: "5px 10px",
                  color: "black",
                  fontWeight: "bold",
                  background: "#EB93D2",
                  borderRadius: "20px",
                }}
              >
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
