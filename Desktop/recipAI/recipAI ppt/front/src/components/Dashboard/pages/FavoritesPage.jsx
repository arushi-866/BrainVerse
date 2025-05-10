import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

  const fetchFavoriteRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:2006/api/recipes/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setFavoriteRecipes(response.data.recipes);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorite recipes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:2006/api/recipes/favorites/${recipeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Recipe removed from favorites');
        // Update the local state by removing the recipe
        setFavoriteRecipes(prevRecipes => 
          prevRecipes.filter(recipe => recipe._id !== recipeId)
        );
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error(error.response?.data?.message || 'Failed to remove from favorites');
    }
  };

  const handleViewRecipe = async (recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:2006/api/recipes/details',
        { recipe },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setRecipeDetails(response.data.recipeDetails);
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      toast.error('Failed to load recipe details');
    } finally {
      setIsDetailLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E67E22]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Favorite Recipes</h1>
          <p className="text-[#66A896]">Your saved recipe collection</p>
        </div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-12 bg-[#1E293B] rounded-2xl">
          <i className="ri-heart-line text-4xl text-[#66A896] mb-4"></i>
          <h3 className="text-xl font-semibold text-[#EAEAEA] mb-2">No Favorite Recipes Yet</h3>
          <p className="text-[#66A896]">Start saving recipes you love!</p>
          <button
            onClick={() => navigate('/dashboard/ingredients')}
            className="mt-6 px-6 py-2 bg-[#E67E22] text-white rounded-xl hover:bg-[#D35400] transition-colors duration-300"
          >
            Find Recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300 p-6"
            >
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-white">{recipe.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {recipe.tags?.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line"></i>
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-fire-line"></i>
                    <span>{recipe.nutritionalInfo?.calories || 'N/A'}</span>
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

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button 
                    onClick={() => handleRemoveFavorite(recipe._id)}
                    className="flex items-center gap-2 text-white/70 hover:text-white"
                  >
                    <i className="ri-heart-fill text-[#E67E22]"></i>
                    <span className="text-sm font-medium">Remove</span>
                  </button>
                  <button 
                    onClick={() => handleViewRecipe(recipe)}
                    className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors duration-300"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/10 relative"
          >
            <button 
              onClick={() => {
                setSelectedRecipe(null);
                setRecipeDetails(null);
              }}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>

            {isDetailLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : recipeDetails ? (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white">{recipeDetails.title}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipeDetails.ingredients.map((ing, idx) => (
                          <li key={idx} className="text-gray-300">
                            • {ing.amount} {ing.item} {ing.notes && `(${ing.notes})`}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Instructions</h3>
                      <ol className="space-y-4">
                        {recipeDetails.instructions.map((inst, idx) => (
                          <li key={idx} className="text-gray-300">
                            <span className="font-bold text-white">{inst.step}.</span>{' '}
                            {inst.description}
                            {inst.timing && (
                              <span className="block text-sm text-gray-400 mt-1">
                                ⏱ {inst.timing}
                              </span>
                            )}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-gray-400">Prep Time</span>
                        <p className="text-white">{recipeDetails.prepTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Cook Time</span>
                        <p className="text-white">{recipeDetails.cookTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Servings</span>
                        <p className="text-white">{recipeDetails.servings}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Difficulty</span>
                        <p className="text-white">{recipeDetails.difficulty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                Failed to load recipe details
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
