const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('products', { products });
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('productDetails', { product });
});

module.exports = router;
