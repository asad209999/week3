const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 6;
  const skip = (page - 1) * limit;

  // Fetch products with pagination (optional)
  const products = await Product.find().skip(skip).limit(limit);

  // Count total products
  const total = await Product.countDocuments();
  const totalPages = Math.ceil(total / limit);

  // Render the products page with totalPages
  res.render('products', { products, totalPages });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('productDetails', { product });
});

module.exports = router;
