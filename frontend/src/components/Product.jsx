import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';


export default function Product({ product }) {
  return (
    <div className='mb-4'>
        <Card className='my-2 p-3 rounded h-100 d-flex flex-column'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating 
                        value={ product.rating } 
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='h5'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
};