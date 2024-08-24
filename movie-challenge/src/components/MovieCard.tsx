import { ApiMovie } from '../models/ApiMovie'
// import {Movie} from '../models/Movie'
export function MovieCard({title,poster_path,release_date,genres}:ApiMovie){
    const filteredGenres = genres.filter(genre => genre !== 'Animation');
    return(
        <section className='movie-card'>
            
            <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}/>
            <p>
            <h2 className="titleMovie">{title} </h2>
            <h3>{release_date} </h3>
            <h3>{filteredGenres.join(', ')}</h3>
            </p>
        </section>
    )
}

export default MovieCard;