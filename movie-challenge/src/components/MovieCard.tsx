import { ApiMovie } from '../models/ApiMovie'
// import {Movie} from '../models/Movie'
function MovieCard({original_title,poster_path,release_date}:ApiMovie){
    return(
        <section className='movie-card'>
            <h1>{original_title} </h1>
            <img src={poster_path} />
            <h4>{release_date} </h4>
        </section>
    )
}

export default MovieCard;