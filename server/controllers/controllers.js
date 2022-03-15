const { User, validateUserSchema } = require('../models/User');

//Add user
exports.addUser = async (req, res) => {
  try {
    //Validate user's application fields
    const { error } = validateUserSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Find user existnce by ID
    const user = await User.findOne({ userId: req.body.userId });
    if (user) return res.status(400).send('User already registered');

    //Generate user form applicationz
    const newUser = new User({
      ...req.body
    });
    //Save user data
    await newUser.save();

    res.status(200).send(newUser);
  } catch (error) {
    //something has gone wrong
    res.status(500).send({ message: 'Internet Server Error' });
  }
};


//Display user
exports.displayUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(401).send('User not found');
  }
  res.send(user);
}


//get all users details
exports.displayAllUsers = async (req, res) => {
  const users = await User.find();

  if (users.length < 0) {
    return res.status(404).send("There are no cards yet.")
  }

  res.send(users);
}

//Edit user details
exports.editUserDetails = async (req, res) => {
  try {
    const { error } = validateUserSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userDetails = await User.findOneAndUpdate({ _id: req.params.id }, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }, { new: true });

    if (!userDetails) {
      return res.status(401).send("The user is no exist");
    }

    res.send(userDetails);
  } catch (error) {
    res.status(401).send({ message: 'Internet Server Error' });
  }
};




//User remove form by id
exports.removeUserData = async (req, res) => {
  try {
    const removeUser = await User.findOneAndDelete({
      _id: req.params.id,
    });
    res.send(removeUser);
  } catch (error) {
    res.send(error);
  }
};





