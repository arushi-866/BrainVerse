import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Filter, Search } from 'lucide-react';

const CommunityForum = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommunity, setSelectedCommunity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const communities = [
    { value: "all", label: "All Communities" },
    { value: "punjabi", label: "Punjabi" },
    { value: "bengali", label: "Bengali" },
    { value: "gujarati", label: "Gujarati" },
    { value: "south indian", label: "South Indian" },
    { value: "rajasthani", label: "Rajasthani" },
    { value: "maharashtrian", label: "Maharashtrian" },
    { value: "kashmiri", label: "Kashmiri" },
    { value: "goan", label: "Goan" }
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:2006/api/recipes/all', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setRecipes(response.data.recipes);
        setFilteredRecipes(response.data.recipes);
      }
    } catch (error) {
      toast.error('Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...recipes];

    // Apply community filter (case-insensitive)
    if (selectedCommunity && selectedCommunity.toLowerCase() !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.community?.toLowerCase() === selectedCommunity.toLowerCase()
      );
    }

    // Apply search filter (improved to search in title, description, and ingredients)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title?.toLowerCase().includes(searchLower) ||
        recipe.description?.toLowerCase().includes(searchLower) ||
        recipe.ingredients?.toLowerCase().includes(searchLower) ||
        recipe.community?.toLowerCase().includes(searchLower)
      );
    }

    // Enhanced sorting logic
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
        break;
      default:
        break;
    }

    setFilteredRecipes(filtered);
  }, [selectedCommunity, searchTerm, sortBy, recipes]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">Community Recipe Forum</h1>
        <p className="text-gray-600">Discover and share authentic recipes from different Indian cuisines</p>
      </div>

      {/* Filters and Search - Updated backdrop-blur */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 mb-8 border border-gray-200/20 sticky top-4 z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            >
              {communities.map(community => (
                <option 
                  key={community.value} 
                  value={community.value}
                >
                  {community.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
            >
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={recipe.image || '/api/placeholder/400/300'}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-green-700">{recipe.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={recipe.user?.avatar}
                      alt={recipe.user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{recipe.user?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{recipe.rating || '4.5'} ★</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal with improved backdrop blur */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-xl max-w-2xl w-full p-6 shadow-xl border border-white/20"
          >
            {/* ...existing modal content... */}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;
