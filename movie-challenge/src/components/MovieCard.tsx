import { ApiMovie } from '../models/ApiMovie'
// import {Movie} from '../models/Movie'
function MovieCard({original_title,poster_path,release_date}:ApiMovie){
    return(
        <section className='movie-card'>
            
            <img src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${poster_path}`}/>
            <p>
            <h3>{original_title} </h3>
            <h4>{release_date} </h4>
            </p>
        </section>
    )
}

export default MovieCard;