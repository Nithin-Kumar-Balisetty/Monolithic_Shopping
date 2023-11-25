const mongoose = require('mongoose');

// Define the Cart schema
const cartSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      id:{
        type : String,
        required :true
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    }
  ],
});

// Create the Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

