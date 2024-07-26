// import { APIServices } from "../services/APIService";
// import { useEffect, useState } from 'react';
// import { ApiMovie } from '../models/ApiMovie';
import MovieList from "./MovieList";
import Header from "./Header";
import Menu from "./Menu";
// se crea una instancia por que api services es una clase
// const apiServices = new APIServices()
function Home() {
//   const [data, setData] = useState<ApiMovie[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const result = await apiServices.getMovies();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, []); // Ejecutar useEffect solo una vez al montar el componente

  return (
    <div>
      {/* <p>Cartelera</p> */}
      <Header/>
      <Menu />
      <MovieList movies={[]} /*movies={data}*/ /> 
      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title} />
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default Home;