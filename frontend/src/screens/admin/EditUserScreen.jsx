
import React from 'react'
import { useState, useEffect } from 'react';
import { Link, Nav, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { 
  useGetUserDetailsQuery, 
  useEditUserMutation, 
} from '../../slices/usersApiSlice';


export default function EditUserScreen() { 
  const { id: userId } = useParams();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { 
    data: user, 
    isLoading,
    refetch,
    error
  } = useGetUserDetailsQuery(userId);

  const [editUser, { isLoading: isUpdating }] = 
    useEditUserMutation();

  const navigate = useNavigate();

  useEffect(() => { 
    if (user) { 
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setIsAdmin(user.isAdmin);
    } }, [user]);

  const submitHandler = async (e) => { 
    e.preventDefault();
    const updatedUser = { 
      userId,
      email,
      firstName,
      lastName,
      isAdmin,
    };

    const result = await editUser(updatedUser);
    if (result.error) { 
      toast.error(result.error);
    } else { 
      toast.success("Success: User updated");
      navigate('/admin/all_users');
    };
  };

  
  return (
    <>
      <Link to='/admin/all_products' className='btn btn-light my-4'>
        Return to All Products
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdating && <Loader />}

        { isLoading ? <Loader /> 
          : error ? <Message variant='danger'>{error}</Message>
          : ( 
            <Form onSubmit={ submitHandler }>
              <Form.Group controlId='image' className='mt-2 mb-3'>
                <Form.Label>Image</Form.Label>
                <Form.Text><br></br>Enter a product image URL:</Form.Text>
                <Form.Control 
                  type='text'
                  placeholder="Enter product image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Text><br></br>OR...</Form.Text>
                <Form.Text><br></br>Select a local product image file:</Form.Text>
                <Form.Control
                  type='file'
                  label="Select product image file"
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='category' className='mt-2 mb-3'>
                <Form.Label>Category</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='brand' className='my-2 mb-3'>
                <Form.Label>Brand</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='name' className='my-2 mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='description' className='my-2 mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='price' className='my-2 mb-3'>
                <Form.Label>Price</Form.Label>
                <Form.Control 
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='countInStock' className='my-2 mb-3'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control 
                  type='number'
                  placeholder='Enter Count In Stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <Button className='btn btn-light my-2'>
                  <Link to='/admin/all_products'>
                    Cancel
                  </Link>
                </Button>
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
