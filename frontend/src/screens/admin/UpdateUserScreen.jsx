import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { 
  useAdminReadUserByIdQuery, 
  useAdminUpdateUserByIdMutation, 
} from '../../slices/usersApiSlice';


export default function UpdateUserScreen() {  // aka UserEditScreen
  const { id: userId } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  // const [primaryBillingAddress, setPrimaryBillingAddress] = useState('');
  // const [primaryShippingAddress, setPrimaryShippingAddress] = useState('');
  const [isSubscribedToEmail, setIsSubscribedToEmail] = useState(false);
  const [isSubscribedToText, setIsSubscribedToText] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const { 
    data: user, 
    isLoading,
    error
  } = useAdminReadUserByIdQuery(userId);

  const [updateUser, { isLoading: isUpdatingUser }] = 
    useAdminUpdateUserByIdMutation();

  const navigate = useNavigate();

  useEffect(() => { 
    if (user) { 
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPrimaryEmail(user.primaryEmail);
      setSecondaryEmail(user.secondaryEmail || '');
      setPrimaryPhone(user.primaryPhone || '');
      setSecondaryPhone(user.secondaryPhone || '');
      // setPrimaryBillingAddress(user.primaryBillingAddress);
      // setPrimaryShippingAddress(user.primaryShippingAddress);
      setIsSubscribedToEmail(user.isSubscribedToEmail || undefined)
      setIsSubscribedToText(user.isSubscribedToText || undefined)
      setIsAdmin(user.isAdmin);
      setAdminNotes(user.adminNotes || '');
    } }, [user]);

  const hasValidUser = Boolean(
    user && (
      user._id || user.firstName || user.lastName || user.primaryEmail || user.password || user.isAdmin
    )
  );

  const submitHandler = async (e) => { 
    e.preventDefault();
    try {
      await updateUser({ 
        userId, 
        firstName, 
        lastName, 
        primaryEmail, 
        secondaryEmail, 
        primaryPhone, 
        secondaryPhone, 
        isSubscribedToEmail,
        isSubscribedToText,
        isAdmin, 
        adminNotes
      })
        .unwrap();
      toast.success('Success: User updated');
      navigate('/admin/all_users');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  
  return (
    <>
      <Link to='/admin/all_users' className='btn btn-light my-4'>
        Return to All Users
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isUpdatingUser && <Loader />}

        { isLoading ? ( 
          <Loader /> 
        ) : error ? ( 
          <Message variant='danger'>{error}</Message>
        ) : !hasValidUser ? (
          <Message variant='warning'>Failure: User not found</Message>
        ) : ( 
            <Form onSubmit={ submitHandler }>
              <Form.Group controlId='firstName' className='my-2 mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='lastName' className='my-2 mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='primaryEmail' className='mt-2 mb-3'>
                <Form.Label>Primary E-Mail</Form.Label>
                <Form.Control 
                  type='email'
                  placeholder='Enter primary e-mail'
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='secondaryEmail' className='mt-2 mb-3'>
                <Form.Label>Secondary E-Mail</Form.Label>
                <Form.Control 
                  type='email'
                  placeholder='Enter secondary e-mail'
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='primaryPhone' className='mt-2 mb-3'>
                <Form.Label>Primary Phone</Form.Label>
                <Form.Control 
                  type='phone'
                  placeholder='Enter primary phone'
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='secondaryPhone' className='mt-2 mb-3'>
                <Form.Label>Secondary Phone</Form.Label>
                <Form.Control 
                  type='phone'
                  placeholder='Enter secondary phone'
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* <Form.Group controlId='primaryBillingAddress' className='mt-2 mb-3'>
                <Form.Label>Primary Billing Address</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter primary billing address'
                  value={primaryBillingAddress ?? ''}
                  onChange={(e) => setPrimaryBillingAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='primaryShippingAddress' className='mt-2 mb-3'>
                <Form.Label>Primary Shipping Address</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter primary shipping address'
                  value={primaryShippingAddress ?? ''}
                  onChange={(e) => setPrimaryShippingAddress(e.target.value)}
                ></Form.Control>
              </Form.Group> */}
              <Form.Group controlId='isSubscribedToEmail' className='my-2 mb-3'>
                <Form.Check 
                  type='checkbox'
                  label="Is Subscribed To Email Marketing"
                  checked={isSubscribedToEmail}
                  onChange={(e) => setIsSubscribedToEmail(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Form.Group controlId='isSubscribedToText' className='my-2 mb-3'>
                <Form.Check 
                  type='checkbox'
                  label="Is Subscribed To Text Marketing"
                  checked={isSubscribedToText}
                  onChange={(e) => setIsSubscribedToText(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Form.Group controlId='isAdmin' className='my-2 mb-3'>
                <Form.Check 
                  type='checkbox'
                  label="Is Administrator"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              <Form.Group controlId='adminNotes' className='my-2 mb-3'>
                <Form.Label>Administrator Notes</Form.Label>
                <Form.Control 
                  as='textarea'
                  rows={12}
                  placeholder='Enter notes, if applicable'
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <Link to='/admin/all_users' className='btn btn-light my-2 text-decoration-none'>
                  Cancel
                </Link>
                <Button 
                  type='submit'
                  variant='primary'
                  className='my-2'
                >
                  Save
                </Button>
              </div>
            </Form>
          )
        }
      </FormContainer>
    </>
  );
};