
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartApiSlice';
import CheckoutSteps from '../components/CheckoutSteps';


export default function ShippingScreen() { 
  const cart = useSelector((cartState) => cartState.cart);
  const { cartShippingAddress } = cart;

  const [shippingAddress, setShippingAddress] = 
    useState(cartShippingAddress?.shippingAddress || '');
  const [shippingCity, setShippingCity] = 
    useState(cartShippingAddress?.shippingCity || '');
  const [shippingState, setShippingState] = 
    useState(cartShippingAddress?.shippingState || '');
  const [shippingPostalCode, setShippingPostalCode] = 
    useState(cartShippingAddress?.shippingPostalCode || '');
  const [shippingCountry, setShippingCountry] = 
    useState(cartShippingAddress?.shippingCountry || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingFormHandler = (shippingAddressChange) => { 
    shippingAddressChange.preventDefault();
    dispatch(saveShippingAddress({ 
      shippingAddress, 
      shippingCity, 
      shippingState, 
      shippingPostalCode, 
      shippingCountry,
    }));
    navigate('/payment');
  };

  return ( 
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Shipping</h1>

      <Form onSubmit={shippingFormHandler}>
        <Form.Group controlId='shippingAddress' className='my-4'>
          <Form.Label>Address:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter shipping address'
            value={shippingAddress}
            onChange={(shippingAddressChange) => setShippingAddress(shippingAddressChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='shippingCity' className='my-4'>
          <Form.Label>City:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter shipping city'
            value={shippingCity}
            onChange={(shippingCityChange) => setShippingCity(shippingCityChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='shippingState' className='my-4'>
          <Form.Label>State:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter shipping state'
            value={shippingState}
            onChange={(shippingStateChange) => setShippingState(shippingStateChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='shippingPostalCode' className='my-4'>
          <Form.Label>Postal Code:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter shipping postal code'
            value={shippingPostalCode}
            onChange={(shippingPostalCodeChange) => setShippingPostalCode(shippingPostalCodeChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='shippingCountry' className='my-4'>
          <Form.Label>Country:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter shipping country'
            value={shippingCountry}
            onChange={(shippingCountryChange) => setShippingCountry(shippingCountryChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit' 
          variant='primary' 
          className='my-4'
        >
          Continue to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};