import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Font Awesome icons

function Pagination({ currentPage, totalPages, onSelectPage }: { currentPage: number; totalPages: number; onSelectPage: (page: number) => void; }) {
  const pageNumber = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  const onNextPage = () => {
    onSelectPage(currentPage + 1);
  };

  const onPreviusPage = () => {
    onSelectPage(currentPage - 1);
  };

  const onSpecificPage = (page: number) => {
    onSelectPage(page);
  };

  return (
    <nav className="pagination">
      <a
        className={`previous-page-${currentPage === 1 ? "is-disabled" : ""}`}
        onClick={onPreviusPage}
      >
        <FaArrowLeft size={24} /> {/* Icono de flecha izquierda */}
      </a>
      <ul className="pagination-list">
        {pageNumber.map((noPage) => (
          <li key={noPage}>
            <a
              className={`${noPage === currentPage ? "is-current" : ""}`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
          </li>
        ))}
      </ul>
      <a
        className={`next-page-${currentPage >= pageNumber.length ? "is-disabled" : ""}`}
        onClick={onNextPage}
      >
        <FaArrowRight size={24} /> {/* Icono de flecha derecha */}
      </a>
    </nav>
  );
}

export default Pagination;