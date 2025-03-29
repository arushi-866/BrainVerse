import React, { useState, useRef, useEffect } from "react";
import { X, Sparkles, ChefHat } from "lucide-react";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content: "Hello! I'm Chef Buddy. How can I assist you today?",
      options: [
        "How do I use the calorie tracker?",
        "How can I plan my groceries?",
        "How do I manage my saved recipes?",
        "Where can I find trending recipes?",
        "How do I join the community?",
        "How can I update my profile?",
        "How do I log out or change my password?",
      ],
    },
  ]);

  const chatRef = useRef(null); // Reference for auto-scroll

  // Responses for each question
  const responses = {
    "How do I use the calorie tracker?":
      "Our Calorie Tracker helps you log meals and track daily intake. Access it here: [Calorie Tracker Page]",
    "How can I plan my groceries?":
      "You can add ingredients to your grocery planner and get a structured shopping list. Visit it here: [Grocery Planner Page]",
    "How do I manage my saved recipes?":
      "Save, organize, and edit your favorite recipes in the Recipe Manager. Check it out here: [Recipe Manager Page]",
    "Where can I find trending recipes?":
      "Explore the most popular and trending recipes of the week here: [Trending Recipes Page]",
    "How do I join the community?":
      "Join our community to share recipes and connect with other food lovers! Visit here: [Community Page]",
    "How can I update my profile?":
      "Manage your profile details, change your password, or log out here: [Profile Page]",
    "How do I log out or change my password?":
      "You can log out or update your password from the profile settings here: [Logout/Settings Page]",
  };

  // Handle user selection
  const handleSelection = (question) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", content: question },
      { type: "assistant", content: responses[question], options: [] },
    ]);

    // Delay scrolling to ensure the new message is added before scrolling
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
                  {msg.options && (
                    <div className="mt-2 space-y-2">
                      {msg.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelection(option)}
                          className="block w-full text-left p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
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
