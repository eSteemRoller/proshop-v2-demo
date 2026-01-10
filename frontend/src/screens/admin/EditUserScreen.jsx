
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { 
  useGetUserDetailsQuery, 
  useEditUserDetailsMutation, 
} from '../../slices/usersApiSlice';


export default function EditUserScreen() {  // aka UserEditScreen
  const { id: userId } = useParams();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const { 
    data: user, 
    isLoading,
    refetch,
    error
  } = useGetUserDetailsQuery(userId);

  const [editUser, { isLoading: isUpdating }] = 
    useEditUserDetailsMutation();

  const navigate = useNavigate();

  useEffect(() => { 
    if (user) { 
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setIsAdmin(user.isAdmin);
      setAdminNotes(user.adminNotes);
    } }, [user]);

  const submitHandler = async (e) => { 
    e.preventDefault();
    try {
      await editUser({ userId, email, firstName, lastName, isAdmin, adminNotes});
      toast.success("Success: User updated");
      refetch();
      navigate('/admin/all_users');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  
  return (
    <>
      <Link to='/admin/all_products' className='btn btn-light my-4'>
        Return to All Users
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isUpdating && <Loader />}

        { isLoading ? ( 
          <Loader /> 
        ) : error ? ( 
          <Message variant='danger'>{error}</Message>
        ) : ( 
            <Form onSubmit={ submitHandler }>
              <Form.Group controlId='email' className='mt-2 mb-3'>
                <Form.Label>E-Mail</Form.Label>
                <Form.Control 
                  type='email'
                  placeholder='Enter category'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
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
                  Save
                </Button>
              </div>
            </Form>
          )
        }
      </FormContainer>
    </>
  )
};
