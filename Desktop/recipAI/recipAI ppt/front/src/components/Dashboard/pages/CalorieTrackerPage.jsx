"use client"

import { useState, useEffect } from "react"
import foodData from '../../../csvjson.json'
import { Search, Plus, Check } from "lucide-react"

export default function CalorieTracker() {
  const [gender, setGender] = useState(null)
  const [calorieGoal, setCalorieGoal] = useState(2000)
  const [consumedCalories, setConsumedCalories] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [foodLog, setFoodLog] = useState([])

  const [newFoodName, setNewFoodName] = useState("")
  const [newFoodCalories, setNewFoodCalories] = useState(0)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editFoodName, setEditFoodName] = useState("")
  const [editFoodCalories, setEditFoodCalories] = useState(0)

  const [activeTab, setActiveTab] = useState("daily");

  // Convert food database to standardized format
  const standardizedFoodDatabase = foodData.map(item => ({
    name: item.FoodItem,
    calories: parseInt(item.Cals_per100grams),
    category: item.FoodCategory,
    portion: item.per100grams
  }));

  // Filter foods with search term and remove any invalid entries
  const filteredFoods = searchTerm
    ? standardizedFoodDatabase
        .filter(food => 
          food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !isNaN(food.calories)
        )
        .slice(0, 20) // Limit to first 10 results
    : [];

  const addFoodToLog = (food) => {
    setFoodLog([...foodLog, {
      name: food.name,
      calories: food.calories,
      category: food.category,
      portion: food.portion
    }]);
    setConsumedCalories(consumedCalories + food.calories);
  };

  const handleManualAdd = () => {
    // First check if food exists in database
    const foundFood = standardizedFoodDatabase.find(
      food => food.name.toLowerCase() === newFoodName.toLowerCase()
    );

    if (foundFood) {
      // Use calories from database
      const newFood = {
        name: foundFood.name,
        calories: foundFood.calories,
        category: foundFood.category,
        portion: foundFood.portion
      };
      setFoodLog([...foodLog, newFood]);
      setConsumedCalories(consumedCalories + foundFood.calories);
    } else if (newFoodName.trim() && newFoodCalories > 0) {
      // Use manually entered calories if food not found
      const newFood = {
        name: newFoodName,
        calories: Number(newFoodCalories),
        category: 'Custom',
        portion: '100g'
      };
      setFoodLog([...foodLog, newFood]);
      setConsumedCalories(consumedCalories + Number(newFoodCalories));
    }
    
    setNewFoodName("");
    setNewFoodCalories(0);
  };

  const startEditing = (index) => {
    setEditingIndex(index)
    setEditFoodName(foodLog[index].name)
    setEditFoodCalories(foodLog[index].calories)
  }

  const saveEdit = (index) => {
    const updatedLog = [...foodLog]
    const oldCalories = updatedLog[index].calories
    updatedLog[index] = { name: editFoodName, calories: editFoodCalories }
    setFoodLog(updatedLog)
    setConsumedCalories(consumedCalories - oldCalories + editFoodCalories)
    setEditingIndex(null)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
  }

  // Calorie recommendations by age, weight, and gender
  const maleCalorieTable = [
    { ageRange: "19-30", weightRange: "60-75kg", calories: 2400 },
    { ageRange: "19-30", weightRange: "76-90kg", calories: 2800 },
    { ageRange: "19-30", weightRange: "91kg+", calories: 3200 },
    { ageRange: "31-50", weightRange: "60-75kg", calories: 2200 },
    { ageRange: "31-50", weightRange: "76-90kg", calories: 2600 },
    { ageRange: "31-50", weightRange: "91kg+", calories: 3000 },
    { ageRange: "51+", weightRange: "60-75kg", calories: 2000 },
    { ageRange: "51+", weightRange: "76-90kg", calories: 2400 },
    { ageRange: "51+", weightRange: "91kg+", calories: 2800 },
  ]

  const femaleCalorieTable = [
    { ageRange: "19-30", weightRange: "50-65kg", calories: 1800 },
    { ageRange: "19-30", weightRange: "66-80kg", calories: 2200 },
    { ageRange: "19-30", weightRange: "81kg+", calories: 2600 },
    { ageRange: "31-50", weightRange: "50-65kg", calories: 1600 },
    { ageRange: "31-50", weightRange: "66-80kg", calories: 2000 },
    { ageRange: "31-50", weightRange: "81kg+", calories: 2400 },
    { ageRange: "51+", weightRange: "50-65kg", calories: 1400 },
    { ageRange: "51+", weightRange: "66-80kg", calories: 1800 },
    { ageRange: "51+", weightRange: "81kg+", calories: 2200 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calorie Tracker</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your daily nutrition and calories</p>
        </div>
        <button 
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          onClick={() => {/* Add food handler */}}
        >
          <Plus className="h-5 w-5" />
          Add Food
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 relative capitalize ${
                activeTab === tab
                  ? "text-emerald-500"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "daily" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Today's Progress</h2>
              <div className="space-y-4">
                {/* Calories Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Calories</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">1,200/2,000</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>

                {/* Other Nutrients */}
                {["Protein", "Carbs", "Fat"].map((nutrient, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{nutrient}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">50/100g</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: '50%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Food Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Add Food</h2>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search food..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <button className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Food
                </button>

                {/* Recent Foods */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent</h3>
                  <div className="space-y-2">
                    {filteredFoods.length > 0 ? (
                      <ul className="space-y-2">
                        {filteredFoods.map((food, index) => (
                          <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <div>
                              <span className="font-medium text-gray-700 dark:text-gray-300">{food.name}</span>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {food.calories} calories per {food.portion} • {food.category}
                              </p>
                            </div>
                            <button 
                              className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-lg transition-colors"
                              onClick={() => addFoodToLog(food)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : searchTerm ? (
                      <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No foods found matching "{searchTerm}"
                      </p>
                    ) : (
                      <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                        Search for foods to see their calorie content
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add weekly and monthly content here */}
      </div>
    </div>
  )
}