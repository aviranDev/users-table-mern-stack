const mongoose = require("mongoose");
const Joi = require('joi');


//User schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  userId: {
    type: String,
    minlength: 9,
    maxlength: 9,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


//The User Model provider
const User = mongoose.model("User", UserSchema);


//VALIDATE USER REGISTRATION FORM FIELDS
const validateUserSchema = (data) => {
  const schema = Joi.object({
    userId: Joi.string().regex(/^\d+$/).min(9).max(9).required().label("User's ID"),
    firstName: Joi.string().min(2).max(255).required().label("First Name"),
    lastName: Joi.string().min(2).max(255).required().label("Last Name"),
  });
  return schema.validate(data);
};


module.exports = {
  User,
  validateUserSchema,
}