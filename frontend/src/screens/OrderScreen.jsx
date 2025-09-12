
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Card, Image, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateUserOrderMutation } from '../slices/ordersApiSlice';
import { clearCartAfterOrder } from '../slices/cartSlice';
import { ListGroupItem } from "react-bootstrap";


export default function OrderScreen() { 
  const navigate = useNavigate();
  const cart = useSelector((cartState) => cartState.cart);

  useEffect(() => { 
    if (!cart.billingAddress.address || !cart.shippingAddress.address) { 
      navigate('/shipping');
    } else if (!cart.paymentMethod) { 
      navigate('/payment');
    }
  }, [cart.billingAddress.address, cart.shippingAddress.address, navigate]);

  return ( 
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Billing</h2>
              <p><strong>Address:</strong></p>
              <p>{cart.billingAddress.address}, {cart.billingAddress.unitOrSte}</p>
              <p>{cart.billingAddress.city}, {cart.billingAddress.postalCode}</p>
              <p>{cart.billingAddress.country}</p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p><strong>Address:</strong></p>
              <p>{cart.shippingAddress.address}, {cart.shippingAddress.unitOrSte}</p>
              <p>{cart.shippingAddress.city}, {cart.shippingAddress.postalCode}</p>
              <p>{cart.shippingAddress.country}</p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              <p>{cart.paymentMethod}</p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? ( 
                <Message>Your cart is empty! 
                  <strong onClick={() => navigate('/user')}>Return to Latest Products</strong>
                </Message>
              ) : ( 
                <ListGroup>
                  { cart.orderItems.map((item, index) => ( 
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          { item.qty } x ${ item.price } = 
                            ${ item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )) }
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Sub-total of Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
