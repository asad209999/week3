const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo Error", err));

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
