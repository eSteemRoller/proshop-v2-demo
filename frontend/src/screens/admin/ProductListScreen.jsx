
import { Row, Col, Table, Button, Nav } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { useGetAllProductsQuery, usePostNewProductMutation } from '../../slices/productsApiSlice';


export default function ProductListScreen() {
  const { data: products, isLoading, refetch, error } = useGetAllProductsQuery();
  console.log(products);

  const [postNewProduct, { isLoading: loadingPostNewProduct }] = usePostNewProductMutation();

  async function postNewProductHandler() { 
    if (window.confirm('Create the template for a new product below?')) { 
      try {
        await postNewProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }

  function deleteProductHandler(_id) {
    console.log('delete', id);
  };

  return <>
    <Row className='align-items-center'>
      <Col>
        <h1>All Products</h1>
      </Col>
      <Col className='text-dend'>
        <Button className='btn-sm m-4' onClick={postNewProductHandler}>
          <FaEdit /> Add New Product
        </Button>
      </Col>
    </Row>
    {loadingPostNewProduct && <Loader />}
    {isLoading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
        : ( 
          <>
            <Table striped hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>EDIT?</th>
                  <th>DELETE?</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => ( 
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <Nav to={`/admin/product/${product._id}/edit_product`}>
                        <Button variant='light' className='btn-sm mx-4'>
                          <FaEdit />
                        </Button>
                      </Nav>
                      <Button 
                        onClick={() => deleteProductHandler(product._id)} 
                        variant='danger' 
                        className='btn-sm mx-4' 
                      >
                        <FaTrash style={{color: 'white'}}/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )
    }
  </>
}
