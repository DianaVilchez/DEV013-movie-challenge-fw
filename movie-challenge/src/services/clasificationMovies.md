export const clasificationMovies = async(movieId: number) => {
    const apiKey = import.meta.env.VITE_API_KEY!;
    const baseUrl = import.meta.env.VITE_BASE_URL!;

    const response = await fetch(
        `${baseUrl}/movie/${movieId}/release_dates?api_key=${apiKey}&language=en-US`,
        
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
    const dataClasification = await response.json();
    console.log(dataClasification)
}