import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useAdminCreateUserByAdminMutation } from '../../slices/usersApiSlice';

export default function CreateUserByAdminScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubscribedToEmail, setIsSubscribedToEmail] = useState(false);
  const [isSubscribedToText, setIsSubscribedToText] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const [ createUser, { isLoading, error } ] = useAdminCreateUserByAdminMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createUser({ 
        firstName, 
        lastName, 
        primaryEmail, 
        secondaryEmail, 
        primaryPhone, 
        secondaryPhone, 
        password, 
        isSubscribedToEmail, 
        isSubscribedToText, 
        isAdmin, 
        adminNotes 
      })
        .unwrap();
      toast.success('Success: User added');
      navigate('/admin/all_users');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failure: User not added');
    }
  };

  return (
    <>
      <Link to='/admin/all_users/' className='btn btn-light my-4'>
        Return to All Users
      </Link>
      <FormContainer>
        <h1>Add User</h1>
        {isLoading && <Loader />}
        { error && <Message variant='danger'>{error?.data?.message || String(error)}</Message> }
        <h5>Fields marked with an asterisk(*) are required</h5>
        <Form onSubmit={ submitHandler }>
          <Form.Group controlId='firstName' className='my-2 mb-3'>
            <Form.Label>First Name*</Form.Label>
            <Form.Control 
              type='text'
              placeholder="Enter user's first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='lastName' className='my-2 mb-3'>
            <Form.Label>Last Name*</Form.Label>
            <Form.Control 
              type='text'
              placeholder="Enter user's last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='primaryEmail' className='mt-2 mb-3'>
            <Form.Label>Primary E-Mail* (used for credentials)</Form.Label>
            <Form.Control 
              type='email'
              placeholder="Enter primary e-mail"
              value={primaryEmail}
              onChange={(e) => setPrimaryEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='secondaryEmail' className='my-2 mb-3'>
            <Form.Label>Secondary E-mail</Form.Label>
            <Form.Control 
              type='email'
              placeholder="Enter secondary e-mail"
              value={secondaryEmail ?? ''}
              onChange={(e) => setSecondaryEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='primaryPhone' className='mt-2 mb-3'>
            <Form.Label>Primary Phone</Form.Label>
            <Form.Control 
              type='phone'
              placeholder='Enter primary phone'
              value={primaryPhone ?? ''}
              onChange={(e) => setPrimaryPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='secondaryPhone' className='mt-2 mb-3'>
            <Form.Label>Secondary Phone</Form.Label>
            <Form.Control 
              type='phone'
              placeholder='Enter secondary phone'
              value={secondaryPhone ?? ''}
              onChange={(e) => setSecondaryPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mt-2 mb-3'>
            <Form.Label>Temporary Password (direct user to reset password)</Form.Label>
            <Form.Control 
              type='password'
              placeholder='Enter temporary password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='isSubscribedToEmail' className='my-2 mb-3'>
            <Form.Check 
              type='checkbox'
              label="Is subscribed to e-mail marketing"
              checked={isSubscribedToEmail}
              onChange={(e) => setIsSubscribedToEmail(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId='isSubscribedToText' className='my-2 mb-3'>
            <Form.Check 
              type='checkbox'
              label="Is subscribed to text marketing"
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
              placeholder="Enter notes, if applicable"
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
              Add User
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};