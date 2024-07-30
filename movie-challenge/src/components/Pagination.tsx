// import { getMovies } from "../services/APIService";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Font Awesome icons
function Pagination ({
  currentPage,
  totalPages,
  onSelectPage
}: {
  currentPage: number;
  totalPages: number;
  onSelectPage: (page: number) => void;
}) {
  // let page='';
  // let beforePage = page -1;
  // let afterPage = page +1;
  // let currentPage;

  // if(page>1){
  //   currentPage =
  // }
  const pageNumber = [];
  console.log(totalPages);

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }
  const onNextPage = () => {

      onSelectPage(currentPage + 1);
    
  }
  const onPreviusPage = () => {
    
      onSelectPage(currentPage - 1);
    
  }
  //para cambiar de un pagina a otra 
  const onSpecificPage =(page:number)=>{
    console.log("Specific Page clicked:", page);
    onSelectPage(page)
  }
  return (
    <nav className="pagination">
        <a className={`previous-page-${currentPage === 1 ? 'is-disabled':''}`} onClick={onPreviusPage}>
          <FaArrowLeft size={24} /> {/* Icono de flecha izquierda */}
        </a>
        <a className={`next-page-${currentPage>=pageNumber.length ? 'is-disabled':'' }`} onClick={onNextPage}>
          <FaArrowRight size={24} /> {/* Icono de flecha derecha */}
        </a>
        <ul className='pagination-list'>
          {pageNumber.map(noPage => (
            <li key={noPage}>
              <a className={`pagination-${noPage===currentPage ? 'is-current':''}`} onClick={() => onSpecificPage(noPage)}>
                {noPage}
              </a>
            </li>
          ))}
        
        </ul> 
        
    </nav>
  );
}
    export default Pagination;

 
    