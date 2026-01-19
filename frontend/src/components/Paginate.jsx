
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default function Paginate({ totalPages, currentPage, isAdmin = false }) { 


  return ( 
    totalPages > 1 && ( 
      <Pagination>
        {[...Array(totalPages).keys()].map((x) => ( 
          <LinkContainer 
            key={x + 1}
            to={ 
              !isAdmin
                ? `/page/${x + 1}`
                : `/admin/all_products/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === currentPage}>{x + 1}</Pagination.Item>
          </LinkContainer>
        )) }
      </Pagination>
    )
  );
};