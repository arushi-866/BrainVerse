import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Loader, ChevronLeft, ChevronRight, Plus, Check, X, ArrowRight } from "lucide-react";

function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState("");

  // Generate quiz from input text
  const generateQuiz = async () => {
    if (!inputText.trim()) {
      alert("Please enter some text first");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:3001/generate-quiz", { 
        text: inputText 
      });
      
      setQuizData(response.data.questions);
      setCurrentQuestion(0);
      setScore(0);
      setQuizCompleted(false);
      setSelectedOption(null);
      setShowFeedback(false);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option, correctAnswer, questionExplanation) => {
    if (selectedOption) return; // Prevent changing answer after selection
    
    setSelectedOption(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);
    setExplanation(questionExplanation);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setShowFeedback(false);
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
          Neural Quiz Generator
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-400 mb-6"
        >
          Generate interactive quizzes from your text and test your knowledge
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
              <h2 className="text-xl font-semibold mb-3 text-indigo-300">Generate Quiz</h2>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Enter Text</label>
                <textarea
                  placeholder="Enter text to generate quiz questions..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={generateQuiz} 
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg mt-2 transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />
                      Generating...
                    </>
                  ) : (
                    "Generate Quiz"
                  )}
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-indigo-300">Instructions</h2>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Select an answer to see feedback</li>
                <li>• Click "Next" to proceed to the next question</li>
                <li>• Read explanations to understand the concepts</li>
                <li>• View your score at the end of the quiz</li>
              </ul>
            </motion.div>
          </div>
          
          {/* Right Panel: Quiz Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="md:col-span-2 flex flex-col items-center justify-center"
          >
            {quizData.length > 0 ? (
              quizCompleted ? (
                <div className="bg-slate-800 rounded-xl p-12 shadow-xl border border-slate-700 text-center w-full max-w-2xl h-96 flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.9]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-6xl mb-6"
                  >
                    {score === quizData.length ? "🎉" : score > quizData.length/2 ? "👍" : "🧠"}
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-indigo-300 mb-3">Quiz Completed!</h3>
                  <p className="text-xl text-white mb-2">
                    Your score: <span className="font-bold">{score}</span> out of <span className="font-bold">{quizData.length}</span>
                  </p>
                  <p className="text-gray-400 mb-6">
                    {score === quizData.length 
                      ? "Perfect! You aced it!" 
                      : score > quizData.length/2 
                        ? "Good job! Keep learning!" 
                        : "Keep practicing to improve!"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartQuiz}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                  >
                    Restart Quiz
                  </motion.button>
                </div>
              ) : (
                <div className="w-full max-w-2xl">
                  {/* Question counter */}
                  <div className="text-center mb-4 text-indigo-300">
                    Question {currentQuestion + 1} of {quizData.length}
                  </div>
                  
                  {/* Question card */}
                  <div className="relative w-full min-h-64 mb-4">
                    <div className="bg-slate-800 rounded-2xl p-8 border-2 border-indigo-500 shadow-lg">
                      <h3 className="text-lg text-gray-400 mb-6 text-center">Question:</h3>
                      <p className="text-xl text-center text-white font-medium mb-8">
                        {quizData[currentQuestion]?.question}
                      </p>
                      
                      {/* Options */}
                      <div className="space-y-3 mb-6">
                        {quizData[currentQuestion]?.options.map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                            whileTap={{ scale: selectedOption ? 1 : 0.98 }}
                            onClick={() => handleOptionSelect(
                              option, 
                              quizData[currentQuestion].correctAnswer,
                              quizData[currentQuestion].explanation
                            )}
                            disabled={selectedOption !== null}
                            className={`w-full text-left p-4 rounded-lg transition duration-200 ${
                              selectedOption === null
                                ? 'bg-slate-700 hover:bg-slate-600'
                                : option === quizData[currentQuestion].correctAnswer
                                  ? 'bg-green-600'
                                  : selectedOption === option
                                    ? 'bg-red-600'
                                    : 'bg-slate-700 opacity-70'
                            }`}
                          >
                            <div className="flex items-center">
                              {selectedOption !== null && (
                                <span className="mr-3">
                                  {option === quizData[currentQuestion].correctAnswer ? (
                                    <Check size={18} />
                                  ) : selectedOption === option ? (
                                    <X size={18} />
                                  ) : null}
                                </span>
                              )}
                              {option}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Feedback and Explanation */}
                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`mt-4 p-4 rounded-lg ${
                            isCorrect ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'
                          }`}
                        >
                          <div className={`font-medium mb-2 ${
                            isCorrect ? 'text-green-300' : 'text-red-300'
                          }`}>
                            {isCorrect ? 'Correct!' : 'Incorrect'}
                          </div>
                          <div className="text-gray-200 text-sm">
                            {explanation || "No explanation provided."}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-500 h-2.5 rounded-full" 
                        style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                      ></div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextQuestion}
                      disabled={!selectedOption}
                      className={`ml-4 px-4 py-2 rounded-lg flex items-center ${
                        selectedOption 
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                          : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Next <ArrowRight size={18} className="ml-1" />
                    </motion.button>
                  </div>
                </div>
              )
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
                  ❓
                </motion.div>
                <h3 className="text-xl font-semibold text-indigo-300 mb-3">No Quiz Yet</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Enter text to generate a quiz and test your knowledge
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;