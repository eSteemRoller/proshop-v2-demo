import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useAddUserByAdminMutation } from '../../slices/usersApiSlice';

export default function AddUserByAdminScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedUpForEmail, setIsSignedUpForEmail] = useState(false);
  const [isSignedUpForText, setIsSignedUpForText] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const [ addUser, { isLoading, error } ] = useAddUserByAdminMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addUser({ firstName, lastName, primaryEmail, password, isAdmin, adminNotes }).unwrap();
      toast.success('Success: User added');
      navigate('/admin/all_users');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failure: User not added');
    }
  };

  return (
    <>
      <Link to='/admin/all_users' className='btn btn-light my-4'>
        Return to All Users
      </Link>
      <FormContainer>
        <h1>Create User</h1>
        {isLoading && <Loader />}
        { error && <Message variant='danger'>{error?.data?.message || String(error)}</Message> }

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
            <Form.Label>E-Mail</Form.Label>
            <Form.Control 
              type='email'
              placeholder='Enter primary e-mail'
              value={primaryEmail}
              onChange={(e) => setPrimaryEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='my-2 mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
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
              type='text'
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
              Create
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  )
};
