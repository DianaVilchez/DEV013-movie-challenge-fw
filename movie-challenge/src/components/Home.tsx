// import  getMovies  from "../services/APIService";
// import { useEffect, useState } from 'react';
// import { ApiMovie } from '../models/ApiMovie';
// import MovieList from "./MovieList";
// import Header from "./Header";
// // import Menu from "./Menu";
// // se crea una instancia por que api services es una clase
// // const apiServices = new APIServices()
// function Home() {
//   const [data, setData] = useState<ApiMovie[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const result = await getMovies;
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, []); // Ejecutar useEffect solo una vez al montar el componente

//   return (
//     <div>
//       {/* <p>Cartelera</p> */}
//       <Header/>
//       {/* <Menu /> */}
     
//       <ul>
//         {data.map((data) => (
//            <MovieList
//            key={data} // Usa una propiedad única como id para la clave
//            original_title={data}
//            poster_path={data}
//            release_date={data}
//        /> 
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;

import { useEffect, useState } from 'react';
import { ApiMovie } from '../models/ApiMovie';
import  {getMovies}  from '../services/APIService'; // Asegúrate de importar la función correcta
import MovieList from "./MovieList";
import Header from "./Header";

function Home() {
  const [data, setData] = useState<ApiMovie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovies();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Ejecutar useEffect solo una vez al montar el componente

  return (
    <div>
      <Header />
      <MovieList movies={data} />
    </div>
  );
}

export default Home;
