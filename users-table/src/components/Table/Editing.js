import React from "react";
import {
  Td, EditButton, DeleteButton, SaveButton, CancelButton, TableInput
} from '../../styles/styles';
/**
 * Edit user details when neededs
 */
export const EditData = ({
  user,
  updateUser,
  handleChangeEdit,
  handleCancelEditing,
}) => {

  return (
    <tr>
      <Td>
        <TableInput
          type="text"
          required="required"
          name="firstName"
          placeholder="Enter first name..."
          defaultValue={updateUser.firstName}
          onChange={handleChangeEdit}
        />
      </Td>
      <Td>
        <TableInput
          type="text"
          required="required"
          name="lastName"
          placeholder="Enter last name..."
          defaultValue={updateUser.lastName}
          onChange={handleChangeEdit}
        />
      </Td>
      <Td>
        {updateUser.userId}
      </Td>
      <Td>
        <SaveButton type="submit">Save</SaveButton>
        <CancelButton type="button" onClick={handleCancelEditing}>
          Cancel
        </CancelButton>
      </Td>
    </tr>
  );
};


/**
 * Read user details
 */
export const ReadData = ({ user, handleDelete, editClicked }) => {

  return (
    <tr>
      <Td>{user.firstName}</Td>
      <Td>{user.lastName}</Td>
      <Td>{user.userId}</Td>
      <Td>
        <EditButton type="button"
          onClick={() => editClicked(user._id)}
        >
          Edit
        </EditButton>
        <DeleteButton type="button" onClick={() => handleDelete(user._id)}>
          Delete
        </DeleteButton>
      </Td>
    </tr>
  );
};