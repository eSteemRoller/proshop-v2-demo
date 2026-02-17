import { Col, Table, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useAdminReadAllUsersQuery, useAdminDeleteUserByIdMutation } from '../../slices/usersApiSlice';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';


export default function ReadAllUsersScreen() { 
  const { pageNumber } = useParams();
  const page = pageNumber || 1;
  const { data, isLoading, refetch, error } = useAdminReadAllUsersQuery({ page });

  const [ deleteUser, { isLoading: isDeleting }] = useAdminDeleteUserByIdMutation();

  const deleteUserHandler = async (id) => { 
    if (window.confirm("Are you sure?")) { 
      try {
        await deleteUser(id);
        toast.success("Success: User deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const renderError = (error) => {
    if (!error) return '';
    if (typeof error === 'string') return error;
    if (error.data && error.data.message) return error.data.message;
    if (error.error) return error.error;
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  };

  return (
    <>
      <Col>
        <h1>All Users</h1>
      </Col>
      <Col className='d-flex align-items-center justify-content-end'>
        <Link to='/admin/all_users/add_user' className='btn btn-primary my-2 d-flex align-items-center justify-content-end'>
          <FaPlus />&nbsp;Add New User
        </Link>
      </Col>
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader /> 
      ) : error ? (
        <Message variant='danger'>{renderError(error)}</Message> 
      ) : ( 
          <Table 
            striped 
            hover 
            responsive 
            className='table-sm'
          >
            <thead>
              <tr>
                <th>USER ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>E-MAIL</th>
                <th>ADMINISTRATOR</th>
                <th>EDIT?</th>
                <th>DELETE?</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => ( 
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <a href={`mailto:${user.primaryEmail || user.email}`}>
                      { user.primaryEmail || user.email }
                    </a>
                  </td>
                  <td>
                    {user.isAdmin ? ( 
                      <FaCheck style={{ color: 'green' }} />
                    ) : ( 
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/all_users/user/${user._id}/edit_user`} className='btn btn-light btn-sm text-decoration-none'>
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <Button 
                      variant='danger' 
                      className='btn-sm' 
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      <FaTrash style={{color: 'white'}}/>
                    </Button>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        )
      }
      <Paginate 
        totalPages={data?.totalPages} 
        currentPage={data?.currentPage} 
        basePath="/admin/all_users" 
        firstPageIsBasePath={true}
      />
      <Link to='/' className='btn btn-light my-2 text-decoration-none'>
        Cancel
      </Link>
    </>
  );
};