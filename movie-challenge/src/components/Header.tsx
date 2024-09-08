import { MultiSelectDropdown } from "./ListOptions";
import { FC } from "react";
import { Option } from "./ListOptions";
import { MultiSelectDropdownOptions } from "../utils/opciosyear";
// import { MultiSelectDropdownYear } from "../utils/opciosyear";

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
  //SORT BY
  VoteOptions: Option[];
  selectedVote: Option[];
  onVoteChange: (selected: Option[]) => void;
  onVoteClear: () => void;
}
const Header: FC<HeaderProps> = ({
  options,
  selectedOptions,
  onDropdownChange,
  onDropdownClear,
  YearOptions,
  selectedYear,
  onYearChange,
  onYearClear,
  VoteOptions,
  selectedVote,
  onVoteChange,
  onVoteClear,
}) => {
  return (
    <>
      <section className="header">
        <img
          className="header-background"
          src="https://i.ibb.co/4FzhJdF/Header.png"
        />
        <img
          className="logo-Header"
          src="https://i.ibb.co/dftc719/Group-1-2.png"
        />
        <nav className="opcions-menu">
          <ul>
            <li>
              {/* <a href="#genres">Géneros</a> */}
              <MultiSelectDropdown
                options={options}
                selectedOptions={selectedOptions}
                onChange={onDropdownChange}
                onClear={onDropdownClear}
                title="Genres"
              />
            </li>
            <li>
              {/* <a href="#genres">Géneros</a> */}
              <MultiSelectDropdownOptions
                options={YearOptions}
                selectedOptions={selectedYear}
                onChange={onYearChange}
                onClear={onYearClear}
                title="Year"
              />
            </li>

            <li>
              <MultiSelectDropdownOptions
                options={VoteOptions}
                selectedOptions={selectedVote}
                onChange={onVoteChange}
                onClear={onVoteClear}
                title="Vote"
              />
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};
export default Header;
