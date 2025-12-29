
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSignOutMutation } from '../slices/usersApiSlice';
import { signOut } from '../slices/authSlice';
import logo from '../assets/logo.png';



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
      navigate('/sign_in');
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
                <NavDropdown title={ userInfo.email } id='username'>
                  <NavDropdown.Item onClick={() => navigate('/my_profile')}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={ signOutHandler }>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : ( 
                <Nav.Link as={Link} to="/sign_in">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && ( 
                <NavDropdown title={ userInfo.lastName } id='adminmenu'>
                  <NavDropdown.Item onClick={() => navigate('/admin/all_orders')}>
                    All Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('/admin/all_products')}>
                    All Products
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('/admin/all_users')}>
                    All Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

