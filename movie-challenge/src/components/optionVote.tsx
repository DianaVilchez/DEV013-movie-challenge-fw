import { Option } from "./ListOptions";

export const voteOptions: Option[] = [
  { value: "Mas valoradas", label: "Mas valoradas" },  
  { value: "Menos Valoradas", label: "Menos Valoradas" },
];

// Mapeo de opciones a valores de la API
export const apiSortMapping: { [key: string]: string } = {
  "Mas valoradas": "vote_average.desc",
  "Menos Valoradas": "vote_average.asc",
};

