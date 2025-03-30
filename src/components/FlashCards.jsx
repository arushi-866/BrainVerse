import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Loader, ChevronLeft, ChevronRight, Plus, Edit, Trash, Save } from "lucide-react";

function FlashCards() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Generate flash cards from input text using Gemini API
  const generateFlashCards = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text first");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:3001/generate-flashcards", { 
        text: inputText 
      });
      
      setCards(response.data.cards);
      setCurrentIndex(0);
      setFlipped(false);
    } catch (error) {
      console.error("Error generating flash cards:", error);
      alert("Failed to generate flash cards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to previous card
  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : cards.length - 1));
    }, 200);
  };

  // Navigate to next card
  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex < cards.length - 1 ? prevIndex + 1 : 0));
    }, 200);
  };

  // Toggle card flip
  const flipCard = () => {
    setFlipped(!flipped);
  };

  // Handle creating a new card
  const handleCreateCard = () => {
    if (!newCard.question.trim() || !newCard.answer.trim()) {
      alert("Both question and answer are required");
      return;
    }
    
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setNewCard({ question: "", answer: "" });
    setIsCreating(false);
    
    // If this is the first card, set it as current
    if (updatedCards.length === 1) {
      setCurrentIndex(0);
    }
  };

  // Handle editing the current card
  const handleEditCard = () => {
    if (!cards[currentIndex]) return;
    
    setIsEditing(true);
    setNewCard({
      question: cards[currentIndex].question,
      answer: cards[currentIndex].answer
    });
  };

  // Save edited card
  const handleSaveEdit = () => {
    if (!newCard.question.trim() || !newCard.answer.trim()) {
      alert("Both question and answer are required");
      return;
    }
    
    const updatedCards = [...cards];
    updatedCards[currentIndex] = newCard;
    setCards(updatedCards);
    setNewCard({ question: "", answer: "" });
    setIsEditing(false);
    setFlipped(false);
  };

  // Delete current card
  const handleDeleteCard = () => {
    if (cards.length <= 1) {
      setCards([]);
      setCurrentIndex(0);
      return;
    }
    
    const updatedCards = cards.filter((_, index) => index !== currentIndex);
    setCards(updatedCards);
    
    // Adjust current index if needed
    if (currentIndex >= updatedCards.length) {
      setCurrentIndex(updatedCards.length - 1);
    }
    
    setFlipped(false);
  };

  // Card variants for animation
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <div className="container mx-auto p-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-indigo-400 mb-2"
        >
          Neural Flash Cards
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-400 mb-6"
        >
          Generate interactive flash cards from your text or create custom cards
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel: Input Controls */}
          <div className="md:col-span-1 space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700"
            >
              <h2 className="text-xl font-semibold mb-3 text-indigo-300">Generate Cards</h2>
              
              {/* Text Input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Enter Text</label>
                <textarea
                  placeholder="Enter text to generate flash cards..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={generateFlashCards} 
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg mt-2 transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    "Generate Flash Cards"
                  )}
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-indigo-300">Create Card</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCreating(!isCreating)}
                  className="p-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus size={18} />
                </motion.button>
              </div>
              
              <AnimatePresence>
                {isCreating && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Question</label>
                        <input
                          type="text"
                          placeholder="Enter question"
                          value={newCard.question}
                          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Answer</label>
                        <textarea
                          placeholder="Enter answer"
                          value={newCard.answer}
                          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                          className="w-full h-20 bg-slate-900 border border-slate-700 rounded-lg p-2 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleCreateCard}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                          Add Card
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setIsCreating(false);
                            setNewCard({ question: "", answer: "" });
                          }}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mt-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Edit Question</label>
                        <input
                          type="text"
                          placeholder="Enter question"
                          value={newCard.question}
                          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Edit Answer</label>
                        <textarea
                          placeholder="Enter answer"
                          value={newCard.answer}
                          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                          className="w-full h-20 bg-slate-900 border border-slate-700 rounded-lg p-2 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        ></textarea>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleSaveEdit}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                          <Save size={16} className="inline mr-1" />
                          Save
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setIsEditing(false);
                            setNewCard({ question: "", answer: "" });
                          }}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">Instructions</h2>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Click card to flip between question & answer</li>
                <li>• Use arrow buttons to navigate between cards</li>
                <li>• Create custom cards with the + button</li>
                <li>• Edit or delete cards with the toolbar</li>
              </ul>
            </motion.div>
          </div>
          
          {/* Right Panel: Flash Cards Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="md:col-span-2 flex flex-col items-center justify-center"
          >
            {cards.length > 0 ? (
              <div className="w-full max-w-2xl">
                {/* Card counter */}
                <div className="text-center mb-4 text-indigo-300">
                  Card {currentIndex + 1} of {cards.length}
                </div>
                
                {/* Flash card */}
                <div className="relative perspective w-full h-80 mb-4">
                  <motion.div
                    className="w-full h-full cursor-pointer"
                    onClick={flipCard}
                    animate={flipped ? "back" : "front"}
                    variants={cardVariants}
                    transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of card (Question) */}
                    <div 
                      className={`absolute inset-0 backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-800 border-2 ${
                        flipped ? "invisible" : "visible"
                      } border-indigo-500 shadow-lg`}
                    >
                      <h3 className="text-lg text-gray-400 mb-4 text-center">Question:</h3>
                      <p className="text-xl text-center text-white font-medium">
                        {cards[currentIndex]?.question}
                      </p>
                      <div className="mt-6 text-sm text-indigo-300">Click to reveal answer</div>
                    </div>
                    
                    {/* Back of card (Answer) */}
                    <div 
                      className={`absolute inset-0 backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-800 border-2 ${
                        flipped ? "visible" : "invisible"
                      } border-teal-500 shadow-lg`}
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <h3 className="text-lg text-gray-400 mb-4 text-center">Answer:</h3>
                      <p className="text-xl text-center text-white font-medium">
                        {cards[currentIndex]?.answer}
                      </p>
                      <div className="mt-6 text-sm text-teal-300">Click to see question</div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Card navigation */}
                <div className="flex items-center justify-center space-x-6">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevCard}
                    className="p-2 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 hover:bg-slate-700 transition duration-200"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleEditCard}
                      disabled={cards.length === 0}
                      className={`p-2 rounded-full ${
                        cards.length === 0 
                          ? 'bg-slate-700 text-gray-500 cursor-not-allowed' 
                          : 'bg-slate-800 border border-slate-700 text-indigo-400 hover:bg-slate-700'
                      } transition duration-200`}
                    >
                      <Edit size={18} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDeleteCard}
                      disabled={cards.length === 0}
                      className={`p-2 rounded-full ${
                        cards.length === 0 
                          ? 'bg-slate-700 text-gray-500 cursor-not-allowed' 
                          : 'bg-slate-800 border border-slate-700 text-red-400 hover:bg-slate-700'
                      } transition duration-200`}
                    >
                      <Trash size={18} />
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextCard}
                    className="p-2 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 hover:bg-slate-700 transition duration-200"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-xl p-12 shadow-xl border border-slate-700 text-center w-full max-w-2xl h-96 flex flex-col items-center justify-center">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0], 
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-6xl mb-6"
                >
                  🧠
                </motion.div>
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">No Flash Cards Yet</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Enter text and generate cards, or create your own custom cards to study
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreating(true)}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Create First Card
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default FlashCards;