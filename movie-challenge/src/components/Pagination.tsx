import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Font Awesome icons

function Pagination({
  currentPage,
  totalPages,
  onSelectPage,
}: {
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
}) {
  const onNextPage = () => {
    onSelectPage(currentPage + 1);
  };

  const onPreviusPage = () => {
    onSelectPage(currentPage - 1);
  };

  const onSpecificPage = (page: number) => {
    onSelectPage(page);
  };

  const generatePageNumbers = () => {
  const pageNumber = [];
  const maxPagesToShow = 10;
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumber.push(i);
  // }
// ATRAS - SIGUIENTE

  
  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumber.push(i);
    }
  }else {
    const startPages = [1, 2, 3];
    const endPages = [totalPages - 2, totalPages - 1, totalPages];
    const middlePages = [];

    if (currentPage > 4 && currentPage < totalPages - 3) {
      middlePages.push(currentPage - 1, currentPage, currentPage + 1);
    } else if (currentPage <= 4) {
      middlePages.push(4, 5, 6);
    } else if (currentPage >= totalPages - 3) {
      middlePages.push(totalPages - 5, totalPages - 4, totalPages - 3);
    }

    pageNumber.push(...startPages);
    
    if (currentPage > 4) {
      pageNumber.push('...');
      }

      pageNumber.push(...middlePages);

      if (currentPage < totalPages - 3) {
        pageNumber.push('...');
      }

      pageNumber.push(...endPages);
    
  }
  return pageNumber;
}
const displayedPages = generatePageNumbers();

  return (
    <nav className="pagination">
      <a
        className={`previous-page-${currentPage === 1 ? "is-disabled" : ""}`}
        onClick={onPreviusPage}
      >
        <FaArrowLeft size={15} /> {/* Icono de flecha izquierda */}
      </a>
      <ul className="pagination-list">
        {displayedPages.map((noPage) => (
          <li key={noPage}>
            {typeof noPage === "number" ? (
            <a
              className={`${noPage === currentPage ? "is-current" : ""}`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </a>
             ) : (
              <span>...</span>
            )}
          </li>
        ))}
      </ul>
      <a
        className={`next-page-${
          currentPage >= displayedPages.length ? "is-disabled" : ""
        }`}
        onClick={onNextPage}
      >
        <FaArrowRight size={15} /> {/* Icono de flecha derecha */}
      </a>
    </nav>
  );
}

export default Pagination;
