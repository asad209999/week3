import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products with pagination and sorting
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, sort = "name" } = req.query;
    const products = await Product.find()
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
