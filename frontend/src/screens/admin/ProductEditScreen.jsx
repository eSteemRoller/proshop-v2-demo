import { useState, useEffect } from 'react';
import { Nav, useNavigate, useParams } from 'react-router-dom';
import FormContainer from '../../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';


export default function ProductEditScreen() { 
  const { id: productId } = useParams();


}