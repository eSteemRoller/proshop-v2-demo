
import { Form, Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';


export default function PaymentScreen() { 
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((cartState) => cartState.cart);
  const { shippingAddress } = cart;

  useEffect(() => { 
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitPHandler = (event) => { 
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/order');
  }
  
  return ( 
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={ submitPHandler }>
        <Form.Group>
          <Form.Label as='legend'>
            Select Payment Method
          </Form.Label>
          <Col>
            <Form.Check 
              type='radio'
              className='my-4'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};