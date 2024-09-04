import styles from "../styles/MultiSelectDropdown.module.css";
import { useState } from "react";

// Define el tipo para las opciones
export type Option = {
    value: string;
    label: string;
};

// Define las props del componente
interface MultiSelectDropdownProps {
  options: Option[];
  selectedOptions: Option[];
  onChange: (selected: Option[]) => void;
  onClear: () => void;
  title: string;
}

export const MultiSelectDropdownOptions: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedOptions,
  onChange,
  onClear,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Alterna el menú desplegable
  const toggleDropdown = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Maneja la selección de una opción
  const handleOptionClick = (option: Option) => {
    // Reemplaza cualquier opción seleccionada con la nueva opción
    const updatedSelectedOptions = [option];
    onChange(updatedSelectedOptions);
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
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
};