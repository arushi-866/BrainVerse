// backend/controllers/authController.js
const googleAuth = require('../config/googleAuth');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.googleAuth = (req, res) => {
  try {
    if (!googleAuth.oauth2Client) {
      throw new Error('OAuth2 client not initialized');
    }
    
    const authUrl = googleAuth.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: googleAuth.scopes,
      prompt: 'consent'
    });
    
    console.log('Auth URL:', authUrl); // Debug log
    res.redirect(authUrl);
  } catch (error) {
    console.error('Error in googleAuth:', error);
    res.status(500).send('Authentication configuration error');
  }
};

exports.googleAuthCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await googleAuth.oauth2Client.getToken(code);
    googleAuth.oauth2Client.setCredentials(tokens);
    res.redirect(`${process.env.FRONTEND_URL}?tokens=${encodeURIComponent(JSON.stringify(tokens))}`);
  } catch (error) {
    console.error('Auth Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/error`);
  }
};

exports.register = async (req, res) => {
  try {

    const { firstName, lastName, email, password, dob, relation } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password, // Password will be hashed by the pre-save middleware
      dob,
      relation
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        relation: user.relation
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;
    let isDoctor = false;

    // First check if it's a regular user
    user = await User.findOne({ email });
    
    // If not found as user, check if it's a doctor
    if (!user) {
      const Doctor = require('../models/doctorModel'); // Import Doctor model
      const doctor = await Doctor.findOne({ 'contact.email': email });
      
      if (doctor) {
        user = doctor;
        isDoctor = true;
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    }

    // Verify password
    let isPasswordValid;
    if (isDoctor) {
      isPasswordValid = await bcrypt.compare(password, user.login.password);
    } else {
      isPasswordValid = await bcrypt.compare(password, user.password);
    }
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token with role
    const token = jwt.sign(
      { 
        id: user._id,
        role: isDoctor ? 'doctor' : (user.role || 'user'), // Explicitly set 'doctor' role
        isDoctor  // Keep this flag for backward compatibility
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Collect IP and device info from request headers
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Prepare user data based on account type
    let userData;
    
    if (isDoctor) {
      // For doctors, include all relevant fields for dashboard rendering
      userData = {
        id: user._id,
        firstName: user.name.firstName,
        lastName: user.name.lastName,
        email: user.contact.email,
        phone: user.contact.phone,
        role: 'doctor', // Always explicitly set role
        specialization: user.specialization,
        experience: user.experience,
        qualifications: user.qualifications || [],
        address: user.address,
        licenseNumber: user.licenseNumber,
        availability: user.availability || {},
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        fullName: `${user.name.firstName} ${user.name.lastName}`,
        ipInfo: {
          ipAddress,
          userAgent
        }
      };
      
      // Update last login time for doctor
      await user.updateOne({ 'login.lastLogin': new Date() });
    } else {
      // Convert DOB to ISO string format
      let formattedDOB = null;
      if (user.dob) {
        formattedDOB = new Date(user.dob).toISOString();
      }

      userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: formattedDOB,
        relation: user.relation,
        role: user.role,
        completedAssessments: user.completedAssessments || 0,
        hasCompletedRegistration: user.hasCompletedRegistration,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        ipInfo: {
          ipAddress,
          userAgent
        }
      };
    }

    // Log login activity
    console.log(`Login: ${isDoctor ? 'Doctor' : 'User'} - Role: ${isDoctor ? 'doctor' : user.role} - ${user.contact?.email || user.email} (${ipAddress}) at ${new Date().toISOString()}`);

    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Verify token endpoint with more debugging
exports.verifyToken = async (req, res) => {
  try {
    // Token has already been verified by the 'protect' middleware
    const userData = {
      id: req.user.id,
      role: req.user.role,
      isAdmin: req.user.role === 'admin'
    };
    
    console.log('Token verified successfully for user:', userData);

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: userData
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};
