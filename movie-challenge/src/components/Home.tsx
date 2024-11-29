import { useEffect, useState } from "react";
import { ApiMovie } from "../models/ApiMovie";
import { getMovies } from "../services/APIService"; 
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import Header from "./Header";
import { getMovieGenres } from "../services/movieGenresService";
import Footer from "./Footer";
import { yearFilter } from "./yearFilter";
import { yearOptions } from "./Years";
import { voteOptions } from "./optionVote";


type Option = { value: string; label: string };

function Home() {
  //estados
  const [data, setData] = useState<ApiMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [year, setYear] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMovies({
          filters: {
            page: currentPage,
            genreIds: selectedGenres,
            sortBy,
            year,
          },
        });
        setData(result.movies);
        setTotalPages(Math.min(result.metaData.pagination.totalPages, 500));
        console.log("Total Pages:", result.metaData.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, selectedGenres, sortBy, year]); 

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
    fetchGenres();
  }, []);

  const handlePageChange = (page: number) => {
    console.log("actual", page);
 
    setCurrentPage(page);
    // para que el scroll comience en 0
    window.scrollTo({ top: 0, behavior: "smooth" });
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page.toString());
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
  };

  const handleClear = () => {
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
    setSelectedGenres([...genreIds, "16"]);
  };
  //FILTRO POR AÑOS

  const handleYearChange = (selected: Option[]) => {
    setSelectedYear(selected);
    const selectedYears = selected.map((option) => option.value);
    setYear(selectedYears.join(","));
  };
  const handleYearClear = () => {
    setSelectedYear([]);
    setCurrentPage(1);
  };
  useEffect(() => {
    const ageRange = selectedYear[0]?.value || null;
    setYear(ageRange);
  }, [selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
    const queryParams = new URLSearchParams();
    console.log("queryParamsYear", queryParams);
    if (selectedGenres.length > 0) {
      queryParams.append("genres", selectedGenres.join(","));
    }
    if (year) {
      if (year && year.length > 0) {
        const yearRanges = year.split(","); // Convierte el string en un array
        yearRanges.forEach((range: string, index: number) => {
          const { startYear, endYear } = yearFilter(range);
          if (startYear && endYear) {
            queryParams.append(`release_date.gte${index}`, startYear);
            queryParams.append(`release_date.lte${index}`, endYear);
          }
        });
      }
    }
    if (sortBy) {
      queryParams.set("sortBy", sortBy);
    } 

    console.log(selectedGenres.join(","));
    const queryString = queryParams.toString();
    window.history.replaceState(null, "", `?${queryString}`); // Actualiza la URL sin recargar la página
  }, [selectedGenres, year,sortBy]);

//SORTBY
const handleVoteClear = () => {
  setSortBy(null);
  setCurrentPage(1);
};
const handleVoteChange = (selected: Option[]) => {
  if (selected.length > 0) {
      setSortBy(selected[0].value);
  } else {
      setSortBy(null); // O mantener el valor anterior si no se selecciona nada
  }
};
  return (
    <div>
      <Header
        options={options}
        selectedOptions={selectedGenres
          .map((id) => options.find((option) => option.value === id)!)
          .filter(Boolean)}
        onDropdownChange={handleGenreSelection}
        onDropdownClear={handleClear}
        // AGE
        YearOptions={yearOptions}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        onYearClear={handleYearClear}
        //sort by
        VoteOptions={voteOptions}
        selectedVote={sortBy
          ? [voteOptions.find(option => option.value === sortBy)!]
          : []}
        onVoteChange={handleVoteChange}
        onVoteClear={handleVoteClear}
      />
      <MovieList movies={data} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onSelectPage={handlePageChange}
      />
      <Footer />
    </div>
  );
}

export default Home;
