import { useEffect, useState } from 'react';
import { ApiMovie } from '../models/ApiMovie';
import  {getMovies}  from '../services/APIService'; // Asegúrate de importar la función correcta
import MovieList from "./MovieList";
import Pagination from './Pagination';
import Header from "./Header";
import { getMovieGenres } from '../services/movieService';
// import { MultiSelectDropdown } from '../utils/MultiSelectDropdown';
// import { ListOptions } from './ListOptions';
// import { formatGenresToOptions } from '../utils/transformers';
// import { formatGenresToOptions } from '../utils/transformers';

type Option = { value: string; label: string };

function Home() {
  //estados
  const [data, setData] = useState<ApiMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genreId, setGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  // const [selectedOption,setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  // const [allGenres, setAllGenres] = useState<{ value: string; label: string }[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  // const allGenres = getMovieGenres()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovies({ filters: { page: currentPage , genreId,sortBy} });
        setData(result.movies);
        setTotalPages(Math.min(result.metaData.pagination.totalPages, 30));
        // setTotalPages(result.metaData.pagination.totalPages);
        console.log("Total Pages:", result.metaData.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage,genreId,sortBy]); // Ejecutar useEffect solo una vez al montar el componente
  
//   useEffect(() => {
//     if(selectedOption) {
//       console.log("seleccion:",selectedOption);
//       // Actualizar el ID de género cuando la opción seleccionada cambia
//       setGenreId(parseInt(selectedOption.value, 10));
//     } else{
//       setGenreId(null);
//     }
//   },[selectedOption]);
// // estado de los generos
//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const genres = await getMovieGenres();
//         const formattedGenres = formatGenresToOptions(genres);
//         setAllGenres(formattedGenres);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };

//     fetchGenres();
//   }, []); // Ejecutar solo una vez al montar el componente

useEffect(() => {
  const fetchGenres = async () => {
    try {
      const genres = await getMovieGenres();
      const formattedOptions = genres.map(genre => ({
        value: genre.id.toString(),
        label: genre.name,
      }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  fetchGenres();
}, []);

  const handlePageChange = (page: number) => {
    console.log("actual",page);
    setCurrentPage(page);
  };
  //  const handleChange = (option: { value: string; label: string }) => {
  //   setSelectedOption(option);
  // };

  const handleClear = () => {
    setGenreId(null);
  };
  const handleDropdownChange = (selected: Option[]) => {
    setSelectedOptions(selected);
    setGenreId(selected.length > 0 ? parseInt(selected[0].value, 10) : null);
  };

return (
    <div>
      <Header
        options={options}
        selectedOptions={selectedOptions}
        onDropdownChange={handleDropdownChange}
        onDropdownClear={handleClear}
      />
      <MovieList movies={data} />
      {/* <MultiSelectDropdown
      options={options}
      selectedOptions={selectedOptions}
      onChange={handleDropdownChange}
      onClear={handleClear} title={''}    /> */}
      <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onSelectPage={handlePageChange} 
        />
    </div>
  );
}

export default Home;
