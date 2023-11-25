const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
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
});

// Create the model with the defined schema
const Product = mongoose.model('Products', productSchema, 'products');

module.exports = Product;
