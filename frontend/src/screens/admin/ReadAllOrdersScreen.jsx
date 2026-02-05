
import { Table, Button, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useReadAllOrdersQuery } from '../../slices/ordersApiSlice';
import Paginate from '../../components/Paginate';


export default function ReadAllOrdersScreen() { 
  const { pageNumber } = useParams();
  const page = pageNumber || 1;
  const { data, isLoading, error } = useReadAllOrdersQuery({ pageNumber: page });


  return (
    <>
      <h1>All Orders</h1>
      {isLoading ? <Loader /> 
        : error ? 
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message> 
        : ( 
          <Table 
            striped 
            hover 
            responsive 
            className='table-sm'
          >
            <thead>
              <tr>
                <th>USER ID</th>
                <th>USER NAME</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th>DELIVERED</th>
                <th>REVIEWED</th>
                <th>SUBSCRIBED (BEFORE)</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => ( 
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
                    <Nav to={`/admin/all_orders/order/${order._id}`}>
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
      }
      <Paginate 
        totalPages={data?.totalPages} 
        currentPage={data?.currentPage} 
        basePath="/admin/all_orders/:pageNumber" 
        firstPageIsBasePath={true}
      />
      <Link to='/' className='btn btn-light my-2 text-decoration-none'>
        Cancel
      </Link>
    </>
  )
};
