const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

// Global Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Main Routing Mounting Bindings
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart', cartRoutes);

// Database Connection Lifecycle Handler
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connection established successfully.'))
  .catch(err => console.error('Database connection error:', err));

// 👇 ADD THIS GLOBAL ERROR HANDLER HERE (MUST HAVE ALL 4 PARAMETERS) 👇
app.use((err, req, res, next) => {
  console.error("Caught Backend Error:", err.stack);
  res.status(500).json({ 
    message: err.message || "Internal Server Error" 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server executing seamlessly on port ${PORT}`));