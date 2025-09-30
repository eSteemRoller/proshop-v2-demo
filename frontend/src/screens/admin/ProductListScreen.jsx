
import { Row, Col, Table, Button, Nav } from 'react-bootstrap';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetAllProductsQuery } from '../../slices/productsApiSlice';


export default function ProductListScreen() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  console.log(products);

  return (
    <>
    
    </>
  )
}