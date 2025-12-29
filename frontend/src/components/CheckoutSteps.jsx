
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CheckoutSteps({ step1, step2, step3, step4, step5 }) { 
  
  
  return ( 
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        { step1 ? ( 
          <Nav.Link as={Link} to="/sign_in">
            Sign In
          </Nav.Link>
        ) : ( 
          <Nav.Link disabled>
            Sign In
          </Nav.Link>
        ) }
      </Nav.Item>
      <Nav.Item>
        { step2 ? ( 
          <Nav.Link as={Link} to="/billing">
            Billing
          </Nav.Link>
        ) : ( 
          <Nav.Link disabled>
            Billing
          </Nav.Link>
        ) }
      </Nav.Item>
      <Nav.Item>
        { step3 ? ( 
          <Nav.Link as={Link} to="/shipping">
            Shipping
          </Nav.Link>
        ) : ( 
          <Nav.Link disabled>
            Shipping
          </Nav.Link>
        ) }
      </Nav.Item>
      <Nav.Item>
        { step4 ? ( 
          <Nav.Link as={Link} to="/payment">
            Payment
          </Nav.Link>
        ) : ( 
          <Nav.Link disabled>
            Payment
          </Nav.Link>
        ) }
      </Nav.Item>
      <Nav.Item>
        { step5 ? ( 
          <Nav.Link as={Link} to="/order">
            Order
          </Nav.Link>
        ) : ( 
          <Nav.Link disabled>
            Order
          </Nav.Link>
        ) }
      </Nav.Item>
    </Nav>
  );
};