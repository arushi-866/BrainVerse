const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
// const Doctor = require('../models/doctorModel');

const protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, no token' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized, invalid token' 
    });
  }
};

// Improved authorization middleware that properly handles admin roles
const authorize = (...roles) => {
  return (req, res, next) => {
    console.log(`Checking authorization for roles:`, roles);
    console.log(`User role: ${req.user?.role}, user ID: ${req.user?.id}`);
    
    // Always allow admin access to any route
    if (req.user.role === 'admin') {
      console.log('Admin access granted automatically');
      return next();
    }
    
    // For other roles, check if they're included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(', ')}, your role: ${req.user.role}`
      });
    }
    
    console.log('Authorization successful for role:', req.user.role);
    next();
  };
};

module.exports = { protect, authorize };
