const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/cart
router.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (cart) res.json(cart);
    else res.json({ items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/cart
router.post('/', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity: quantity || 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += (quantity || 1);
      } else {
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/:productId
router.delete('/:productId', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;