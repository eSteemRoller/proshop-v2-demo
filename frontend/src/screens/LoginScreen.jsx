
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';


export default function LoginScreen() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (formSubmit) => { 
    formSubmit.preventDefault();
    console.log('submit')
  }

  return ( 
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-4'>
          <Form.Label>E-mail Address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter e-mail'
            value={email}
            onChange={(formSubmit) => setEmail(formSubmit.target.value)}
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
        <Button type='submit' variant='primary' className='mt-4'>
            Sign In
        </Button>
      </Form>
      <Row className='py-4'>
        <Col>
          First visit? <Link to='/signup'>Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}