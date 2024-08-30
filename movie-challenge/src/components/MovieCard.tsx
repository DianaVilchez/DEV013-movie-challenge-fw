import { ApiMovie } from '../models/ApiMovie'
import { Link } from 'react-router-dom';

const MovieCard = ({ id, title, poster_path, release_date, genres }: ApiMovie) => {
    // console.log("MovieCard ID:", id); 
    const filteredGenres = genres.filter(genre => genre !== 'Animation');
    return (
      <section className='movie-card'>
        <Link to={`/movie/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`} alt={title} />
            <h2 className="titleMovie">{title}</h2>
            <h3>{release_date}</h3>
            <h3>{filteredGenres.join(', ')}</h3>
        </Link>
      </section>
    );
  };
  export default MovieCard;