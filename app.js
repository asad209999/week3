const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();


const productRoutes = require("./routes/products");

const cartRoutes = require("./routes/cart");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB Error", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "ecommerce-secret",
  resave: false,
  saveUninitialized: true
}));

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
