
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'


const HomeScreen = () => {
    return (
        <>
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
        </>
    );
};

export default HomeScreen;