const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const joi = require('joi');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: joi.string().min(5).max(50).required(),
    email: joi.string().min(5).max(200).required().email(),
    password: joi.string().min(5).max(500).required()
  }

  return joi.validate(user, schema);
}



exports.User = User;
exports.validate = validateUser;
