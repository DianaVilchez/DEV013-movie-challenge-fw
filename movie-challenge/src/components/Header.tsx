
import  {MultiSelectDropdown}  from "../utils/MultiSelectDropdown";
import { FC } from 'react';
import { Option } from '../utils/MultiSelectDropdown';
import { MultiSelectDropdownYear } from "../utils/opciosyear";

interface HeaderProps {
  options: Option[];
  selectedOptions: Option[];
  onDropdownChange: (selected: Option[]) => void;
  onDropdownClear: () => void;
//AGES
  YearOptions: Option[];
  selectedYear: Option[];
  onYearChange: (selected: Option[]) => void;
  onYearClear: () => void;
}
const Header: FC<HeaderProps> = ({ options, selectedOptions, onDropdownChange, onDropdownClear ,YearOptions,
  selectedYear,
  onYearChange,
  onYearClear}) => {
    return (
    <>
    <section className="header">
        <img className="header-background" src="https://i.ibb.co/4FzhJdF/Header.png" />
        <img className='logo-Header' src="https://i.ibb.co/dftc719/Group-1-2.png" />
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
            <li>
                {/* <a href="#genres">Géneros</a> */}
                <MultiSelectDropdownYear
              options={YearOptions}
              selectedOptions={selectedYear}
              onChange={onYearChange}
              onClear={onYearClear}
              title="Year"
            />
            </li>
            {/* <li><a href="#clasification">Clasificación</a></li> */}
            <li><a href="#studie">Valoración</a></li>
        </ul>
    </nav>    
    </section>
   
    </>
)
}
export default Header;


