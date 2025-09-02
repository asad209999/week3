import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();
connectDB();

const products = [
  { name: "Laptop", price: 800, image: "laptop.jpg", description: "High performance laptop", category: "Electronics", stock: 10 },
  { name: "Phone", price: 500, image: "phone.jpg", description: "Latest smartphone", category: "Electronics", stock: 20 },
  { name: "Headphones", price: 100, image: "headphones.jpg", description: "Noise cancelling headphones", category: "Electronics", stock: 15 },
  { name: "Shoes", price: 60, image: "shoes.jpg", description: "Comfortable running shoes", category: "Fashion", stock: 30 },
  { name: "T-shirt", price: 20, image: "tshirt.jpg", description: "Cotton T-shirt", category: "Fashion", stock: 50 },
  { name: "Backpack", price: 40, image: "backpack.jpg", description: "Durable backpack", category: "Accessories", stock: 25 },
  { name: "Watch", price: 150, image: "watch.jpg", description: "Stylish wrist watch", category: "Accessories", stock: 12 },
  { name: "Tablet", price: 300, image: "tablet.jpg", description: "Portable tablet", category: "Electronics", stock: 18 },
  { name: "Keyboard", price: 50, image: "keyboard.jpg", description: "Mechanical keyboard", category: "Electronics", stock: 22 },
  { name: "Chair", price: 120, image: "chair.jpg", description: "Ergonomic office chair", category: "Furniture", stock: 8 }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();