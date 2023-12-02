const mongoose = require('mongoose');

const MONGODB_URI = '<MONGODB_URI>'

mongoose.connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.error('Error connecting to DB:', error);
  });

module.exports = mongoose;
