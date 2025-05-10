import React from "react";
import { motion } from "framer-motion";
import { ChefHat, Search, Heart, Clock, Users } from "lucide-react";

const MainPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 md:px-12 bg-gradient-to-br from-emerald-50 to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Your Personal AI Recipe Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Discover recipes, get personalized recommendations, and cook with confidence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-emerald-500 text-emerald-500 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-8 w-8 text-emerald-500" />,
                title: "Smart Recipe Search",
                description: "Find recipes based on ingredients, dietary preferences, and more"
              },
              {
                icon: <Heart className="h-8 w-8 text-emerald-500" />,
                title: "Personalized Recommendations",
                description: "Get recipe suggestions tailored to your taste and preferences"
              },
              {
                icon: <Clock className="h-8 w-8 text-emerald-500" />,
                title: "Time-Saving Tools",
                description: "Plan meals, generate shopping lists, and track nutrition effortlessly"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-emerald-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Start Cooking?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of home chefs who are already using RecipAI to enhance their cooking experience
          </p>
          <button className="px-8 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
