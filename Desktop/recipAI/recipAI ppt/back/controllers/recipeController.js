const { GoogleGenAI } = require("@google/genai");
const Recipe = require('../models/recipeModel');
const CommunityPost = require('../models/communityPostModel');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.getRecipeSuggestions = async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!ingredients || !ingredients.length) {
      return res.status(400).json({
        success: false,
        message: 'No ingredients provided'
      });
    }

    const prompt = `As a culinary expert, create 10 recipes using these ingredients:
    ${ingredients.map(i => `${i.quantity} ${i.unit} of ${i.name}`).join('\n')}

    Create a recipe and return it in valid JSON format (no markdown, no code blocks). Example format:
    {"recipes":[{"title":"Recipe Name","difficulty":"Easy/Medium/Hard","prepTime":"XX mins","ingredients":["ingredient 1","ingredient 2"],"instructions":["step 1","step 2"],"missingIngredients":["item 1","item 2"]}]}`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    try {
      // Clean the response text by removing any markdown code block syntax
      const cleanedText = response.text.replace(/```json\n|\n```/g, '').trim();
      const recipes = JSON.parse(cleanedText);
      
      // Remove the automatic saving of recipes
      res.status(200).json({
        success: true,
        recipes: recipes.recipes // Return raw recipes without saving
      });
    } catch (parseError) {
      console.error('Parse error:', parseError, 'Raw response:', response.text);
      res.status(500).json({
        success: false,
        message: 'Invalid recipe format received',
        error: parseError.message
      });
    }

  } catch (error) {
    console.error('Recipe suggestion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recipes',
      error: error.message
    });
  }
};

exports.saveRecipe = async (req, res) => {
  try {
    const { recipe } = req.body;
    
    // Check if recipe already exists for this user
    const existingRecipe = await Recipe.findOne({
      title: recipe.title,
      createdBy: req.user.id
    });

    if (existingRecipe) {
      return res.status(400).json({
        success: false,
        message: 'Recipe already saved'
      });
    }

    // Format ingredients array to match schema
    const formattedIngredients = recipe.ingredients.map(ingredient => {
      // If ingredient is a string, parse it
      if (typeof ingredient === 'string') {
        const parts = ingredient.split(' ');
        const quantity = parts[0];
        const unit = parts[1] || 'units';
        // Ensure item is never empty by joining remaining parts or using a default
        const item = parts.slice(2).join(' ') || ingredient;
        return {
          item: item.trim(),
          amount: `${quantity} ${unit}`.trim(),
          notes: ''
        };
      }
      
      // If ingredient is an object, ensure required fields
      return {
        item: ingredient.item || ingredient.name || 'Unknown ingredient',
        amount: ingredient.amount || `${ingredient.quantity || 1} ${ingredient.unit || 'units'}`,
        notes: ingredient.notes || ''
      };
    }).filter(ing => ing.item && ing.amount); // Filter out any invalid ingredients

    // Create new recipe with formatted data
    const newRecipe = new Recipe({
      title: recipe.title,
      difficulty: recipe.difficulty || 'Medium',
      prepTime: recipe.prepTime || '30 mins',
      servings: recipe.servings || '4 servings',
      ingredients: formattedIngredients,
      instructions: recipe.instructions.map((instruction, index) => ({
        step: index + 1,
        description: typeof instruction === 'string' ? instruction : instruction.description,
        timing: typeof instruction === 'string' ? '' : (instruction.timing || '')
      })),
      createdBy: req.user.id,
      category: recipe.category || 'Dinner',
      cuisine: recipe.cuisine || 'International',
      favorites: [req.user.id],
      tags: recipe.tags || [],
      nutritionalInfo: recipe.nutritionalInfo || {
        calories: 'N/A',
        protein: 'N/A',
        carbs: 'N/A',
        fat: 'N/A'
      }
    });

    await newRecipe.save();
    
    res.status(201).json({
      success: true,
      message: 'Recipe saved successfully',
      recipe: newRecipe
    });

  } catch (error) {
    console.error('Save recipe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save recipe',
      error: error.message,
      details: error.errors // Include validation errors in response
    });
  }
};

exports.getRecipeDetails = async (req, res) => {
  try {
    const { recipe } = req.body;
    
    const prompt = `Provide a detailed cooking guide for this recipe: "${recipe.title}"
    Using these ingredients: ${recipe.ingredients.join(', ')}

    Return the response in this JSON format:
    {
      "title": "Recipe Name",
      "servings": "X servings",
      "prepTime": "X mins",
      "cookTime": "X mins",
      "difficulty": "Easy/Medium/Hard",
      "nutritionalInfo": {
        "calories": "X per serving",
        "protein": "Xg",
        "carbs": "Xg",
        "fat": "Xg"
      },
      "ingredients": [
        {"item": "ingredient name", "amount": "quantity", "notes": "optional preparation notes"}
      ],
      "instructions": [
        {"step": 1, "description": "detailed step", "timing": "X minutes"}
      ],
      "tips": ["cooking tip 1", "cooking tip 2"],
      "storageInfo": "storage instructions",
      "allergens": ["allergen1", "allergen2"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    const cleanedText = response.text.replace(/```json\n|\n```/g, '').trim();
    const recipeDetails = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      recipeDetails
    });

  } catch (error) {
    console.error('Recipe details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recipe details',
      error: error.message
    });
  }
};

// Add new methods for recipe management
exports.getFavoriteRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({
      favorites: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite recipes',
      error: error.message
    });
  }
};

exports.toggleFavoriteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    const isFavorited = recipe.favorites.includes(req.user.id);
    if (isFavorited) {
      recipe.favorites = recipe.favorites.filter(id => id.toString() !== req.user.id);
    } else {
      recipe.favorites.push(req.user.id);
    }

    await recipe.save();

    res.status(200).json({
      success: true,
      message: isFavorited ? 'Recipe removed from favorites' : 'Recipe added to favorites'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling favorite recipe',
      error: error.message
    });
  }
};

exports.removeFavoriteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    // Remove the user's ID from favorites array
    recipe.favorites = recipe.favorites.filter(id => id.toString() !== userId);
    await recipe.save();

    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites'
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing recipe from favorites',
      error: error.message
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, fullRecipe, community } = req.body;
    
    // Validate required fields
    if (!title || !community) {
      return res.status(400).json({
        success: false,
        message: 'Title and community are required'
      });
    }

    // Create new recipe with default values
    const recipe = new CommunityPost({
      title,
      description: description || '',
      ingredients: ingredients || '',
      fullRecipe: fullRecipe || '',
      community,
      image: req.body.image || '/api/placeholder/400/300',
      user: {
        _id: req.user._id,
        name: req.user.firstName || 'Anonymous',
        avatar: req.user.avatar || 'https://i.pravatar.cc/150'
      },
      cuisine: community, // Default cuisine to community name
      rating: 4.5,
      prepTime: '30 mins',
      calories: '400 kcal',
      difficulty: 'Medium',
      tags: [community]
    });

    const savedRecipe = await recipe.save();
    console.log('Recipe saved successfully:', savedRecipe);

    res.status(201).json({
      success: true,
      message: 'Recipe posted successfully',
      recipe: savedRecipe
    });
  } catch (error) {
    console.error('Recipe creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating recipe',
      error: error.message
    });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await CommunityPost.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recipes',
      error: error.message
    });
  }
};
