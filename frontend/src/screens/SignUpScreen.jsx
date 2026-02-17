import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useSignUpMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authApiSlice';
import { toast } from 'react-toastify';


export default function SignUpScreen() { 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, { isSigningIn }] = useSignUpMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => { 
      if (userInfo) { 
        navigate(redirect);
      }
    }, [userInfo, redirect, navigate]
  );

  const signInHandler = async (signInFormSubmit) => { 
    signInFormSubmit.preventDefault();
    if (password !== confirmPassword) { 
      toast.error("Error: Passwords do not match");
      return;
    } else { 
      try {
      const dbResponse = await signUp({ firstName, lastName, primaryEmail, password }).unwrap();
      dispatch(setCredentials({...dbResponse, }));
      navigate(redirect);
      console.log('Sign in form submit');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return ( 
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={signInHandler}>
        <Form.Group controlId='firstName' className='my-4'>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your first name'
            value={firstName}
            onChange={(formSubmit) => setFirstName(formSubmit.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName' className='my-4'>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your last name'
            value={lastName}
            onChange={(formSubmit) => setLastName(formSubmit.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='primaryEmail' className='my-4'>
          <Form.Label>E-mail Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your best e-mail address'
            value={primaryEmail}
            onChange={(formSubmit) => setPrimaryEmail(formSubmit.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-4'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(formSubmit) => setPassword(formSubmit.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-4'>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(formSubmit) => setConfirmPassword(formSubmit.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button 
          type='submit' 
          variant='primary' 
          className='mt-4'
          disabled={ isSigningIn }
        >
          Sign Up
        </Button>
        { isSigningIn && <Loader /> }
      </Form>
      <Row className='py-4'>
        <Col>
          Already signed up? <Link to={ redirect ? 
            `/sign_in?redirect=${redirect}` : 
              '/sign_in'}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};