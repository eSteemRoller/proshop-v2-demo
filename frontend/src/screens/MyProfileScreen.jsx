
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Table,
  Button,
  FormLabel,
  FormControl
} from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaTimes } from 'react-icons/fa';
import { useUpdateMyUserProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authApiSlice";
import { useReadMyOrdersQuery } from "../slices/ordersApiSlice";
import Paginate from "../components/Paginate";


export default function MyProfileScreen() { 
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    primaryEmail: '', 
    secondaryEmail: '', 
    primaryPhone: '', 
    secondaryPhone: '', 
    password: '', 
    confirmPassword: '' });
  
  const { 
    firstName, 
    lastName, 
    primaryEmail, 
    secondaryEmail, 
    primaryPhone, 
    secondaryPhone, 
    password, 
    confirmPassword 
  } = formData;

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateMyUserProfile, { isLoading: isUpdating, refetch }] =
    useUpdateMyUserProfileMutation();

  const { pageNumber } = useParams();
  const page = pageNumber || 1;
  const { 
    data, 
    isLoading, 
    error 
  } = useReadMyOrdersQuery({ 
    userId: userInfo._id,
    pageNumber: page 
  });

useEffect(() => { 
  if (userInfo) { 
    const { 
      firstName = '', 
      lastName = '', 
      primaryEmail = '', 
      secondaryEmail = '', 
      primaryPhone = '', 
      secondaryPhone = '' 
    } = userInfo; 
    
    setFormData((prev) => ({ 
      ...prev, 
      firstName, 
      lastName, 
      primaryEmail, 
      secondaryEmail, 
      primaryPhone, 
      secondaryPhone 
    })); 
  } 
}, [userInfo]);

  async function submitHandler(formSubmit) {
    formSubmit.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateMyUserProfile({ 
          _id: userInfo._id, 
          ...formData 
        })
        .unwrap();
        dispatch(setCredentials(res));
        toast.success("Success: Profile updated");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
    console.log("submitHandler");
  };

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  return (
    <Row>
      <Col md={4} className='mr-10'>
        <h2>My Profile</h2>
        <h3>General</h3>
        {/* <h5>* = Required</h5> */}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="firstName" className="my-2">
            <FormLabel>First Name:</FormLabel>
            <FormControl
              type='text'
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="lastName" className="my-2">
            <FormLabel>Last Name:</FormLabel>
            <FormControl
              type='text'
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="primaryEmail" className="my-2">
            <FormLabel>Primary E-Mail Address (part of your log-in credentials):</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter primary e-mail address"
              value={primaryEmail}
              onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="secondaryEmail" className="my-2">
            <FormLabel>Secondary E-Mail Address:</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter secondary e-mail address"
              value={secondaryEmail}
              onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="primaryPhone" className="my-2">
            <FormLabel>Primary Phone Number:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter primary phone number"
              value={primaryPhone}
              onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="secondaryPhone" className="my-2">
            <FormLabel>Secondary Phone Number:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter secondary phone number"
              value={secondaryPhone}
              onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="password" className="my-2">
            <FormLabel>Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="confirmPassword" className="my-2">
            <FormLabel>Confirm Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value }) }
            ></FormControl>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Link to={redirect} className='btn btn-light my-2 text-decoration-none'>
              Cancel
            </Link>
            <Button 
              type="submit"  
              variant="primary" 
              className="my-2" 
              onClick={submitHandler}
            >
              Save
            </Button>
          </div>
          {isUpdating && userInfo && <Loader />}
        </Form>
      </Col>

      <Col md={8} className='ml-10'>
        <h2>My Orders</h2>
        {isLoading ? <Loader />
          : error ? 
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th>DELIVERED</th>
                <th>REVIEWED</th>
                <th>*button placeholder*</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map(order => ( 
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdWhen.substring(0, 10)}</td>
                  <td>{order.cartTotal}</td>
                  <td>
                    { order.isPaid ? (
                      order.paidWhen.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    { order.isDelivered ? (
                      order.deliveredWhen.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link 
                      to={`/user/${userInfo._id}/my_orders/order/${order._id}`} 
                      className="btn btn-light btn-sm" 
                    > 
                      Order Details 
                    </Link>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        )}
        <Paginate 
          totalPages={data?.totalPages} 
          currentPage={data?.currentPage} 
          basePath={`/user/${userInfo._id}/my_orders`} 
          firstPageIsBasePath={true}
        />
      </Col>
    </Row>
  );
};
