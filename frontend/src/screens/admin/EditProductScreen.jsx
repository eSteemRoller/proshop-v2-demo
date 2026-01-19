import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { 
  useReadProductQuery, 
  useUpdateProductMutation, 
  useUploadProductImageMutation 
} from '../../slices/productsApiSlice';


export default function EditProductScreen() { 
  const { id: productId } = useParams();

  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const { 
    data: product, 
    isLoading,
    refetch,
    error
  } = useReadProductQuery(productId);

  const [updateProduct, { isLoading: isUpdatingProduct }] = 
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isUploadingImage }] = 
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => { 
    if (product) { 
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    } }, [product]);

  const submitHandler = async (e) => { 
    e.preventDefault();
    const updatedProduct = { 
      productId,
      image,
      category,
      brand,
      name,
      description,
      price,
      countInStock
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) { 
      toast.error(result.error);
    } else { 
      toast.success("Success: Product updated");
      navigate('/admin/all_products');
    };
  };

  const uploadFileHandler = async (e) => { 
    const formData = new FormData();
    formData.append('product image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  
  return (
    <>
      <Link to='/admin/all_products' className='btn btn-light my-4'>
        Return to All Products
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isUpdatingProduct && <Loader />}
        {isLoading ? <Loader /> 
          : error ? <Message variant='danger'>{error}</Message>
          : ( 
            <Form onSubmit={ submitHandler }>
              {isUploadingImage ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                : (
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
                  ) 
              }
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
                <Link to='/admin/all_products' className='btn btn-light my-2 text-decoration-none'>
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
