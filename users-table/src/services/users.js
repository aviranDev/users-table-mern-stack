import axios from 'axios';
const apiUrl = "http://localhost:3900";

//Add user
export const addUser = (user) => {
  return axios.post(`${apiUrl}/api/users/add-user`, user);
};


export const displayUser = (id) => {
  return axios.get(`${apiUrl}/api/users/display-one-user/${id}`);
}


//Display all users
export const displayAllUsers = () => {
  return axios.get(`${apiUrl}/api/users/display-all-users`);
};


//Edit user details 
export const editUserDetails = (_id, body) => {
  return axios.put(`${apiUrl}/api/users/edit-user-details/${_id}`, body);
};


//Remove user
export const removeUser = (id) => {
  return axios.delete(`${apiUrl}/api/users/delete-user/${id}`);
}



