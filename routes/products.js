const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const { search = "", sort = "", page = 1 } = req.query;
  const limit = 6;
  const skip = (page - 1) * limit;

  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  let sortOption = {};
  if (sort === "price-asc") sortOption.price = 1;
  else if (sort === "price-desc") sortOption.price = -1;
  else if (sort === "name-asc") sortOption.name = 1;
  else if (sort === "name-desc") sortOption.name = -1;

  const total = await Product.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  res.render("products", { products, totalPages, search, sort });
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("productDetails", { product });
});

module.exports = router;
