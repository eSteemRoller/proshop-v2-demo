
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Table,
  Button,
  FormLabel,
  FormControl,
  Nav
} from "react-bootstrap";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaTimes } from 'react-icons/fa';
import { useUpdateMyUserProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authApiSlice";
import { useReadMyOrdersQuery } from "../slices/ordersApiSlice";


export default function MyProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateMyUserProfile, { isLoading: isUpdating }] =
    useUpdateMyUserProfileMutation();

  const { data: orders, isLoading, err } = useReadMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setPrimaryEmail(userInfo.primaryEmail);
      setSecondaryEmail(userInfo.secondaryEmail);
      setPrimaryPhone(userInfo.primaryPhone)
      setSecondaryPhone(userInfo.secondaryPhone)
    }
  }, [userInfo, 
    userInfo.firstName, 
    userInfo.lastName, 
    userInfo.primaryEmail,
    userInfo.secondaryEmail,
    userInfo.primaryPhone,
    userInfo.secondaryPhone
  ]);

  async function submitHandler(formSubmit) {
    formSubmit.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateMyUserProfile({
          _id: userInfo._id,
          firstName,
          lastName,
          primaryEmail,
          secondaryEmail,
          primaryPhone,
          secondaryPhone,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Success: Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
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
              onChange={(formSubmit) => setFirstName(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="lastName" className="my-2">
            <FormLabel>Last Name:</FormLabel>
            <FormControl
              type='text'
              placeholder="Enter last name"
              value={lastName}
              onChange={(formSubmit) => setLastName(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="primaryEmail" className="my-2">
            <FormLabel>Primary E-Mail Address (part of your log-in credentials):</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter e-mail address"
              value={primaryEmail}
              onChange={(formSubmit) => setPrimaryEmail(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="secondaryEmail" className="my-2">
            <FormLabel>Secondary E-Mail Address:</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter e-mail address"
              value={secondaryEmail}
              onChange={(formSubmit) => setSecondaryEmail(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="primaryPhone" className="my-2">
            <FormLabel>Primary Phone Number:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter primary phone number"
              value={primaryPhone}
              onChange={(formSubmit) => setPrimaryPhone(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="secondaryPhone" className="my-2">
            <FormLabel>Secondary Phone Number:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter secondary phone number"
              value={secondaryPhone}
              onChange={(formSubmit) => setSecondaryPhone(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="password" className="my-2">
            <FormLabel>Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(formSubmit) => setPassword(formSubmit.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="confirmPassword" className="my-2">
            <FormLabel>Confirm Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(formSubmit) => setConfirmPassword(formSubmit.target.value)}
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
        {isLoading ? (
          <Loader />
        ) : err ? (
          <Message variant="danger">
            {err?.data?.message || err.error}
          </Message>
        ) : (
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
                <th>{/*button placeholder*/}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => ( 
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
                    <Button className='btn-sm' variant='light'>
                      <Nav to={`/order/${order._id}`}>
                        Order Details
                      </Nav>
                    </Button>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
