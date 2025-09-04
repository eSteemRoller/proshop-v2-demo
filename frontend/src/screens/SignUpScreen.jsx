
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useSignUpMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


export default function SignUpScreen() { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, { isSigningIn }] = useSignUpMutation();

  const { userInfo } = useSelector((authState) => authState.auth);

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
      toast.error('Passwords do not match');
      return;
    } else { 
      try {
      const dbResponse = await signUp({ name, email, password }).unwrap();
      dispatch(setCredentials({...dbResponse, }));
      navigate(redirect);
      console.log('Sign in form submit');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return ( 
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={signInHandler}>
        <Form.Group controlId='name' className='my-4'>
          <Form.Label>First and Last Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your first and last name'
            value={name}
            onChange={(formSubmit) => setName(formSubmit.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email' className='my-4'>
          <Form.Label>E-mail Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter e-mail'
            value={email}
            onChange={(formSubmit) => setEmail(formSubmit.target.value)}
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
            `/signin?redirect=${redirect}` : 
              '/signin'}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
