import { useEffect, useState } from 'react';
import { ApiMovie } from '../models/ApiMovie';
import  {getMovies}  from '../services/APIService'; // Asegúrate de importar la función correcta
import MovieList from "./MovieList";
import Pagination from './Pagination';
import Header from "./Header";

function Home() {
  const [data, setData] = useState<ApiMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovies({ filters: { page: currentPage } });
        setData(result.movies);
        setTotalPages(result.metaData.pagination.totalPages);
        console.log("Total Pages:", result.metaData.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]); // Ejecutar useEffect solo una vez al montar el componente
  const handlePageChange = (page: number) => {
    console.log("actual",page);
    setCurrentPage(page);
  };

return (
    <div>
      <Header />
      <MovieList movies={data} />
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onSelectPage={handlePageChange} 
        />
    </div>
  );
}

export default Home;
