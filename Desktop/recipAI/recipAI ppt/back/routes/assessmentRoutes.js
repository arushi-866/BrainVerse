const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  startAssessment,
  submitAnswers,
  getAssessmentHistory,
  getAssessmentById,
  checkAssessment,
  getCompletedCount,
  getChildStats,
  getAssessmentResults
} = require('../controllers/assessmentController');

// Protected routes
router.use(protect);

// Check if assessment is already completed
router.get('/check/:assessmentNumber', checkAssessment);

// Existing routes
router.post('/start', startAssessment);
router.post('/:assessmentId/submit', submitAnswers);
router.get('/history', getAssessmentHistory);
router.get('/:assessmentId', getAssessmentById);

// New route to get detailed assessment results with risk assessment
router.get('/results/:assessmentId', getAssessmentResults);

// Get completed assessment count
router.get('/completed-count', protect, getCompletedCount);

// Get child statistics
router.get('/child-stats', protect, getChildStats);

module.exports = router;
