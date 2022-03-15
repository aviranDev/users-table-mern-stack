import React, { useState, useEffect, Fragment } from "react";
import { EditData, ReadData } from '../components/Table/Editing';

//styles
import {
  Container,
  Heading,
  Form,
  Table,
  Th,
  Span,
  AddButton,
  FormInput,
  Div,
} from '../styles/styles';

//Validate User inputs by form validation
import { validateForm, validateInput } from '../lib/validation';

//API
import { addUser, displayAllUsers, editUserDetails, removeUser, displayUser } from '../services/users';


const UsersTable = () => {
  //Users state
  const [userslist, setUserslist] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    userId: ''
  });
  const [editUserData, setEditUserData] = useState(null);
  const [updateUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    userId: '',
  });

  //Errors
  const [error, setError] = useState('');

  //Display all users
  useEffect(() => {
    const fecthAllUsers = async () => {
      try {
        const { data } = await displayAllUsers();
        if (data) {
          setUserslist(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fecthAllUsers();
  }, []);

  /**
   * Handlers
   */

  //Add user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const errors = validateForm(currentUser)
      if (errors) {
        setError(errors)
        return
      }
      const { data } = await addUser(currentUser);
      setUserslist(userslist => [...userslist, data]);
      setCurrentUser({
        firstName: '',
        lastName: '',
        userId: ''
      })

    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError({ userId: error.response.data });
      }
    }
  };


  //Remove User Data handler
  const handleDelete = async (id) => {
    try {
      const updatedUsers = userslist.filter((user) => user._id !== id);
      setUserslist(updatedUsers);
      await removeUser(id);
    } catch (error) {
      console.log(error);
    }

  };


  //handle change
  const handleChange = ({ target }) => {
    setCurrentUser({
      ...currentUser,
      [target.name]: target.value
    });
    setError({
      [target.name]: validateInput([target.value])
    })
  }


  /**
   * Update handlers
   */

  //edit submit
  const editSubmit = async (e) => {
    e.preventDefault();
    const { _id, userId, firstName, lastName } = updateUser;
    const body = {
      userId,
      firstName,
      lastName,
    }
    const { data } = await editUserDetails(_id, body);

    const index = userslist.findIndex((user) => user._id === data._id);
    userslist[index] = data
    setUserslist(userslist => [...userslist]);
    setEditUserData(null)
  }

  //handle change edit
  const handleChangeEdit = ({ target }) => {
    setUpdatedUser({
      ...updateUser,
      [target.name]: target.value,
    });
  };


  //Edit clicked
  const editClicked = async (id) => {
    console.log(id)
    const { data } = await displayUser(id)
    setUpdatedUser(data)
    setEditUserData(data._id)
  };


  //Cancel Editing Handler
  const handleCancelEditing = () => {
    setEditUserData(null);
  };

  return (
    <Container>
      <Heading>Add User details</Heading>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="firstName"
          value={currentUser.firstName}
          placeholder="First Name..."
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="lastName"
          placeholder="Last Name..."
          value={currentUser.lastName}
          onChange={handleChange}
        />
        <FormInput
          type="text"
          name="userId"
          placeholder="ID number..."
          value={currentUser.userId}
          onChange={handleChange}
        />
        <AddButton type="submit">Add</AddButton>
      </Form>
      <Div>
        {error && <Span>{error.firstName}</Span>}
        {error && <Span>{error.lastName}</Span>}
        {error && <Span>{error.userId}</Span>}
      </Div>

      <Form onSubmit={editSubmit}>
        <Table>
          <thead>
            <tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>User ID</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {userslist && userslist.map((user) => (
              <Fragment key={user._id}>
                {editUserData === user._id ? (
                  <EditData
                    user={user}
                    updateUser={updateUser}
                    handleCancelEditing={handleCancelEditing}
                    handleChangeEdit={handleChangeEdit}
                  />
                ) : (
                  <ReadData
                    user={user}
                    editClicked={editClicked}
                    handleDelete={handleDelete}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </Form>
    </Container>

  )
}

export default UsersTable;