const cookieParser = require('cookie-parser');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes

app.get('/', async (req, res) => {
    const products = await Product.find().limit(4);
    res.render('home', { products });
});

app.get('/products', async (req, res) => {
    const { page = 1, search } = req.query;
    const limit = 4;
    let query = {};

    if (search) {
        const regex = new RegExp(search, 'i');
        query = { $or: [{ name: regex }, { category: regex }] };
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    res.render('products', {
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit)
    });
});

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('productDetail', { product });
});

// Auth pages
app.get('/signup', (req, res) => res.render('signup'));
app.get('/login', (req, res) => res.render('login'));

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.redirect('/add-product');
});

// Add product
app.get('/add-product', authMiddleware, (req, res) => res.render('addProduct'));

app.post('/add-product', authMiddleware, async (req, res) => {
    const { name, price, category, image, description, stock } = req.body;
    await Product.create({ name, price, category, image, description, stock });
    res.redirect('/products');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
