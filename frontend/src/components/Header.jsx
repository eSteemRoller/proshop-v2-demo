
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSignOutMutation } from '../slices/usersApiSlice';
import { signOut } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';

// import { useNavigate } from 'react-router-dom';


export default function Header() { 
  const { cartItems } = useSelector((cartState) => cartState.cart);
  const { userInfo } = useSelector((authState) => authState.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signOutApiCall] = useSignOutMutation();

  const signOutHandler = async () => { 
    console.log('signOut')
    try {
      await signOutApiCall().unwrap();
      dispatch(signOut());
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="ProShop logo" />
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                { 
                  cartItems.length > 0 && (
                    <Badge pill bg='success' style={{marginLeft: '4px'}}>
                      { cartItems.reduce((acc, cur) => acc + cur.productQty, 0) }
                    </Badge>
                  )
                }
              </Nav.Link>
              { userInfo ? ( 
                <NavDropdown title={ userInfo.name } id='username'>
                  <Nav.Link as={Link} to="/user">
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={ signOutHandler }>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : ( 
                <Nav.Link as={Link} to="/signin">
                  <FaUser /> Sign In
                </Nav.Link>
              ) }
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

