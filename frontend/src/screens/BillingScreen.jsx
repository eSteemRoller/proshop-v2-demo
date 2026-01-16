
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveBillingAddress } from '../slices/cartApiSlice';
import CheckoutSteps from '../components/CheckoutSteps';


export default function BillingScreen() { 
  const cart = useSelector((state) => state.cart);
  const { cartBillingAddress } = cart;

  const [billingAddress, setBillingAddress] = 
    useState(cartBillingAddress?.billingAddress || '');
  const [billingCity, setBillingCity] = 
    useState(cartBillingAddress?.billingCity || '');
  const [billingState, setBillingState] = 
    useState(cartBillingAddress?.billingState || '');
  const [billingPostalCode, setBillingPostalCode] = 
    useState(cartBillingAddress?.billingPostalCode || '');
  const [billingCountry, setBillingCountry] = 
    useState(cartBillingAddress?.billingCountry || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const billingFormHandler = (billingAddressChange) => { 
    billingAddressChange.preventDefault();
    dispatch(saveBillingAddress({ 
      billingAddress, 
      billingCity, 
      billingState, 
      billingPostalCode, 
      billingCountry,
    }));
    navigate('/shipping');
  };

  return ( 
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>Billing</h1>

      <Form onSubmit={billingFormHandler}>
        <Form.Group controlId='billingAddress' className='my-4'>
          <Form.Label>Address:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter billing address'
            value={billingAddress}
            onChange={(billingAddressChange) => setBillingAddress(billingAddressChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='billingCity' className='my-4'>
          <Form.Label>City:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter billing city'
            value={billingCity}
            onChange={(billingCityChange) => setBillingCity(billingCityChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='billingState' className='my-4'>
          <Form.Label>State:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter billing state'
            value={billingState}
            onChange={(billingStateChange) => setBillingState(billingStateChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='billingPostalCode' className='my-4'>
          <Form.Label>Postal Code:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter billing postal code'
            value={billingPostalCode}
            onChange={(billingPostalCodeChange) => setBillingPostalCode(billingPostalCodeChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='billingCountry' className='my-4'>
          <Form.Label>Country:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='Enter billing country'
            value={billingCountry}
            onChange={(billingCountryChange) => setBillingCountry(billingCountryChange.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type='submit' 
          variant='primary' 
          className='my-4'
        >
          Continue to Shipping
        </Button>
      </Form>
    </FormContainer>
  );
};