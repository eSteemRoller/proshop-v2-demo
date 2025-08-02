
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { useGetProductsQuery } from '../slices/productsApiSlice';


export default function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

    return (
        <>
          {isLoading ? ( 
            <Loader />
          ) : error ? (<div>{ error?.data?.message || error.error }</div>) : (<>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <div className='h-100 d-flex'>
                            <Product product={product} />
                        </div>
                    </Col>
                )) }
            </Row>
          </>) }
        </>
    );
};

