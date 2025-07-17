const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'iPhone 14',
    price: 999,
    category: 'Electronics',
    image: 'https://via.placeholder.com/150',
    description: 'Latest iPhone model',
    stock: 20
  },
  {
    name: 'Samsung Galaxy S23',
    price: 899,
    category: 'Electronics',
    image: 'https://via.placeholder.com/150',
    description: 'Newest Galaxy flagship',
    stock: 30
  },
  {
    name: 'Nike Shoes',
    price: 120,
    category: 'Clothing',
    image: 'https://via.placeholder.com/150',
    description: 'Comfortable running shoes',
    stock: 50
  },
  {
    name: 'HP Laptop',
    price: 750,
    category: 'Electronics',
    image: 'https://via.placeholder.com/150',
    description: 'Powerful laptop for work',
    stock: 15
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    return Product.deleteMany({});
  })
  .then(() => Product.insertMany(sampleProducts))
  .then(() => {
    console.log('Data seeded');
    process.exit();
  })
  .catch(err => console.error(err));
