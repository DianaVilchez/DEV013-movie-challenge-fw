export interface Movie {
    title: string;         // Título de la película
   posterImg: string;        // URL del póster de la película
    releaseYear: number;   // Año de lanzamiento
    genre?: string[];      // Género(s) de la película (opcional)
    director?: string;     // Director de la película (opcional)
    rating?: number;       // Calificación de la película (opcional)
  }