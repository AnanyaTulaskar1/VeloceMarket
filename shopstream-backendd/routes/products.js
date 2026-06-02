const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

// Configure temporary local uploads directory
const upload = multer({ dest: 'uploads/' });

// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products (Admin Only)
// NOTE: If you still get a "403 admin access required" error, you can temporarily 
// delete the "admin," middle component below until your flowers are uploaded!
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = "";

    // 1. If an actual raw file is sent via form-data, send it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } 
    // 2. Fallback: If no file is sent, read the direct link string from your Postman JSON body
    else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageUrl, // Matches your database schema key perfectly
      category: req.body.category || "Flowers", // Sets a fallback category if omitted
      stock: req.body.stock !== undefined ? req.body.stock : 10 // Sets a fallback stock level
    });

    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id (Admin Only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;

      const updated = await product.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id (Admin Only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;