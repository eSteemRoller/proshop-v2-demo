
import { Table, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetAllOrdersQuery } from '../../slices/ordersApiSlice';


export default function AllOrdersListScreen() {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  console.log(orders);

  return (
    <>
      <h1>All Orders</h1>
      {isLoading ? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message> 
        : ( 
          <Table 
            strong
            striped 
            hover 
            responsive 
            className='table-sm'
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th>DELIVERED</th>
                <th>REVIEWED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => ( 
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdWhen.substring(0, 10)}</td>
                  <td>{order.cartTotal}</td>
                  <td>
                    {order.isPaid ? ( 
                      order.paidWhen.substring(0, 10)
                    ) : ( 
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isShipped ? ( 
                      order.shippedWhen.substring(0, 10)
                    ) : ( 
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? ( 
                      order.deliveredWhen.substring(0, 10)
                    ) : ( 
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Nav to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </Nav>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        )
      };
      <Link to='/' className='btn btn-light my-2 text-decoration-none'>
        Cancel
      </Link>
    </>
  )
};
