const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  prepTime: {
    type: String,
    required: true
  },
  servings: {
    type: String,
    required: true
  },
  ingredients: [{
    item: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    notes: String
  }],
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    timing: String
  }],
  nutritionalInfo: {
    calories: String,
    protein: String,
    carbs: String,
    fat: String
  },
  tags: [String],
  tips: [String],
  storageInfo: String,
  allergens: [String],
  image: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
    required: true
  },
  cuisine: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Add text index for search functionality
recipeSchema.index({
  title: 'text',
  'ingredients.item': 'text',
  tags: 'text'
});

module.exports = mongoose.model('Recipe', recipeSchema);
