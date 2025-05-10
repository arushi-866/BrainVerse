const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const recipeController = require('../controllers/recipeController');
const { createRecipe, getAllRecipes } = require('../controllers/recipeController');

router.post('/suggest', protect, recipeController.getRecipeSuggestions);
router.post('/details', protect, recipeController.getRecipeDetails);
router.get('/favorites', protect, recipeController.getFavoriteRecipes);
router.delete('/favorites/:id', protect, recipeController.removeFavoriteRecipe);  // Add this line
router.post('/save', protect, recipeController.saveRecipe);
router.post('/create', protect, createRecipe);
router.get('/all', protect, getAllRecipes);

module.exports = router;
