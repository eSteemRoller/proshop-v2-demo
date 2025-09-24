
import { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Table, Button, FormLabel, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useUserProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'


export default function UserProfileScreen() { 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((authState) => authState.auth);

  const [updateUserProfile, { isLoading:loadingUpdateUserProfile }] = useUserProfileMutation();

  useEffect(() => { 
    if (userInfo) { 
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.firstName, userInfo.lastName, userInfo.email]);

  async function submitHandler(e) { 
    e.preventDefault();
    if (password !== confirmPassword) { 
      toast.error('Passwords do not match');
    } else { 
      try { 
        const res = await updateUserProfile({ 
          _id:userInfo._id, 
          firstName, 
          lastName, 
          email,
          password
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    };
    console.log('submitHandler');
  };

  return (
    <Row>
      <Col md={4}>
        <h2>Your Profile</h2>

        <Form onSubmit={submitHandler}>
          <FormGroup controlId='firstName' className='my-2'>
            <FormLabel>First Name:</FormLabel>
            <FormControl 
              type='name'
              placeholder='Enter first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='lastName' className='my-2'>
            <FormLabel>Last Name:</FormLabel>
            <FormControl 
              type='name'
              placeholder='Enter last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='email' className='my-2'>
            <FormLabel>E-Mail Address:</FormLabel>
            <FormControl 
              type='email'
              placeholder='Enter e-mail address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='password' className='my-2'>
            <FormLabel>Password:</FormLabel>
            <FormControl 
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId='confirmPassword' className='my-2'>
            <FormLabel>Confirm Password:</FormLabel>
            <FormControl 
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></FormControl>
          </FormGroup>

          <Button 
            type='submit'
            variant='primary'
            className='my-2'
          >
            Update
          </Button>
          { loadingUpdateUserProfile && <Loader /> }
        </Form>
      </Col>
      <Col md={8}>
      
      </Col>
    </Row>
  );
};
