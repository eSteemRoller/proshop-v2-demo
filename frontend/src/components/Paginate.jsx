
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Paginate({ 
  totalPages, 
  currentPage, 
  basePath, 
  firstPageIsBasePath = false
 }) { 
  if (totalPages < 1) return null;

  // Remove leading/trailing slashes for safe concatenation 
  const cleanBase = basePath.replace(/^\/+|\/+$/g, ''); 
  const buildLink = (page) => { 
    if (page === 1 && firstPageIsBasePath) { 
      return cleanBase 
        ? `/${cleanBase}` 
        : '/'; 
    } 
    return cleanBase 
      ? `/${cleanBase}/page/${page}` 
      : `/page/${page}`; 
  }; 
  
  return ( 
    <Pagination> 
      {[...Array(totalPages).keys()].map((x) => { 
        const page = x + 1; 
        return ( 
          <Pagination.Item 
            key={page} 
            active={page === currentPage} 
            as={Link} to={buildLink(page)} 
          > {page} 
          </Pagination.Item> 
        ); 
      })} 
    </Pagination> 
); }
