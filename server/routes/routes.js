const router = require("express").Router();

const {
  addUser,
  displayUser,
  displayAllUsers,
  editUserDetails,
  removeUserData,
} = require('../controllers/controllers');

//Add user
router.post('/add-user', addUser);

//Display user by id
router.get('/display-one-user/:id', displayUser)

//User read form
router.get('/display-all-users', displayAllUsers);

//Edit user 
router.put('/edit-user-details/:id', editUserDetails);

//Remove user 
router.delete('/delete-user/:id', removeUserData);


module.exports = router;