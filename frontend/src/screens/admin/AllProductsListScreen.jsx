
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { 
  useReadAllProductsQuery, 
  useCreateProductMutation, 
  useDeleteProductByIdMutation,
} from '../../slices/productsApiSlice';
import Paginate from '../../components/Paginate';


export default function AllProductsListScreen() { 
  const { pageNumber } = useParams();
  const page = pageNumber || 1;
  const { data, isLoading, refetch, error } = useReadAllProductsQuery({ pageNumber: page });
  console.log(data);

  const [createProduct, { isLoading: isAddingProduct }] = useCreateProductMutation({ pageNumber: page });

  async function createProductHandler() { 
    if (window.confirm('Create the template for a new product below?')) { 
      try {
        const newProduct = await createProduct().unwrap();
        refetch();
        toast.success(`Success: Product ${newProduct._id} created`);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }

  const [deleteProduct, { isLoading: isDeletingProduct }] = useDeleteProductByIdMutation();

  const deleteProductHandler = async (_id) => {
    if (window.confirm(`Are you sure you want to delete product ${_id}?`)) { 
      const productToDelete = data?.products?.find((p) => p._id === _id) || { _id, name: '' };
      try {
        await deleteProduct(_id).unwrap();
        toast.success(`Success: Product ${productToDelete._id} ${productToDelete.name} is deleted`);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return <>
    <Row>
      <Col>
        <h1 className='m-2'>All Products</h1>
      </Col>
      <Col className='d-flex align-items-center justify-content-end'>
        <Button className='btn-sm my-2 align-items-center' onClick={createProductHandler}>
          <FaPlus />&nbsp;Add New Product
        </Button>
      </Col>
    </Row>
    {(isAddingProduct || isDeletingProduct) && <Loader />}
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
              {data.products.map((product) => (
                <tr key={product._id} className='align-middle text-center'>
                  <td className='align-middle text-center'>{product._id}</td>
                  <td className='align-middle text-center'>{product.category}</td>
                  <td className='align-middle text-center'>{product.brand}</td>
                  <td className='align-middle text-center'>{product.name}</td>
                  <td className='align-middle text-center'>{product.price}</td>
                  <td className='align-middle text-center'>
                    <Link to={`/admin/all_products/product/${product._id}/edit_product`} className='btn btn-light btn-sm text-decoration-none'>
                      <FaEdit />
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
              )) }
            </tbody>
          </Table>
          <Paginate 
            totalPages={data.totalPages} 
            currentPage={data.currentPage} 
            basePath="/admin/all_products"
            firstPageIsBasePath={true}
          />
          <Link to='/' className='btn btn-light my-2 text-decoration-none'>
            Cancel
          </Link>
        </>
      )
    }
  </>
};
