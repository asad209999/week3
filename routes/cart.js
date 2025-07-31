const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/add/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.redirect("/products");

  if (!req.session.cart) req.session.cart = [];

  req.session.cart.push({
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.image
  });

  res.redirect("/cart");
});

router.get("/", (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;
  cart.forEach(p => total += p.price);
  res.render("cart", { cart, total });
});

module.exports = router;
