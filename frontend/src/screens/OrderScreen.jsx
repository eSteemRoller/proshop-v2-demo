
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem, Card, Image, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { 
  useReadUsersOrderDetailsQuery,
  usePayOrderMutation,
  useReadPayPalClientIdQuery,
  useUpdateOrderAsDeliveredMutation
} from '../slices/ordersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


export default function MyOrdersScreen() {
  const { id: orderId } = useParams();
  const { 
    data: order, 
    refetch, 
    isLoading, 
    err 
  } = useReadUsersOrderDetailsQuery(orderId);
  
  const [payOrder, { isLoading:isLoadingPaid }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { 
    data: paypal, 
    isLoading: isLoadingPayPal, 
    err: errPayPal 
  } = useReadPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateOrderAsDelivered, { isLoading: isLoadingDelivered }] = useUpdateOrderAsDeliveredMutation();

  useEffect(() => { 
    if (!errPayPal && !loadingPayPal && paypal.clientId) { 
      const loadPayPalScript = async () => { 
        paypalDispatch({ 
          type: 'resetOptions',
          value: { 
            'client-id': paypal.clientId,
            currency: 'USD',
          }
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      }
      if (order && !order.isPaid) { 
        if (!window.paypal) { 
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, isLoadingPayPal, errPayPal]);


  async function onApproveTester() { 
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Order marked as paid (for testing purposes)');
  }

  function createOrder(data, actions) { 
    return actions.order.create({ 
      purchase_units: [ 
        { 
          amount: { 
            value: order.cartTotal,
          },
        },
      ],
    }).then((orderId) => { 
      return orderId;
    });
  }

  function onApprove(data, actions) { 
    return actions.order.capture().then(async function (details) {
      try { 
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (err) { 
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  function onError(err) { 
    toast.error(err.message);
  }

  async function deliveredOrderHandler(isDelivered) { 
    try { 
      await updateOrderAsDelivered(orderId);
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  return isLoading ? <Loader /> : 
      err ? <Message variant='danger' /> : ( 
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
                    <strong>E-mail: </strong> { order.user.primaryEmail }
                  </p>
                  <p>
                    <strong>Address: </strong> 
                    { order.primaryBillingAddress.address },
                    { order.primaryBillingAddress.unitOrSte },
                    { order.primaryBillingAddress.city }{' '},
                    { order.primaryBillingAddress.postalCode },
                    { order.primaryBillingAddress.country },
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
                  { !order.isPaid && ( 
                    <ListGroupItem>
                      {isLoadingPaid && <Loader />}

                      {isPending ? <Loader /> : (
                        <div>
                          <Button 
                            onClick={onApproveTester}
                            style={{marginBottom: '12px'}}
                          >
                            Paid Order Tester
                          </Button>
                          <div>
                            <PayPalButtons 
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroupItem>
                  )}
                  {isLoadingDelivered && <Loader />}

                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && ( 
                    <ListGroupItem>
                      <Button 
                        type='button' 
                        className='btn btn-block' 
                        onClick={deliveredOrderHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      );
};
