
import { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Button } from 'react-bootstrap';
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

  useEffect(() => { 
    if (userInfo) { 
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setEmail(userInfo.email);
    }
  }, [userInfo.firstName, userInfo.lastName, userInfo.email]);

  const submitHandler = (e) => { 
    e.preventDefault();
    console.log('submitHandler');
  };

  return 
}