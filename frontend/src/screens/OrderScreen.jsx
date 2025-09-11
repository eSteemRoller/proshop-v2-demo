
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Image, Button } from "bootstrap";
import CheckoutSteps from '../components/CheckoutSteps';


export default function OrderScreen() { 
  const navigate = useNavigate();
  const cart = useSelector((cartState) => cartState.cart);

  useEffect(() => { 
    if (!cart.billingAddress.address || !cart.shippingAddress.address) { 
      navigate('/shipping');
    } else if (!cart.paymentMethod) { 
      navigate('/payment');
    }
  }, [cart.billingAddress.address, cart.shippingAddress.address, navigate]);

  return ( 
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          Column
        </Col>
        <Col md={4}>
          Column
        </Col>
      </Row>
    </>
  );
};
