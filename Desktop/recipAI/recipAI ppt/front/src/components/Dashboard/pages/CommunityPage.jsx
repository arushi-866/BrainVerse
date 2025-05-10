import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Recipe Card Component
const RecipeCard = ({ recipe, index, onCardClick, onSaveRecipe }) => {
  return (
    <motion.div
      key={index}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300"
    >
      {/* Recipe Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image || '/api/placeholder/400/300'}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/api/placeholder/400/300';
            e.target.alt = 'Image not available';
          }}
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className="flex items-center gap-1 text-white">
            <i className="ri-star-fill text-yellow-400"></i>
            <span className="text-sm font-medium">{recipe.rating || '4.5'}</span>
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-white mb-2">{recipe.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {(recipe.tags || [recipe.community]).slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <i className="ri-time-line"></i>
            <span>{recipe.prepTime || '30 mins'}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-fire-line"></i>
            <span>{recipe.calories || '400 kcal'}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-restaurant-line"></i>
            <span>{recipe.cuisine || recipe.community}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-signal-tower-line"></i>
            <span>{recipe.difficulty || 'Medium'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => onSaveRecipe(recipe)}
            className="flex items-center gap-2 text-white/70 hover:text-white"
          >
            <i className="ri-heart-line"></i>
            <span className="text-sm font-medium">Save Recipe</span>
          </button>
          <button 
            onClick={() => onCardClick(recipe)}
            className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors duration-300"
          >
            View Recipe
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Recipe Detail Modal Component
const RecipeDetailModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        
        <img 
          src={recipe.image || '/api/placeholder/800/400'} 
          alt={recipe.title} 
          className="w-full h-64 object-cover rounded-t-lg"
          onError={(e) => {
            e.target.src = '/api/placeholder/800/400';
            e.target.alt = 'Image not available';
          }}
        />
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-700">{recipe.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-green-600">Community</h3>
              <p>{recipe.community}</p>
            </div>
            <div>
              <h3 className="font-semibold text-green-600">Author</h3>
              <p>{recipe.author}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-green-600 mb-2">Description</h3>
            <p className="text-gray-700">{recipe.description}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold text-green-600 mb-2">Ingredients</h3>
            <p className="text-gray-700">{recipe.ingredients || 'No ingredients specified'}</p>
          </div>
          
          {recipe.fullRecipe && (
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Full Recipe</h3>
              <p className="text-gray-700">{recipe.fullRecipe}</p>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500">
            {recipe.comments} comments
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Recipe Communities Component
const IndianRecipeCommunities = () => {
  const [recipeName, setRecipeName] = useState('');
  const [community, setCommunity] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [description, setDescription] = useState('');
  const [fullRecipe, setFullRecipe] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);

  // Predefined recipes
  const predefinedRecipes = [
    {
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2066&auto=format&fit=crop",
      title: "Samosa",
      description: "A traditional Punjabi recipe with qimND and more.",
      community: "Punjabi",
      author: "Traditional Chef",
      comments: 0,
      ingredients: "Potatoes, green chilies, ginger, coriander, salt, bread crumbs",
      fullRecipe: "Boil and mash potatoes. Mix with spices and herbs. Form into patties. Coat with bread crumbs. Deep fry until golden brown. Serve hot with chutney."
    },
    {
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1984&auto=format&fit=crop",
      title: "Authentic Punjabi Butter Chicken",
      description: "The classic creamy tomato-based curry with tender chicken pieces, best served with naan or jeera rice.",
      community: "Punjabi",
      author: "Chef Harpreet S.",
      comments: 23,
      ingredients: "Chicken, tomato puree, cream, butter, garam masala, kasuri methi, garlic, ginger, yogurt",
      fullRecipe: "Marinate chicken in yogurt and spices. Grill or cook chicken. Prepare a rich tomato-cream sauce with butter and spices. Combine chicken with sauce. Garnish with cream and kasuri methi. Serve hot."
    },
    {
      image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?q=80&w=2080&auto=format&fit=crop",
      title: "Bengali Fish Curry",
      description: "Traditional Bengali-style fish curry with mustard seeds and coconut milk.",
      community: "Bengali",
      author: "Chef Suchitra D.",
      comments: 15,
      rating: "4.8",
      prepTime: "45 mins",
      calories: "320 kcal",
      difficulty: "Medium",
      cuisine: "Bengali",
      tags: ["Bengali", "Seafood", "Curry"],
      ingredients: "Fish, mustard seeds, turmeric, green chilies, coconut milk, mustard oil, onion, tomatoes",
      fullRecipe: "Marinate fish with turmeric and salt. Heat mustard oil, add mustard seeds. Cook onions till golden. Add spices and coconut milk. Simmer and add fish. Cook until done."
    },
    {
      image: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1930&auto=format&fit=crop",
      title: "Gujarati Dhokla",
      description: "Soft and spongy steamed snack made with fermented rice and chickpea flour.",
      community: "Gujarati",
      author: "Chef Meena P.",
      comments: 32,
      rating: "4.7",
      prepTime: "3 hours",
      calories: "180 kcal",
      difficulty: "Hard",
      cuisine: "Gujarati",
      tags: ["Gujarati", "Snack", "Vegetarian"],
      ingredients: "Rice, chickpea flour, yogurt, ginger, green chilies, eno fruit salt, mustard seeds, curry leaves",
      fullRecipe: "Ferment rice and chickpea batter. Add spices and eno. Steam until spongy. Prepare tempering with mustard seeds and curry leaves. Garnish and serve."
    },
    {
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop",
      title: "Kashmiri Rogan Josh",
      description: "Rich and aromatic lamb curry with traditional Kashmiri spices.",
      community: "Kashmiri",
      author: "Chef Kabir R.",
      comments: 28,
      rating: "4.9",
      prepTime: "2 hours",
      calories: "450 kcal",
      difficulty: "Hard",
      cuisine: "Kashmiri",
      tags: ["Kashmiri", "Non-veg", "Spicy"],
      ingredients: "Lamb, yogurt, Kashmiri red chilies, fennel seeds, ginger, garlic, cardamom, cinnamon",
      fullRecipe: "Marinate lamb in yogurt and spices. Cook in slow heat with onions and tomatoes. Add whole spices and simmer until meat is tender. Garnish with fresh coriander."
    },
    {
      image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=1974&auto=format&fit=crop",
      title: "Goan Fish Recheado",
      description: "Spicy and tangy Goan-style stuffed fish with red masala.",
      community: "Goan",
      author: "Chef Maria F.",
      comments: 19,
      rating: "4.6",
      prepTime: "40 mins",
      calories: "280 kcal",
      difficulty: "Medium",
      cuisine: "Goan",
      tags: ["Goan", "Seafood", "Spicy"],
      ingredients: "Pomfret fish, red chilies, garlic, ginger, vinegar, cumin seeds, pepper, tamarind",
      fullRecipe: "Make recheado masala with spices and vinegar. Clean and stuff the fish with masala. Marinate for 30 minutes. Pan fry until golden brown and cooked through."
    }
  ];

  const communities = [
    "Punjabi", "Bengali", "Gujarati", 
    "South Indian", "Rajasthani", 
    "Maharashtrian", "Kashmiri", "Goan"
  ];

  // Load recipes from local storage on component mount
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('userRecipes') || '[]');
    setUserRecipes(savedRecipes);
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle recipe submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName || !community) {
      toast.error('Please fill in recipe name and select a community');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const recipeData = {
        title: recipeName,
        description,
        ingredients,
        fullRecipe,
        community,
        image: imageFile
      };

      console.log('Submitting recipe:', recipeData); // Debug log

      const response = await axios.post(
        'http://localhost:2006/api/recipes/create',
        recipeData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Recipe posted successfully!');
        // Reset form
        setRecipeName('');
        setCommunity('');
        setIngredients('');
        setDescription('');
        setFullRecipe('');
        setImageFile(null);
        
        // Refresh recipes list
        fetchCommunityRecipes();
      }
    } catch (error) {
      console.error('Error posting recipe:', error.response || error);
      toast.error(error.response?.data?.message || 'Error posting recipe');
    }
  };

  const fetchCommunityRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:2006/api/recipes/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUserRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Error fetching community recipes');
    }
  };

  useEffect(() => {
    fetchCommunityRecipes();
  }, []);

  // Combine predefined and user recipes
  const allRecipes = [...predefinedRecipes, ...userRecipes];

  return (
    <>
      {selectedRecipe && (
        <RecipeDetailModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
      <div className="max-w-6xl mx-auto p-6">
        {/* Changed from grid to flex-col layout */}
        <div className="flex flex-col gap-8">
          {/* Recipe Submission Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">Share Your Recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Recipe Name</label>
                <input 
                  type="text" 
                  placeholder="What recipe would you like to share?"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Community</label>
                <select 
                  value={community}
                  onChange={(e) => setCommunity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select a community</option>
                  {communities.map(comm => (
                    <option key={comm} value={comm}>{comm}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea 
                  placeholder="Short description of your recipe..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
                <textarea 
                  placeholder="List ingredients separated by commas..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Recipe</label>
                <textarea 
                  placeholder="Detailed cooking instructions..."
                  value={fullRecipe}
                  onChange={(e) => setFullRecipe(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Add Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded-md file:mr-4 file:rounded-md file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700"
                />
                {imageFile && (
                  <div className="mt-2">
                    <img 
                      src={imageFile} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" /> Post Recipe
              </button>
            </form>
          </div>

          {/* Popular Community Recipes - Now with View Community button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-700">Community Recipes</h2>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                onClick={() => window.open('/dashboard/community/forum', '_blank')}
              >
                <i className="ri-team-line"></i>
                View Community
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.id || index}
                  recipe={recipe}
                  index={index}
                  onCardClick={setSelectedRecipe}
                  onSaveRecipe={(recipe) => {
                    const updatedRecipes = userRecipes.map(r => 
                      r.id === recipe.id ? { ...r, saved: !r.saved } : r
                    );
                    setUserRecipes(updatedRecipes);
                    localStorage.setItem('userRecipes', JSON.stringify(updatedRecipes));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndianRecipeCommunities;