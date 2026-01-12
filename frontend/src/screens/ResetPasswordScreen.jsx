import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useResetPasswordMutation } from '../slices/usersApiSlice';

export default function ResetPasswordScreen() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [ resetPassword, { isLoading, error } ] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await resetPassword({ token, password }).unwrap();
      toast.success('Password reset successful. Please sign in.');
      navigate('/sign_in');
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Failed to reset password');
    }
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {isLoading && <Loader />}
      {error && <Message variant='danger'>{error?.data?.message || String(error)}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='password' className='my-2 mb-3'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-2 mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className='d-flex justify-content-between'>
          <Link to='/' className='btn btn-light my-2 text-decoration-none'>Cancel</Link>
          <Button type='submit' variant='primary' className='my-2'>Set Password</Button>
        </div>
      </Form>
    </FormContainer>
  );
}
