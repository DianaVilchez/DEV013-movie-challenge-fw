import { ApiMovie } from '../models/ApiMovie'
// import {Movie} from '../models/Movie'
export function MovieCard({title,poster_path,release_date,genres}:ApiMovie){
    return(
        <section className='movie-card'>
            
            <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}/>
            <p>
            <h3>{title} </h3>
            <h4>{release_date} </h4>
            <h4>{genres}</h4>
            </p>
        </section>
    )
}

export default MovieCard;