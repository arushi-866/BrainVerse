import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiBook, FiUser, FiLoader, FiX } from "react-icons/fi";
// import "./ChatAssistant.css"

const ChatAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus();
      const timer = setTimeout(() => {
        setShowIntro(false);
        setMessages([{
          sender: "StudyBuddy", 
          text: "Hello! I'm your StudyBuddy AI assistant. How can I help with your studies today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { sender: "You", text: input, timestamp };
    
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:5000/chat", { message: input });
      
      setTimeout(() => {
        const botMessage = { 
          sender: "StudyBuddy", 
          text: data.reply || "I'm processing your request...", 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setLoading(false);
      }, Math.random() * 1000 + 500);
      
    } catch (error) {
      setTimeout(() => {
        const errorMessage = { 
          sender: "StudyBuddy", 
          text: "Sorry, I'm having trouble connecting right now. Please try again.", 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
        setLoading(false);
      }, 800);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isChatOpen ? (
          <FiX className="text-white w-6 h-6" />
        ) : (
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="absolute bottom-24 right-0 w-80 h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-lg">
                  <FiBook className="w-6 h-6 text-blue-600" />
                </div>
                <h1 className="text-white font-bold text-lg">StudyBuddy</h1>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <AnimatePresence>
                {showIntro ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FiBook className="w-12 h-12 text-white" />
                    </motion.div>
                    <motion.h2
                      className="text-2xl font-bold text-gray-800"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                    >
                      StudyBuddy
                    </motion.h2>
                    <motion.div
                      className="flex space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" />
                      <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-100" />
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-200" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} mb-4`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            msg.sender === "You"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium">
                              {msg.sender}
                            </span>
                            <span className="text-xs opacity-75">
                              {msg.timestamp}
                            </span>
                          </div>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      </motion.div>
                    ))}
                    {loading && (
                      <motion.div
                        className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg max-w-[80%]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t p-4 bg-white">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask StudyBuddy anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading || showIntro}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={loading || !input.trim() || showIntro}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    <FiSend className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;