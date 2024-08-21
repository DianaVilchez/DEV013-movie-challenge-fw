import { useEffect, useState } from "react";
import { ApiMovie } from "../models/ApiMovie";
import { getMovies } from "../services/APIService"; // Asegúrate de importar la función correcta
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import Header from "./Header";
import { getMovieGenres } from "../services/movieService";

type Option = { value: string; label: string };

function Home() {
  //estados
  const [data, setData] = useState<ApiMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  // const [genreIds, setGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  // const [selectedOption,setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  // const [allGenres, setAllGenres] = useState<{ value: string; label: string }[]>([]);
  // const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // const allGenres = getMovieGenres()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovies({
          filters: { page: currentPage, genreIds:selectedGenres, sortBy },
        });
        setData(result.movies);
        setTotalPages(Math.min(result.metaData.pagination.totalPages, 30));
        // setTotalPages(result.metaData.pagination.totalPages);
        console.log("Total Pages:", result.metaData.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, selectedGenres, sortBy]); // Ejecutar useEffect solo una vez al montar el componente

  //FILTRO DE GENEROS
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getMovieGenres();
        // Filtra "Animation" solo en el dropdown
        const filteredGenres = genres.filter(
          (genre) => genre.name !== "Animation"
        );
        const formattedOptions = filteredGenres.map((genre) => ({
          value: genre.id.toString(),
          label: genre.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres()
  }, []);

  const handlePageChange = (page: number) => {
    console.log("actual", page);
    setCurrentPage(page);
  };

  //  const handleChange = (option: { value: string; label: string }) => {
  //   setSelectedOption(option);
  // };

  const handleClear = () => {
    // setGenreId(null);
    setSelectedGenres([]);
    setCurrentPage(1);
  };
  // SELECCION DE SOLO UN GENERO
  // const handleDropdownChange = (selected: Option[]) => {
  //   setSelectedOptions(selected);
  //   console.log("selected:", selected);
  //   setGenreId(selected.length > 0 ? parseInt(selected[0].value, 10) : null);
  // };

  //SELECCION MULTIPLE
  const handleGenreSelection = (selected: Option[]) => {
    const genreIds = selected.map((option) => option.value);
    setSelectedGenres(genreIds);
    
  };
  useEffect(() => {
    setCurrentPage(1);
    const queryParams = new URLSearchParams();
    console.log(queryParams);
    if (selectedGenres.length > 0) {
      queryParams.append("genres", selectedGenres.join(","));
    }
    console.log(selectedGenres.join(","))
    const queryString = queryParams.toString();
    window.history.replaceState(null, '', `?${queryString}`); // Actualiza la URL sin recargar la página
  }, [selectedGenres]);

  return (
    <div>
      <Header
        options={options}
        // selectedOptions={selectedOptions}
        selectedOptions={selectedGenres.map(id => options.find(option => option.value === id)!).filter(Boolean)}
        onDropdownChange={handleGenreSelection}
        onDropdownClear={handleClear}
      />
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
