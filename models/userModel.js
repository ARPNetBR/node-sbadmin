var mongoose = require('mongoose');

/**
 * User  Mongo DB model
 * @name userModel
 */
var userModel = function () {

  var userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    gender: String,    
    role: String
  });
 

  return mongoose.model('users', userSchema);
};

module.exports = new userModel();