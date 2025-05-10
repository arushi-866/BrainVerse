import React, { useState, useRef, useEffect } from "react";
import { X, Sparkles, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content: "Hello! I'm Chef Buddy. How can I assist you today?",
      options: [
        { text: "How do I use the calorie tracker?", path: "/dashboard/nutrition" },
        { text: "How can I plan my groceries?", path: "/dashboard/leftovers" },
        { text: "How do I manage my saved recipes?", path: "/dashboard/recipes/favorites" },
        { text: "Where can I find trending recipes?", path: "/dashboard/trending" },
        { text: "How do I join the community?", path: "/dashboard/community" },
        { text: "How can I update my profile?", path: "/dashboard/profile" },
        { text: "How do I log out or change my password?", path: "/dashboard/logout" },
      ],
    },
  ]);

  const chatRef = useRef(null); // Reference for auto-scroll
  const navigate = useNavigate();

  // Responses for each question
  const responses = {
    "How do I use the calorie tracker?": {
      text: "Our Calorie Tracker helps you log meals and track daily intake. Access it here.",
      path: "/dashboard/nutrition"
    },
    "How can I plan my groceries?": {
      text: "You can add ingredients to your grocery planner and get a structured shopping list. Visit it here.",
      path: "/dashboard/leftovers"
    },
    "How do I manage my saved recipes?": {
      text: "Save, organize, and edit your favorite recipes in the Recipe Manager. Check it out here.",
      path: "/dashboard/recipes/favorites"
    },
    "Where can I find trending recipes?": {
      text: "Explore the most popular and trending recipes of the week here.",
      path: "/dashboard/trending"
    },
    "How do I join the community?": {
      text: "Join our community to share recipes and connect with other food lovers! Visit here.",
      path: "/dashboard/community"
    },
    "How can I update my profile?": {
      text: "Manage your profile details here.",
      path: "/dashboard/profile"
    },
    "How do I log out or change my password?": {
      text: "You can log out or update your password from the profile settings here.",
      path: "/dashboard/logout"
    },
  };

  // Handle user selection
  const handleSelection = (option) => {
    const response = responses[option.text];
    
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: option.text },
      { 
        type: "assistant", 
        content: response.text,
        path: response.path,
        options: [] 
      },
    ]);

    // Navigate to the corresponding page
    navigate(option.path);
    
    // Close the chat assistant after navigation
    setIsOpen(false);

    // Scroll to bottom after adding new messages
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <ChefHat className="h-8 w-8" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-96 h-[500px] flex flex-col border-4 border-purple-500/30">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-xl flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Sparkles className="h-6 w-6 text-yellow-300 mr-2" /> Chef Buddy
            </h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6 text-white hover:text-gray-200" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 shadow-md ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {msg.content}
                  {/* Render options if available */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelection(option)}
                          className="block w-full text-left p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Add navigation link if path exists */}
                  {msg.path && (
                    <button
                      onClick={() => {
                        navigate(msg.path);
                        setIsOpen(false);
                      }}
                      className="mt-2 text-sm text-purple-500 dark:text-purple-400 hover:underline"
                    >
                      Click here to navigate →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
