import { ApiMovie } from '../models/ApiMovie'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ id, title, poster_path, release_date, genres }: ApiMovie) => {
  const navigate = useNavigate()  
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };
  const filteredGenres = genres.filter(genre => genre !== 'Animation');
    const imageUrl = poster_path
    ? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`
    : null
        ;
    return (
      <section className='movie-card'
         onClick ={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
          {imageUrl ? (
            <img src={imageUrl} alt={title} />
          ) : (
            <div className='no-image'>
            <span className='titlenoimg'>{title}</span>
            </div>
          )
          }
            <h2 className="titleMovie">{title}</h2>
            <h3>{release_date || 'Sin Fecha'}</h3>
            <h3>{filteredGenres.join(', ')}</h3>
        
      </section>
    );
  };
  export default MovieCard;