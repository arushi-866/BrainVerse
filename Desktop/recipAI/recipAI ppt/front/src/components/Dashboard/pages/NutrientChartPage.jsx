import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const balancedDietData = [
  { name: 'Carbohydrates', value: 50, color: '#FF6384' },
  { name: 'Protein', value: 20, color: '#36A2EB' },
  { name: 'Fats', value: 25, color: '#FFCE56' },
  { name: 'Vitamins & Minerals', value: 5, color: '#4BC0C0' },
];

const nutrientSources = {
  Protein: {
    Veg: ["Lentils", "Chickpeas", "Tofu", "Quinoa", "Greek Yogurt", "Peanuts", "Cottage Cheese", "Pumpkin Seeds", "Black Beans", "Almonds", "Tempeh"],
    NonVeg: ["Chicken", "Eggs", "Fish", "Turkey", "Beef", "Pork", "Duck", "Salmon", "Shrimp"]
  },
  Carbohydrates: {
    Veg: ["Rice", "Bread", "Pasta", "Fruits", "Dairy", "Honey", "Oats", "Quinoa", "Sweet Potatoes", "Beans", "Corn"],
    NonVeg: []
  },
  Fats: {
    Veg: ["Nuts", "Avocados", "Olive Oil", "Dark Chocolate", "Chia Seeds", "Flax Seeds", "Coconut", "Peanut Butter", "Pumpkin Seeds", "Sesame Seeds"],
    NonVeg: ["Fish", "Butter", "Cheese", "Eggs", "Fatty Fish", "Full-Fat Yogurt", "Mayonnaise", "Ghee", "Heavy Cream"]
  },
  "Vitamins & Minerals": {
    Veg: ["Spinach", "Kale", "Carrots", "Sweet Potatoes", "Broccoli", "Bell Peppers", "Oranges", "Bananas", "Berries", "Tomatoes"],
    NonVeg: ["Liver", "Oysters", "Salmon", "Egg Yolks", "Sardines", "Beef", "Chicken", "Tuna", "Pork", "Shellfish"]
  }
};

const NutrientChartPage = () => {
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const nutrients = {
    vitamins: [
      { name: 'Vitamin A', benefits: 'Vision, immune system', sources: ['Sweet potatoes', 'Carrots', 'Spinach'], rda: '900mcg' },
      { name: 'Vitamin C', benefits: 'Immune system, skin health', sources: ['Oranges', 'Strawberries', 'Bell peppers'], rda: '90mg' },
      { name: 'Vitamin D', benefits: 'Bone health, immunity', sources: ['Fatty fish', 'Egg yolks', 'Mushrooms'], rda: '15mcg' },
      { name: 'Vitamin B12', benefits: 'Energy, nerve function', sources: ['Meat', 'Fish', 'Dairy'], rda: '2.4mcg' }
    ],
    minerals: [
      { name: 'Iron', benefits: 'Oxygen transport, energy', sources: ['Red meat', 'Spinach', 'Lentils'], rda: '18mg' },
      { name: 'Calcium', benefits: 'Bone health, muscle function', sources: ['Dairy', 'Tofu', 'Leafy greens'], rda: '1000mg' },
      { name: 'Magnesium', benefits: 'Muscle function, energy', sources: ['Nuts', 'Seeds', 'Whole grains'], rda: '400mg' },
      { name: 'Zinc', benefits: 'Immune system, wound healing', sources: ['Meat', 'Shellfish', 'Legumes'], rda: '11mg' }
    ],
    macros: [
      { name: 'Protein', benefits: 'Muscle building, repair', sources: ['Meat', 'Fish', 'Legumes'], rda: '50g' },
      { name: 'Carbohydrates', benefits: 'Energy, brain function', sources: ['Grains', 'Fruits', 'Vegetables'], rda: '300g' },
      { name: 'Healthy Fats', benefits: 'Brain health, absorption', sources: ['Avocados', 'Nuts', 'Olive oil'], rda: '65g' },
      { name: 'Fiber', benefits: 'Digestive health', sources: ['Whole grains', 'Vegetables', 'Fruits'], rda: '25g' }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Nutrients', icon: 'ri-archive-line' },
    { id: 'vitamins', name: 'Vitamins', icon: 'ri-medicine-bottle-line' },
    { id: 'minerals', name: 'Minerals', icon: 'ri-test-tube-line' },
    { id: 'macros', name: 'Macronutrients', icon: 'ri-scales-line' }
  ];

  const getNutrients = () => {
    if (selectedCategory === 'all') {
      return Object.values(nutrients).flat();
    }
    return nutrients[selectedCategory] || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black">Nutrient Chart</h1>
          <p className="text-[#66A896]">Essential nutrients and their sources</p>
        </div>
      </div>

      {/* Pie Chart Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-[#2D3748]/20"
      >
        <h2 className="text-xl font-semibold text-[#EAEAEA] mb-4">Balanced Diet Composition</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={balancedDietData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {balancedDietData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Filters */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap
              ${selectedCategory === category.id 
                ? 'bg-[#E67E22] text-white' 
                : 'bg-[#1E293B] text-[#66A896] hover:bg-[#E67E22]/10'}`}
          >
            <i className={category.icon}></i>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Nutrient Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getNutrients().map((nutrient, index) => (
          <motion.div
            key={nutrient.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg p-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {nutrient.name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#66A896]">
                  <i className="ri-heart-pulse-line"></i>
                  <span className="text-sm">Benefits:</span>
                </div>
                <p className="text-gray-300 text-sm">{nutrient.benefits}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#66A896]">
                  <i className="ri-leaf-line"></i>
                  <span className="text-sm">Food Sources:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nutrient.sources.map((source, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs bg-white/10 text-white/90 rounded-full"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <i className="ri-scales-line text-[#E67E22]"></i>
                <span className="text-sm text-gray-400">Recommended Daily:</span>
                <span className="text-sm text-white font-medium">{nutrient.rda}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Nutrient Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(nutrientSources).map((nutrient, index) => (
          <motion.button
            key={index}
            className={`p-4 rounded-xl transition-all duration-300 ${
              selectedNutrient === nutrient
                ? 'bg-[#E67E22] text-white'
                : 'bg-[#1E293B] text-[#66A896] hover:bg-[#E67E22]/10'
            }`}
            onClick={() => setSelectedNutrient(nutrient)}
            whileHover={{ scale: 1.02 }}
          >
            {nutrient}
          </motion.button>
        ))}
      </div>

      {/* Selected Nutrient Details */}
      {selectedNutrient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1E293B] rounded-2xl p-6 shadow-lg border border-[#2D3748]/20"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#EAEAEA]">
              Sources of {selectedNutrient}
            </h2>
            <button
              onClick={() => setSelectedNutrient(null)}
              className="p-2 hover:bg-white/10 rounded-lg text-[#66A896]"
            >
              <i className="ri-close-line text-xl" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#4CAF50]">Vegetarian Sources</h3>
              <div className="grid grid-cols-2 gap-2">
                {nutrientSources[selectedNutrient].Veg.map((source, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-[#4CAF50]/10 rounded-lg text-[#4CAF50] text-sm"
                  >
                    {source}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#E67E22]">Non-Vegetarian Sources</h3>
              <div className="grid grid-cols-2 gap-2">
                {nutrientSources[selectedNutrient].NonVeg.length > 0 ? (
                  nutrientSources[selectedNutrient].NonVeg.map((source, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-[#E67E22]/10 rounded-lg text-[#E67E22] text-sm"
                    >
                      {source}
                    </div>
                  ))
                ) : (
                  <p className="text-[#66A896]">No non-vegetarian sources</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NutrientChartPage;
