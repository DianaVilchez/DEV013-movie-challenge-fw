// import { getMovies } from "../services/APIService"

// export const genresAnimation = async() => {
//     const { movies } = await getMovies({
//         filters: { page:1, genreId:null, sortBy:null },
//       })

//     const genres : string[] = [];

//     movies.forEach((movies) => {
//         movies.genres.forEach((genre) => {
//             if(!genres.includes(genre) && genre !== "Animation"){
//                 genres.push(genre);
//             }
//         })
//     })
//     console.log("genresAni:",genres)
// }