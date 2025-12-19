const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../config/upload');
const mongoose = require('mongoose');

// Helper function to check DB connection
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Register (Admin only - protected route, or allow first admin creation)
router.post('/register', async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if this is the first user (allow creation without auth)
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    // If not the first user, require authentication
    if (!isFirstUser) {
      // Verify token
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Authentication required. Only existing admins can create new accounts.' });
      }
      try {
        jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
      } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token. Only existing admins can create new accounts.' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: isFirstUser 
        ? 'First admin account created successfully! You can now login.' 
        : 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update current user (name + avatar)
router.put('/me', auth, upload.single('image'), async (req, res) => {
  if (!isDBConnected()) {
    return res.status(503).json({ message: 'Database not available. Please check MongoDB connection.' });
  }

  try {
    const { name } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (req.file) {
      updates.avatar = `/uploads/images/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

