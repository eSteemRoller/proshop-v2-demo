
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Paginate({ totalPages, currentPage, basePath }) { 
  if (totalPages <= 1) return null;

  return ( 
    <Pagination>
      {[...Array(totalPages).keys()].map((x) => { 
        const page = x + 1;

        return (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            as={Link}
            to={page === 1 ? basePath : `${basePath}/${page}`}
          >
            {page}
          </Pagination.Item>
        );
      }) }
    </Pagination>
  );
};
