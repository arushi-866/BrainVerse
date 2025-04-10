import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, Send, Book, Moon, Sun } from "lucide-react";

// Initialize socket connection
const socket = io("http://localhost:4000");

// Custom Quill modules and formats
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

export default function CommunityPage() {
  // State management
  const [room, setRoom] = useState("study-room-1");
  const [rooms, setRooms] = useState([
    "study-room-1", 
    "math-discussion", 
    "programming-help", 
    "general-chat"
  ]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("User1");
  const [usernameInput, setUsernameInput] = useState("User1");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [newRoom, setNewRoom] = useState("");
  
  // References
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Socket event listeners
  useEffect(() => {
    // Join the selected room
    socket.emit("joinRoom", room);
    
    // Listen for messages and document updates
    socket.on("loadMessages", (msgs) => setMessages(msgs));
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
      setIsTyping(false);
    });
    socket.on("documentUpdated", (newContent) => setContent(newContent));
    socket.on("activeUsers", (users) => setActiveUsers(users));
    socket.on("userTyping", ({user}) => {
      if (user !== username) {
        setIsTyping(true);
        setTypingUser(user);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    // Cleanup on component unmount or room change
    return () => {
      socket.off("loadMessages");
      socket.off("receiveMessage");
      socket.off("documentUpdated");
      socket.off("activeUsers");
      socket.off("userTyping");
      socket.emit("leaveRoom", room);
    };
  }, [room, username]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Event handlers
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { room, message, user: username });
      setMessage("");
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    socket.emit("updateDocument", { room, content: newContent });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else {
      socket.emit("typing", { room, user: username });
    }
  };

  const handleRoomChange = (newRoom) => {
    setRoom(newRoom);
  };

  const handleUsernameChange = () => {
    setUsername(usernameInput);
    setIsSettingsOpen(false);
    // Update username with server
    socket.emit("updateUsername", { oldUsername: username, newUsername: usernameInput, room });
  };

  const createNewRoom = () => {
    if (newRoom.trim() && !rooms.includes(newRoom)) {
      setRooms([...rooms, newRoom]);
      setRoom(newRoom);
      setNewRoom("");
    }
  };

  // Theme class based on dark mode state
  const themeClass = darkMode 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gray-100 text-gray-900";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${themeClass}`}
    >
      <div className="container mx-auto p-4">
        {/* Header */}
        <motion.div 
          initial={{ y: -50 }} 
          animate={{ y: 0 }} 
          transition={{ type: "spring", stiffness: 100 }}
          className={`flex justify-between items-center py-4 border-b ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}
        >
          <div className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 5 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              BrainVerse Community
            </motion.div>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-blue-900 text-yellow-400' : 'bg-blue-100 text-blue-800'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`px-3 py-1 rounded ${darkMode ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              Settings
            </motion.button>
          </div>
        </motion.div>

        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-16 right-4 p-4 rounded-lg shadow-lg z-50 ${darkMode ? 'bg-gray-800 border border-blue-700' : 'bg-white border border-blue-200'}`}
            >
              <h3 className="font-semibold mb-2">User Settings</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className={`border p-1 rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="Enter username"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUsernameChange}
                  className={`px-3 py-1 rounded ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                  Save
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
          {/* Sidebar with Rooms and Users */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-4`}
          >
            {/* Rooms Section */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <MessageSquare size={16} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <h3 className="font-semibold ml-2">Chat Rooms</h3>
              </div>
              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-2`}>
                {rooms.map((r) => (
                  <motion.div
                    key={r}
                    whileHover={{ x: 4 }}
                    className={`cursor-pointer p-2 mb-1 rounded-md ${room === r ? 
                      (darkMode ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800') : 
                      (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200')}`}
                    onClick={() => handleRoomChange(r)}
                  >
                    # {r}
                  </motion.div>
                ))}
                <div className="flex mt-2">
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className={`flex-1 text-sm border rounded-l px-2 py-1 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    placeholder="New room name..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={createNewRoom}
                    className={`rounded-r px-2 py-1 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                  >
                    Create
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div>
              <div className="flex items-center mb-2">
                <Users size={16} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <h3 className="font-semibold ml-2">Active Users</h3>
              </div>
              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-2`}>
                {activeUsers.length > 0 ? (
                  activeUsers.map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-1"
                    >
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-500'} mr-2`}></div>
                      <span className={`${user === username ? 'font-semibold' : ''}`}>{user}</span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No active users</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chat Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-4 flex flex-col`}
            >
              <div className="flex items-center mb-3">
                <h3 className="font-semibold text-lg">#{room}</h3>
              </div>
              
              {/* Messages */}
              <div 
                ref={chatContainerRef}
                className={`flex-1 overflow-y-auto mb-3 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-3 shadow-inner h-96`}
              >
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-3 ${msg.user === username ? 'ml-auto' : ''}`}
                    >
                      <div 
                        className={`max-w-xs lg:max-w-md rounded-lg px-3 py-2 text-sm ${
                          msg.user === username 
                            ? `${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'} rounded-br-none` 
                            : `${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'} rounded-bl-none`
                        }`}
                      >
                        <div className={`font-medium mb-1 ${msg.user === username ? 'text-blue-200' : darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                          {msg.user}
                        </div>
                        <div>{msg.message}</div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} ml-2 italic`}
                    >
                      {typingUser} is typing...
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </AnimatePresence>
              </div>
              
              {/* Message Input */}
              <div className={`mt-auto ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                <div className="flex">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={`flex-1 border rounded-l px-3 py-2 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300'
                    }`}
                    placeholder="Type a message..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    className={`flex items-center justify-center rounded-r px-4 ${
                      darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Collaborative Document */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-4 flex flex-col`}
            >
              <div className="flex items-center mb-3">
                <Book size={16} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                <h3 className="font-semibold ml-2 text-lg">Collaborative Notes</h3>
              </div>
              
              <div className="flex-1 editor-container">
                {/* Custom styling for ReactQuill in dark mode */}
                <style jsx global>{`
                  .ql-toolbar.ql-snow {
                    background: ${darkMode ? '#2d3748' : '#f7fafc'};
                    border-color: ${darkMode ? '#4a5568' : '#e2e8f0'} !important;
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                  }
                  .ql-container.ql-snow {
                    border-color: ${darkMode ? '#4a5568' : '#e2e8f0'} !important;
                    background: ${darkMode ? '#1a202c' : '#ffffff'};
                    color: ${darkMode ? '#e2e8f0' : '#2d3748'};
                    height: 24rem;
                    border-bottom-left-radius: 0.375rem;
                    border-bottom-right-radius: 0.375rem;
                  }
                  .ql-editor {
                    font-size: 1rem;
                  }
                  .ql-editor.ql-blank::before {
                    color: ${darkMode ? '#718096' : '#a0aec0'};
                  }
                  .ql-editor strong {
                    color: ${darkMode ? '#90cdf4' : '#2b6cb0'};
                  }
                  .ql-editor h1, .ql-editor h2, .ql-editor h3 {
                    color: ${darkMode ? '#90cdf4' : '#2b6cb0'};
                  }
                  .ql-snow .ql-stroke {
                    stroke: ${darkMode ? '#cbd5e0' : '#4a5568'};
                  }
                  .ql-snow .ql-fill {
                    fill: ${darkMode ? '#cbd5e0' : '#4a5568'};
                  }
                  .ql-snow .ql-picker {
                    color: ${darkMode ? '#cbd5e0' : '#4a5568'};
                  }
                  .ql-snow .ql-picker-options {
                    background-color: ${darkMode ? '#2d3748' : '#ffffff'};
                    border-color: ${darkMode ? '#4a5568' : '#e2e8f0'} !important;
                  }
                  .ql-snow .ql-tooltip {
                    background-color: ${darkMode ? '#2d3748' : '#ffffff'};
                    border-color: ${darkMode ? '#4a5568' : '#e2e8f0'};
                    color: ${darkMode ? '#e2e8f0' : '#2d3748'};
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  }
                  .ql-snow .ql-tooltip input[type=text] {
                    background-color: ${darkMode ? '#1a202c' : '#ffffff'};
                    border-color: ${darkMode ? '#4a5568' : '#e2e8f0'};
                    color: ${darkMode ? '#e2e8f0' : '#2d3748'};
                  }
                  .ql-snow .ql-tooltip a.ql-action::after {
                    border-right: 1px solid ${darkMode ? '#4a5568' : '#e2e8f0'};
                  }
                `}</style>
                <ReactQuill 
                  value={content} 
                  onChange={handleContentChange} 
                  modules={quillModules}
                  placeholder="Start typing your collaborative notes here..."
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-6 py-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          BrainVerse Community • Made with 💙 for collaborative learning
        </motion.div>
      </div>
    </motion.div>
  );
}