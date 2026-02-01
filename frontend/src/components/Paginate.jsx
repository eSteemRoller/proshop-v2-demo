
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Paginate({ 
  totalPages, 
  currentPage, 
  basePath, 
  firstPageIsBasePath = false
 }) { 
  if (totalPages < 1) return null;

  return ( 
    <Pagination>
      {[...Array(totalPages).keys()].map((x) => { 
        const page = x + 1;

        const pagLink =
          page === 1 && firstPageIsBasePath
            ? basePath
            : `${basePath}/${page}`;

        return (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            as={Link}
            to={pagLink}
          >
            {page}
          </Pagination.Item>
        );
      }) }
    </Pagination>
  );
};
