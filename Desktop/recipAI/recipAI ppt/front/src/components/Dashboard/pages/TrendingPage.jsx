import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import seedRecipes from '../../../seed';

const TrendingPage = () => {
  const [trendingRecipes, setTrendingRecipes] = useState([]);

  useEffect(() => {
    // Get 6 random recipes from seed data
    const getRandomRecipes = () => {
      const shuffled = [...seedRecipes].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 6).map(recipe => ({
        ...recipe,
        rating: recipe.difficulty === 'Easy' ? 4.8 : 
                recipe.difficulty === 'Medium' ? 4.5 : 4.2,
        tags: recipe.tags || [],
        cuisine: recipe.cuisine || 'International',
        calories: recipe.nutrition?.calories || 'N/A'
      }));
    };

    setTrendingRecipes(getRandomRecipes());
  }, []);

  const handleSaveRecipe = async (recipe) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:2006/api/recipes/save',
        { recipe },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Recipe saved to favorites!');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error(error.response?.data?.message || 'Failed to save recipe');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text">Trending Recipes</h1>
          <p className="text-text-light">Discover what's popular in the community</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-3">
          <select className="px-4 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-primary">
            <option>All Cuisines</option>
            <option>Italian</option>
            <option>Asian</option>
            <option>Mexican</option>
          </select>
          <select className="px-4 py-2 rounded-xl border border-border bg-white text-sm focus:outline-none focus:border-primary">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingRecipes.map((recipe, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300"
          >
            {/* Recipe Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="flex items-center gap-1 text-white">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="text-sm font-medium">{recipe.rating}</span>
                </div>
              </div>
            </div>

            {/* Recipe Content */}
            <div className="p-5">
              <h3 className="font-semibold text-lg text-white mb-2">{recipe.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.tags.slice(0, 3).map((tag, index) => (
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
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-fire-line"></i>
                  <span>{recipe.calories}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-restaurant-line"></i>
                  <span>{recipe.cuisine}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-signal-tower-line"></i>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button 
                  onClick={() => handleSaveRecipe(recipe)}
                  className="flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <i className="ri-heart-line"></i>
                  <span className="text-sm font-medium">Save Recipe</span>
                </button>
                <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors duration-300">
                  View Recipe
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;
