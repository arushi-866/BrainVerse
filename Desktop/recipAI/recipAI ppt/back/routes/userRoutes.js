const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');


// User profile routes - make sure these are uncommented and properly defined
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);
router.put('/password', protect, userController.updatePassword);
router.put('/avatar', protect, userController.updateAvatar);



// Child management routes - FIX: Check if these functions exist in the controller
// router.post('/children', protect, userController.addChild);
// router.get('/children', protect, userController.getChildren);

// Update BMI route to match the endpoint being called from frontend
router.post('/bmi', protect, userController.updateBMI);

module.exports = router;
