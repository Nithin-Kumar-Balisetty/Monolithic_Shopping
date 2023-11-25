const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


// Create the model with the defined schema
const User = mongoose.model('Users', userSchema, 'users');

module.exports = User;
