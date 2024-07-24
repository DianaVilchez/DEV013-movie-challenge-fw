import {Movie} from '../models/Movie'
function MovieCard({title,posterImg,releaseYear}:Movie){
    return(
        <section className='movie-card'>
            <h1>{title} </h1>
            <img src={posterImg} />
            <h4>{releaseYear} </h4>
        </section>
    )
}

export default MovieCard