//obtener las lista de generos
export const getMovieGenres = async (): Promise<
  [{ id: number; name: string }]
> => {
  const apiKey = import.meta.env.VITE_API_KEY!;
  const baseUrl = import.meta.env.VITE_BASE_URL!;

  const response = await fetch(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("apigenre:", response);
  if (!response.ok) {
    throw new Error("Error fetching genres");
  }
  const data = await response.json();
  if (!data.genres || !Array.isArray(data.genres)) {
    throw new Error("Invalid genre data");
  }
  // Devolver los géneros como un array de objetos
  const totalGenres = data.genres.map(
    (genre: { id: number; name: string }) => ({
      id: genre.id,
      name: genre.name,
    })
  );
  const genresPage = totalGenres.filter(
    (genre: { id: number; name: string }) => genre.name !== "Animation"
  );
  console.log("example:", genresPage);
  return genresPage;
};

// export const getGenresAnimation = async() => {
//   const getMovieGenres = await getMovies({ filters: { page,genreId,sortBy} })
//   const genresMovieAnimated = getMovieGenres.filter(genre => genre.id === 16)
// }
