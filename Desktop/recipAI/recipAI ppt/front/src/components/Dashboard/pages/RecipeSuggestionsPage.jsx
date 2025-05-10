import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const getRecipeImage = (title) => {
  // Map common recipe keywords to relevant images
  const keywords = [
    { terms: ['pasta', 'spaghetti', 'noodle', 'macaroni'], image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070' },
    { terms: ['chicken', 'poultry', 'grilled chicken', 'fried chicken'], image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2013' },
    { terms: ['soup', 'stew', 'broth', 'chowder'], image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071' },
    { terms: ['salad', 'lettuce', 'greens', 'caesar salad'], image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=2074' },
    { terms: ['rice', 'fried rice', 'brown rice', 'basmati'], image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=2070' },
    { terms: ['fish', 'seafood', 'shrimp', 'salmon', 'tuna'], image: 'https://images.unsplash.com/photo-1572269991443-e422ed009832?q=80&w=2070' },
    { terms: ['beef', 'steak', 'burger', 'grilled beef'], image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=2070' },
    { terms: ['vegetable', 'veggies', 'zucchini', 'broccoli'], image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084' },
    { terms: ['dessert', 'cake', 'ice cream', 'chocolate'], image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2070' },
    { terms: ['pizza', 'pepperoni pizza', 'cheese pizza'], image: 'https://images.unsplash.com/photo-1542282811-943ef1a977c8?q=80&w=2070' },
    { terms: ['bread', 'toast', 'bagel', 'buns'], image: 'https://images.unsplash.com/photo-1588483977150-9c2127ab7bcc?q=80&w=2070' },
    { terms: ['smoothie', 'shake', 'fruit juice'], image: 'https://images.unsplash.com/photo-1613471291539-e88574a47f4d?q=80&w=2070' },
    { terms: ['pancake', 'waffle', 'breakfast'], image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2070' },
    { terms: ['taco', 'burrito', 'mexican food'], image: 'https://images.unsplash.com/photo-1617692855025-03e1a5c9a818?q=80&w=2070' },
    { terms: ['pork', 'bacon', 'ham', 'sausage'], image: 'https://images.unsplash.com/photo-1605276374104-dee2a0edaf90?q=80&w=2070' },
    { terms: ['sandwich', 'sub', 'grilled cheese'], image: 'https://images.unsplash.com/photo-1606755962774-595d3628b8a7?q=80&w=2070' },
    { terms: ['pasta carbonara', 'lasagna', 'ravioli'], image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2070' },
    { terms: ['curry', 'indian curry', 'butter chicken'], image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2070' },
    { terms: ['sushi', 'nigiri', 'maki roll'], image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070' },
    { terms: ['donut', 'doughnut', 'pastry'], image: 'https://images.unsplash.com/photo-1606755962774-595d3628b8a7?q=80&w=2070' },
    { terms: ['hot dog', 'sausage roll'], image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=2070' },
    { terms: ['french fries', 'potato fries'], image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=2070' },
    { terms: ['falafel', 'hummus', 'middle eastern food'], image: 'https://images.unsplash.com/photo-1627309304976-2b70a23c75eb?q=80&w=2070' },
    { terms: ['ramen', 'japanese noodles'], image: 'https://images.unsplash.com/photo-1610970878453-4c3c2a3f5151?q=80&w=2070' },
    { terms: ['dim sum', 'dumpling'], image: 'https://images.unsplash.com/photo-1573547427830-21e18e68fbd8?q=80&w=2070' },
    { terms: ['bbq', 'barbecue', 'grilled food'], image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2070' },
    { terms: ['oatmeal', 'porridge'], image: 'https://images.unsplash.com/photo-1610792490008-4b3a46c742c8?q=80&w=2070' },
    { terms: ['cheesecake', 'strawberry cheesecake'], image: 'https://images.unsplash.com/photo-1624437830390-66f6a56a48c4?q=80&w=2070' },
    { terms: ['milkshake', 'strawberry milkshake', 'chocolate shake'], image: 'https://images.unsplash.com/photo-1617196035154-6ff05e42528c?q=80&w=2070' },
    { terms: ['coffee', 'latte', 'espresso'], image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070' },
    { terms: ['tea', 'chai', 'green tea'], image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070' },
    { terms: ['avocado toast', 'healthy breakfast'], image: 'https://images.unsplash.com/photo-1605478371456-8a3baf52f7f1?q=80&w=2070' },
    { terms: ['stir fry', 'asian cuisine'], image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070' }
];

  const defaultImage = "https://images.unsplash.com/photo-1495546968767-f0573cca821e?q=80&w=2070";
  
  const lowerTitle = title.toLowerCase();
  const matchedKeyword = keywords.find(k => k.terms.some(term => lowerTitle.includes(term)));
  
  return matchedKeyword ? matchedKeyword.image : defaultImage;
};

const RecipeSuggestionsPage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);

  // Get recipes from localStorage
  const recipes = JSON.parse(localStorage.getItem('suggestedRecipes') || '[]');

  const handleViewRecipe = async (recipe) => {
    setSelectedRecipe(recipe);
    setIsLoading(true);
    
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
      setIsLoading(false);
    }
  };

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
        toast.success('Recipe saved successfully!');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error(error.response?.data?.message || 'Failed to save recipe');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#EAEAEA]">Recipe Suggestions</h1>
          <p className="text-[#66A896]">Based on your available ingredients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300"
          >
            {/* Recipe Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={getRecipeImage(recipe.title)}
                alt={recipe.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="flex items-center gap-1 text-white">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="text-sm font-medium">
                    {recipe.difficulty === 'Easy' ? '4.5' : 
                     recipe.difficulty === 'Medium' ? '4.0' : '3.5'}
                  </span>
                </div>
              </div>
            </div>

            {/* Recipe Content */}
            <div className="p-5">
              <h3 className="font-semibold text-lg text-white mb-2">{recipe.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full"
                  >
                    {ingredient.split(' ').slice(-1)[0]}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <i className="ri-time-line"></i>
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-list-check-2"></i>
                  <span>{recipe.ingredients.length} ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-restaurant-line"></i>
                  <span>{recipe.instructions.length} steps</span>
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

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/10 relative"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : recipeDetails ? (
              <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start top-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-4 -mt-4 -mx-8 px-8 border-b border-white/10">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{recipeDetails.title}</h2>
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-2">
                        <i className="ri-time-line"></i>
                        {recipeDetails.prepTime}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="ri-user-line"></i>
                        {recipeDetails.servings}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="ri-bar-chart-line"></i>
                        {recipeDetails.difficulty}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedRecipe(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="relative group">
                      <img 
                        src={getRecipeImage(recipeDetails.title)}
                        alt={recipeDetails.title}
                        className="w-full h-80 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <i className="ri-heart-pulse-line text-[#E67E22]"></i>
                        Nutritional Info
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(recipeDetails.nutritionalInfo).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3 text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-[#E67E22]"></div>
                            <span className="capitalize">{key}:</span>
                            <span className="text-white font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <i className="ri-list-check-2 text-[#E67E22]"></i>
                        Ingredients
                      </h3>
                      <ul className="space-y-3">
                        {recipeDetails.ingredients.map((ing, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-300">
                            <div className="w-2 h-2 rounded-full bg-[#E67E22]"></div>
                            <span className="font-medium text-white">{ing.amount}</span>
                            <span>{ing.item}</span>
                            {ing.notes && (
                              <span className="text-sm text-gray-400 italic">({ing.notes})</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                      <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                        <i className="ri-book-2-line text-[#E67E22]"></i>
                        Instructions
                      </h3>
                      <ol className="space-y-6">
                        {recipeDetails.instructions.map((inst, index) => (
                          <li key={index} className="flex gap-4 group">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E67E22]/10 text-[#E67E22] flex items-center justify-center font-bold border border-[#E67E22]/20">
                              {inst.step}
                            </span>
                            <div className="space-y-2">
                              <p className="text-gray-300">{inst.description}</p>
                              {inst.timing && (
                                <span className="inline-flex items-center gap-1 text-sm text-[#E67E22] bg-[#E67E22]/10 px-2 py-1 rounded-full">
                                  <i className="ri-time-line"></i>
                                  {inst.timing}
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                  <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                    <i className="ri-lightbulb-line text-[#E67E22]"></i>
                    Chef's Tips
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipeDetails.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E67E22]/10 text-[#E67E22] flex items-center justify-center">
                          <i className="ri-checkbox-circle-line"></i>
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
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

export default RecipeSuggestionsPage;
