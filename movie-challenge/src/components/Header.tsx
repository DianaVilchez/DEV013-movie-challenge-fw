
import  {MultiSelectDropdown}  from "../utils/MultiSelectDropdown";
import { FC } from 'react';
import { Option } from '../utils/MultiSelectDropdown';

interface HeaderProps {
  options: Option[];
  selectedOptions: Option[];
  onDropdownChange: (selected: Option[]) => void;
  onDropdownClear: () => void;
}
const Header: FC<HeaderProps> = ({ options, selectedOptions, onDropdownChange, onDropdownClear }) => {
    return (
    <>
    <section className="header">
        <img className="header-background" src="https://i.ibb.co/4FzhJdF/Header.png" />
        <nav className="opcions-menu">
        <ul>
            <li>
                {/* <a href="#genres">Géneros</a> */}
                <MultiSelectDropdown
              options={options}
              selectedOptions={selectedOptions}
              onChange={onDropdownChange}
              onClear={onDropdownClear}
              title="Géneros"
            />
            </li>
            <li><a href="#clasification">Clasificación</a></li>
            <li><a href="#studie">Estudio</a></li>
            <li><a href="#Age">Año</a></li>
        </ul>
    </nav>    
    </section>
   
    </>
)
}
export default Header;


