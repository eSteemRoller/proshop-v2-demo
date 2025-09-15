
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Form, ListGroup, Card, Image, Button, ListGroupItem } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';;
import { useReadUserOrderDetailsQuery } from '../slices/ordersApiSlice';


export default function OrderScreen() {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = 
    useReadUserOrderDetailsQuery(orderId);


  return isLoading ? <Loader /> : 
      error ? <Message variant='danger' /> : ( 
        <>
          <h1>Order {order._id} Review</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Billing</h2>
                  <p>
                    <strong>Name: </strong> { (order.user.firstName, order.user.lastName) }
                  </p>
                  <p>
                    <strong>E-mail: </strong> { order.user.email }
                  </p>
                  <p>
                    <strong>Address: </strong> 
                    { order.billingAddress.address },
                    { order.billingAddress.unitOrSte },
                    { order.billingAddress.city }{' '},
                    { order.billingAddress.postalCode },
                    { order.billingAddress.country },
                  </p>
                  { order.isDelivered ? ( 
                    <Message variant='success'>
                      Delivered on {order.deliveredWhen}
                    </Message>
                  ) : ( 
                    <Message variant='danger'>
                      Not Delivered
                    </Message>
                  ) }
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  { order.isPaid ? ( 
                    <Message variant='success'>
                      Paid on {order.paidWhen}
                    </Message>
                  ) : ( 
                    <Message variant='danger'>
                      Not Paid
                    </Message>
                  ) }
                </ListGroupItem>

                <ListGroupItem>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, index) => ( 
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
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
                      <Col>Sub-total:</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Shipping:</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>

                    <Row>
                      <Col>Tax:</Col>
                      <Col>${order.taxCost}</Col>
                    </Row>

                    <Row>
                      <Col>Total:</Col>
                      <Col>${order.cartTotal}</Col>
                    </Row>
                  </ListGroupItem>
                  {/* pay order placeholder */}
                  {/* mark as delivered placeholder */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
};
