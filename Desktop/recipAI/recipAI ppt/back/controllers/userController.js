const User = require('../models/userModel.js');
// const Child = require('../models/childModel');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { firstName, bmiData } = req.body;
    
    const updateData = {
      firstName,
      bmiData: {
        height: parseFloat(bmiData?.height),
        weight: parseFloat(bmiData?.weight),
        age: parseInt(bmiData?.age),
        bmi: parseFloat(bmiData?.bmi)
      }
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both current and new password are required'
      });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating password',
      error: error.message
    });
  }
};


exports.updateBMI = async (req, res) => {
  try {
    const { bmi, age, weight, height, gender } = req.body;
    
    // Validate all required fields
    if (!bmi || !age || !weight || !height || !gender) {
      return res.status(400).json({
        success: false,
        message: 'All BMI fields are required'
      });
    }

    // Validate numeric values
    if (isNaN(bmi) || isNaN(age) || isNaN(weight) || isNaN(height)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid numeric values provided'
      });
    }

    const userId = req.user.id;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          hasCompletedBmiCalculator: true,
          bmiData: {
            bmi: parseFloat(bmi),
            age: parseInt(age),
            weight: parseFloat(weight),
            height: parseFloat(height),
            gender,
            calculatedAt: new Date()
          }
        }
      },
      { new: true }
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'BMI data updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('BMI Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating BMI data',
      error: error.message
    });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    
    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar URL is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { avatar } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      user
    });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating avatar',
      error: error.message
    });
  }
};