import { getMovies } from "../services/APIService";

// Mock de la función fetch
globalThis.import = {
  env: {
    VITE_API_KEY: 'your-api-key',
    VITE_BASE_URL: 'your-base-url',
  },
  // Aquí puedes agregar propiedades adicionales si es necesario
} as unknown as ImportMeta;
global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          results: [
            {
              title: "Test Movie",
              poster_path: "/test.jpg",
              release_date: "2024-08-31",
              genre_ids: [1, 3],
              id: 101,
              overview: "This is a test movie",
              vote_average: 8.5,
              vote_count: 100,
            },
          ],
          page: 1,
          total_pages: 10,
        }),
    } as Response)
  );
  
  // Ejemplo de prueba
  test('fetches movies data from API and formats it', async () => {
    const result = await getMovies({
      filters: { page: 1, genreIds: [], sortBy: null, year: null },
    });
  
    expect(result.metaData.pagination.currentPage).toBe(1);
    expect(result.movies).toEqual([
      {
        title: "Test Movie",
        poster_path: "/test.jpg",
        release_date: "2024-08-31",
        genre_ids: [1, 3],
        id: 101,
        overview: "This is a test movie",
        vote_average: 8.5,
        vote_count: 100,
        genres: ['Unknown'], // Asumiendo que el genreMap no tiene el ID 3 mapeado
      },
    ]);
  });