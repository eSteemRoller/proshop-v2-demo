
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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
    console.log('Product deleted: ', _id);
  };

  return <>
    <Row>
      <Col>
        <h1 className='m-2'>All Products</h1>
      </Col>
      <Col className='d-flex align-items-center justify-content-end'>
        <Button className='btn-sm me-2 align-items-center' onClick={postNewProductHandler}>
          <FaPlus /> Add New Product
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
                <tr className='text-center'>
                  <th>ID</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th className='text-center'>EDIT?</th>
                  <th className='text-center'>DELETE?</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className='align-middle text-center'>
                    <td className='align-middle text-center'>{product._id}</td>
                    <td className='align-middle text-center'>{product.category}</td>
                    <td className='align-middle text-center'>{product.brand}</td>
                    <td className='align-middle text-center'>{product.name}</td>
                    <td className='align-middle text-center'>{product.price}</td>
                    <td className='align-middle text-center'>
                      <Link to={`/admin/product/${product._id}/edit_product`}>
                        <Button variant='light' className='btn-sm d-flex justify-content-center align-items-center mx-auto'>
                          <FaEdit />
                        </Button>
                      </Link>
                    </td>
                    <td className='align-middle text-center'>
                      <Button
                        onClick={() => deleteProductHandler(product._id)}
                        variant='danger'
                        className='btn-sm mx-4'
                      >
                        <FaTrash style={{color: 'white'}} />
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
