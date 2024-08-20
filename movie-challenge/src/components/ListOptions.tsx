// import { getMovieGenres } from "../services/movieService";

export function ListOptions({
  options,
  selectedOption,
  onChange,
  onClear,
}: {
  options: [{ value: string; label: string }];
  selectedOption: { value: string; label: string };
  onChange: (option: { value: string; label: string }) => void;
  onClear: () => void;
}) {
    
  return(
    <div>
      {/* agrupa los valores seleccionados */}
      <select 
      value={selectedOption?.value || ''}
      // se llama al evento cuando cambias de seleccion
      onChange={(e) => {
        const selected = options.find(option => option.value === e.target.value);
        if(selected) {
          onChange(selected);
        }
      } }
      >
        <option value='Generos'disabled>
        </option>
        {/* mapear cada uno de las options(generos) para volverlos etiqueta option */}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {/* el texto para cada opcion */}
            {option.label}
          </option>

        ))}
      </select>
      {selectedOption && (
        <button onClick={onClear}>
          {/* icono de limpiar */} clear
        </button>
      )}
    </div>
  )
}
// export function AllGenres() {
//   const {name} = await getMovieGenres();
//   console.log(genres);
// }