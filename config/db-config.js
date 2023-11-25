const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://team27:ICLgBlsh6J5RvXZX@finalproject0.5sdlu.mongodb.net/Monolith_v1'

mongoose.connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });

module.exports = mongoose;