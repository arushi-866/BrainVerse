import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [dailyStats, setDailyStats] = useState({
    caloriesConsumed: 1200,
    caloriesGoal: 2000,
    protein: 45,
    carbs: 150,
    fat: 35
  });

  const [quickActions] = useState([
    { 
      title: 'Find Recipes', 
      icon: 'ri-search-line',
      desc: 'Find recipes with your available ingredients',
      path: '/dashboard/recipes/find',
      color: 'bg-green-100'
    },
    {
      title: 'Update Pantry',
      icon: 'ri-store-2-line',
      desc: 'Manage your available ingredients',
      path: '/dashboard/ingredients/pantry',
      color: 'bg-green-200'
    },
    {   
      title: 'Track Meals',
      icon: 'ri-calendar-check-line',
      desc: 'Log your daily food intake',
      path: '/dashboard/nutrition/tracker',
      color: 'bg-green-300'
    }
  ]);

  return (
    <div className="space-y-6 bg-white">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Welcome back, {JSON.parse(localStorage.getItem('user'))?.firstName || 'User'}!
          </h2>
          <p className="text-green-700">Let's make something delicious today</p>
          
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(action.path)}
                className="p-4 rounded-xl bg-white hover:bg-green-50 transition-all duration-300 border border-green-100"
              >
                <div className={`w-12 h-12 ${
                  index === 0 ? 'bg-green-200' : 
                  index === 1 ? 'bg-green-300' : 
                  'bg-green-400'
                } rounded-xl flex items-center justify-center mb-3`}>
                  <i className={`${action.icon} text-xl text-green-900`}></i>
                </div>
                <h3 className="text-green-900 font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-green-700">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Nutrition Overview */}
        <div className="w-full md:w-80 bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Today's Nutrition</h3>
          
          <div className="w-32 h-32 mx-auto mb-4">
            <CircularProgressbar
              value={(dailyStats.caloriesConsumed / dailyStats.caloriesGoal) * 100}
              text={`${dailyStats.caloriesConsumed}/${dailyStats.caloriesGoal}`}
              styles={buildStyles({
                textSize: '12px',
                pathColor: '#4CAF50',
                textColor: '#1B5E20',
                trailColor: '#E8F5E9'
              })}
            />
          </div>

          <div className="space-y-3">
            {/* {[
              { label: 'Protein', value: dailyStats.protein, unit: 'g', color: 'bg-green-200' },
              { label: 'Carbs', value: dailyStats.carbs, unit: 'g', color: 'bg-green-300' },
              { label: 'Fat', value: dailyStats.fat, unit: 'g', color: 'bg-green-400' }
            ].map((nutrient, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-green-700">{nutrient.label}</span>
                  <span className="text-green-900 font-medium">{nutrient.value}{nutrient.unit}</span>
                </div>
                <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${nutrient.color}`}
                    style={{ width: `${(nutrient.value / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Recipe Suggestions & Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recipe Suggestions */}
        <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-green-900">Suggested Recipes</h3>
            <button 
              onClick={() => navigate('/dashboard/recipes/suggestions')}
              className="text-green-700 hover:text-green-900 transition-colors duration-300"
            >
              View all
            </button>
          </div>

          <div className="space-y-4">
            {/* Recipe cards would go here */}
            <p className="text-green-600 text-center py-8">
              Add ingredients to your pantry to get personalized recipe suggestions
            </p>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-green-900">Inventory Alerts</h3>
            <button 
              onClick={() => navigate('/dashboard/ingredients/pantry')}
              className="text-green-700 hover:text-green-900 transition-colors duration-300"
            >
              Manage pantry
            </button>
          </div>

          <div className="space-y-4">
            {/* Low stock & expiring items would go here */}
            <p className="text-green-600 text-center py-8">
              No alerts at the moment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;