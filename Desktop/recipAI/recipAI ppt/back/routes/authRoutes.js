const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);

// Add this additional route to get the OAuth URL for client-side auth flow
router.get('/google/auth-url', (req, res) => {
  try {
    const googleAuth = require('../config/googleAuth');
    
    if (!googleAuth.oauth2Client) {
      return res.status(500).json({ 
        success: false, 
        message: 'Google OAuth not configured' 
      });
    }
    
    const authUrl = googleAuth.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: googleAuth.scopes,
      prompt: 'consent'  // Always prompt to ensure we get a refresh token
    });
    
    res.json({ 
      success: true,
      authUrl 
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating auth URL',
      error: error.message
    });
  }
});

// Add endpoint to receive and store tokens from OAuth flow
router.get('/google/store-token', protect, async (req, res) => {
  try {
    const { code } = req.query;
    const googleAuth = require('../config/googleAuth');
    
    if (!googleAuth.oauth2Client) {
      return res.status(500).json({ success: false, message: 'Google OAuth not configured' });
    }
    
    const { tokens } = await googleAuth.oauth2Client.getToken(code);
    
    // Store refresh token in .env or database (in production)
    // For now we'll just set it in the current OAuth client
    googleAuth.oauth2Client.setCredentials(tokens);
    
    // For real production we'd update the environment variable or DB here
    
    res.json({
      success: true,
      message: 'OAuth tokens received and stored',
      hasRefreshToken: !!tokens.refresh_token
    });
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({
      success: false,
      message: 'Error obtaining tokens',
      error: error.message
    });
  }
});

// Token verification endpoint
router.get('/verify', protect, authController.verifyToken);

// Protected routes
router.get('/me', protect, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
