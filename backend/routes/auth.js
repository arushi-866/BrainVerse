const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    console.log("Received body:", req.body);

    
    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser._doc;
    
    // Send success response with user data
    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    // Return user info and token
    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;