import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useSignInMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authApiSlice';
import { toast } from 'react-toastify';
import Message from '../components/Message';


export default function SignInScreen() { 
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signIn, { isSigningIn }] = useSignInMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';
  const sessionExpired = searchParams.get('sessionExpired');

  useEffect(() => { 
      if (userInfo) { 
        navigate(redirect);
      }
    }, [userInfo, redirect, navigate]
  );

  const signInHandler = async (signInFormSubmit) => { 
    signInFormSubmit.preventDefault();
    console.log('Sign in form submit');
    try {
      const dbResponse = await signIn({ primaryEmail, password }).unwrap();
      dispatch(setCredentials({...dbResponse, }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return ( 
    <FormContainer>
      <h1>Sign In</h1>
      {sessionExpired && (
        <Message variant='warning'>
          Your session expired. Please sign in again.
        </Message>
      )}
      <Form onSubmit={signInHandler}>
        <Form.Group controlId='primaryEmail' className='my-4'>
          <Form.Label>E-mail Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter e-mail'
            value={primaryEmail}
            onChange={(formSubmit) => setPrimaryEmail(formSubmit.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-4'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(formSubmit) => setPassword(formSubmit.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-4'
          disabled={ isSigningIn }
        >
          Sign In
        </Button>
        { isSigningIn && <Loader /> }
      </Form>
      <Row className='py-4'>
        <Col>
          First visit? <Link to={ redirect ? 
            `/sign_up?redirect=${redirect}` : 
              '/sign_up'}>Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};