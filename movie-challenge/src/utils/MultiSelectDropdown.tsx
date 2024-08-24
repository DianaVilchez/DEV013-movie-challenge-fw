// import React, { useState } from "react";
import styles from "./MultiSelectDropdown.module.css";
import { useState } from "react";

//pasarlo a un modelo esto reemplaza esto [{ value: string; label: string }]
export type Option = {
    value: string;
    label:string
};

// props de la funcion(listoptions)
interface MultiSelectDropdownProps {
  options:Option[]; /*[{ value: string; label: string }]*/
  selectedOptions:Option[]; /*{ value: string; label: string }*/
  onChange: (selected:Option[]) => void;
  onClear: () => void;
  title: string; // Se agrega el titulo(Generos) del dropdown
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedOptions,
  onChange,
  onClear,
  title,
}) => {
  //para controlar es estado del menu desplegable
  const [isOpen,setIsOpen] = useState(false);
  // se abre el menu o se cierra, se cambia es estado de abierto a cerrado
  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen)
  };
  // opciones seleccionadas
  const handleOptionClick = (option:Option) => {
// Verifica si la opción ya está seleccionada
if (!selectedOptions.some((selected) => selected.value === option.value)) {
    // Si no está seleccionada, la agrega
    const updatedSelectedOptions = [...selectedOptions, option];
    console.log("Selected Options:", updatedSelectedOptions);
    onChange(updatedSelectedOptions);
  }
  };

  return (
    <div className={styles.dropdown}>
    <div className={styles.dropdownTitle} onClick={toggleDropdown}>
      {title}
    </div>
    <div className={`${styles.dropdownContent} ${isOpen ? styles.show : ""}`}>
      <ul className={styles.optionList}>
        {options.map((option) => (
          <li
            key={option.value}
            className={styles.option}
            onClick={() => handleOptionClick(option)}
            style={{
              backgroundColor: selectedOptions.some(
                (selected) => selected.value === option.value
              )
                ? "#EB93D2" // Color para indicar selección
                : "transparent",
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button> {/* Botón para limpiar selección */}
    </div>
  </div>
  )
}
