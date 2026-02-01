
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useReadAllProductsQuery } from '../slices/productsApiSlice';


export default function HomeScreen() { 
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useReadAllProductsQuery({ pageNumber });

  return (
    <>
      {isLoading ? ( 
        <Loader />
      ) : error ? (
        <Message variant='danger'> 
          { error?.data?.message || error.error } 
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data?.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <div className='h-100 w-100 d-flex'>
                  <Product product={product} />
                </div>
              </Col>
            )) }
          </Row>
          <Paginate 
            totalPages={data.totalPages} 
            currentPage={data.currentPage} 
            basePath="/page"
            firstPageIsBasePath={true}
          />
        </>
      )}
    </>
  );
};

