import { Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useReadAllUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';


export default function AllUsersListScreen() {
  const { data: users, refetch, isLoading, error } = useReadAllUsersQuery();
  console.log(users);

  const [ deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

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

  const renderError = (err) => {
    if (!err) return '';
    if (typeof err === 'string') return err;
    if (err.data && err.data.message) return err.data.message;
    if (err.error) return err.error;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  };

  return (
    <>
      <Col>
        <h1>All Users</h1>
      </Col>
      <Col className='d-flex align-items-center justify-content-end'>
        <Button to='/admin/user/add_user' className='btn btn-primary my-2 d-flex align-items-center justify-content-end'>
          <FaPlus />Add New User
        </Button>
      </Col>
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader /> 
      ) : error ? (
        <Message variant='danger'>{renderError(error)}</Message> 
      ) : ( 
          <Table 
            strong
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
              {users.map((user) => ( 
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
                    <Link to={`/admin/user/${user._id}/edit_user`} className='btn btn-light btn-sm text-decoration-none'>
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
      <Link to='/' className='btn btn-light my-2 text-decoration-none'>
        Cancel
      </Link>
    </>
  )
};
