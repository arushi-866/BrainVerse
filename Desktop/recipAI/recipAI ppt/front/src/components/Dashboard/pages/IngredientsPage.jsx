import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const IngredientsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'grams',
    category: 'vegetables',
    expiryDate: ''
  });

  const categories = [
    { id: 'vegetables', name: 'Vegetables', icon: 'ri-plant-line' },
    { id: 'fruits', name: 'Fruits', icon: 'ri-apple-line' },
    { id: 'meat', name: 'Meat', icon: 'ri-meat-line' },
    { id: 'dairy', name: 'Dairy', icon: 'ri-cup-line' },
    { id: 'grains', name: 'Grains', icon: 'ri-seed-2-line' },
    { id: 'spices', name: 'Spices', icon: 'ri-flask-line' }
  ];

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setIngredients([...ingredients, { ...newIngredient, id: Date.now() }]);
      setNewIngredient({
        name: '',
        quantity: '',
        unit: 'grams',
        category: 'vegetables',
        expiryDate: ''
      });
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleFindRecipes = async () => {
    if (ingredients.length === 0) {
      toast.error('Please add some ingredients first!');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:2006/api/recipes/suggest',
        { ingredients },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Store recipes in localStorage for the recipes page
        localStorage.setItem('suggestedRecipes', JSON.stringify(response.data.recipes));
        toast.success('Recipes found! Redirecting...');
        navigate('/dashboard/recipes/suggestions');
      }
    } catch (error) {
      console.error('Error finding recipes:', error);
      toast.error(error.response?.data?.message || 'Error finding recipes');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter ingredients based on category and search term
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Add Ingredients */}
        <div className="flex-1 bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            My Ingredients
          </h2>
          <p className="text-green-700 mb-6">Add ingredients to find matching recipes</p>

          {/* Add New Ingredient Form */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Ingredient name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                className="bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                className="bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={newIngredient.unit}
                onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                className="bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="grams">Grams</option>
                <option value="kg">Kilograms</option>
                <option value="ml">Milliliters</option>
                <option value="l">Liters</option>
                <option value="pieces">Pieces</option>
              </select>
              <button
                onClick={handleAddIngredient}
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
              >
                Add Ingredient
              </button>
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIngredients.map(ingredient => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-green-700 font-medium">{ingredient.name}</h3>
                    <p className="text-green-700 text-sm">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                    className="text-red-400 hover:text-red-600 transition-colors duration-300"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section - Search & Actions */}
        <div className="w-full md:w-80 space-y-6">
          {/* Search Section */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Search Ingredients</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-green-200 rounded-xl text-green-700 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-green-700"></i>
            </div>
          </div>

          {/* Find Recipes Section */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Find Recipes</h3>
            <button
              onClick={handleFindRecipes}
              disabled={isLoading || ingredients.length === 0}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-all duration-300 
                ${ingredients.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/30'}`}
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Finding Recipes...</span>
                </>
              ) : (
                <>
                  <i className="ri-search-2-line"></i>
                  <span>Find Recipes</span>
                </>
              )}
            </button>
            <p className="text-sm text-green-700 mt-4">
              {ingredients.length === 0 
                ? 'Add ingredients to get started' 
                : `${ingredients.length} ingredients available`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsPage;
