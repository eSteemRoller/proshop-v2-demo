
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Paginate({ totalPages, currentPage, isAdmin = false }) { 
  return ( 
    totalPages > 1 && ( 
      <Pagination>
        {[...Array(totalPages).keys()].map((x) => ( 
          <Pagination.Item
            key={x + 1}
            active={x + 1 === currentPage}
            as={Link}
            to={ 
              !isAdmin
                ? `/page/${x + 1}`
                : `/admin/all_products/${x + 1}`
            }
          >
            {x + 1}
          </Pagination.Item>
        )) }
      </Pagination>
    )
  );
};
