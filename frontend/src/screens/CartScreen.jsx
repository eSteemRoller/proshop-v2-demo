
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';


export default function CartScreen() { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((cartState) => cartState.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, productQty) => { 
    dispatch(addToCart({ ...product, productQty }));
  };

  const removeFromCartHandler = async (id) => { 
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/billing');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{marginBottom: '16px'}}>Shopping Cart</h1>
        { cartItems.length === 0 ? ( 
          <Message>
            Your cart is empty! <Link to='/'>Return to Latest Products</Link>
          </Message>
          ) : ( 
          <ListGroup variant='flush'>
            { cartItems.map((item) => ( 
              <ListGroup.Item key={ item._id }>
                <Row>
                    <Col md={3}>
                      <Image src={ item.image } alt={ item.name } fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={ `/product/${item._id}` }>{ item.name }</Link>
                    </Col>
                    <Col md={2}>
                      ${ item.price }
                    </Col>
                    <Col md={2}>
                      <Form.Control 
                          as='select'
                          value={item.productQty}
                          onChange={(e) => 
                            addToCartHandler(item, Number(e.target.value))}
                        >
                          {[...Array(item.countInStock).keys()].map((xItem) =>
                            <option key={xItem + 1} value={xItem + 1}>
                              {xItem + 1}
                            </option>)
                          }
                        </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button 
                        type='button' 
                        variant='light' 
                        onClick={ () => removeFromCartHandler(item._id) }
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>
                Sub-total of your ({ cartItems.reduce((acc, item) => acc + item.productQty, 0) }) item(s):
              </h3>
              ${ cartItems.reduce((acc, item) => acc + item.productQty * item.price, 0)
                .toFixed(2) }
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={ cartItems.length === 0 }
                onClick={ checkoutHandler }
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}