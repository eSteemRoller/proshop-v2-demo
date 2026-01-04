import { Table, Button, Nav } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetAllUsersQuery } from '../../slices/usersApiSlice';


export default function AllUsersListScreen() {
  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
  console.log(users);

  const deleteAUserHandler = (id) => { 

  }

  return (
    <>
      <h1>All Users</h1>
      {isLoading ? <Loader /> 
        : error ? <Message variant='danger'>{error}</Message> 
        : ( 
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
                <th>ADMIN</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => ( 
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstName && user.lastName}</td>
                  <td><a href={`mailto:${user.email}`}>{ user.email }</a></td>
                  <td><a href={`mailto:${user.email}`}>{ user.email }</a></td>  {/* To do: Add secondary e-mail field*/}
                  <td>
                    {user.isAdmin ? ( 
                      <FaCheck style={{ color: 'green' }} />
                    ) : ( 
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Nav to={`admin/all_users/${user._id}/edit_user`}>  {/* To do: Check if this is the right path */}
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </Nav>
                    <Nav to={`admin/all_users/${user._id}/edit_user`}>  {/* To do: Check if this is the right path */}
                      <Button 
                        variant='danger' 
                        className='btn-sm' 
                        onClick={() => deleteAUserHandler(user._id)}
                      >
                        <FaTrash style={{color: 'white'}}/>
                      </Button>
                    </Nav>
                  </td>
                </tr>
              )) }
            </tbody>
          </Table>
        )
      }
    </>
  )
}
