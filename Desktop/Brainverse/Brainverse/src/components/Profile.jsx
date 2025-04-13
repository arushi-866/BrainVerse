import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Avatar } from "./ui/Avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { Progress } from "./ui/Progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Brain,
  CheckCircle,
  PenTool,
  Clock,
  Heart,
  MessageSquare,
  BookmarkPlus,
  Activity,
  Mail,
  Layers
} from "lucide-react";
import { useNavigate } from "react-router-dom";


// Define API base URL - make sure this matches your backend server
const API_BASE_URL = "http://localhost:3001/api";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("summaries");
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStats, setActiveStats] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [openFlashcardId, setOpenFlashcardId] = useState(null);


  // Default user data structure
  const defaultUserData = {
    name: "",
    email: "",
    title: "AI Study Enthusiast",
    stats: {
      summaries: 0,
      mindMaps: 0,
      quizzes: 0,
      flashcards: 0
    },
    summaries: [],
    mindMaps: [],
    quizzes: [],
    flashcards: []
  };

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    title: "AI Study Enthusiast"
  });

  const [user, setUser] = useState(defaultUserData);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        const token = getAuthToken();
        if (!token) {
          throw new Error("No authentication token found. Please login again.");
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        console.log("Received user data:", userData);

        // Transform the backend data to match frontend expectations
        const transformedData = {
          fullName: userData.fullName || "",
          email: userData.email || "",
          title: userData.title || "AI Study Enthusiast",
          stats: {
            summaries: userData.stats?.summaries || 0,
            mindMaps: userData.stats?.mindMaps || 0,
            quizzes: userData.stats?.quizzes || 0,
            flashcards: userData.stats?.flashcards || 0
          },

          summaries: userData.summaries || [],
          mindMaps: userData.mindMaps || [],
          quizzes: userData.quizzes || [],
          flashcards: userData.flashcards || []
        };

        setUser(transformedData);
        setProfileData({
          name: transformedData.fullName,
          email: transformedData.email,
          title: transformedData.title
        });

        startLoadingAnimation();
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
        startLoadingAnimation(); // Still show UI with error message

        // If token is invalid, redirect to login
        if (err.message.includes("authentication") || err.message.includes("401")) {
          setTimeout(() => navigate('/login'), 3000);
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Start loading animation
  const startLoadingAnimation = () => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setLoading(false);
    }, 1200);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    const statsTimer = setTimeout(() => {
      setActiveStats(true);
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      clearTimeout(statsTimer);
    };
  };

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  const handleLikeClick = (id) => {
    setLikeAnimation(id);
    setTimeout(() => setLikeAnimation(false), 1000);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: profileData.name,
          title: profileData.title
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();

      // Update local state with the returned data
      setUser({
        ...user,
        fullName: updatedUser.fullName || profileData.name,
        email: updatedUser.email || profileData.email,
        title: updatedUser.title || profileData.title
      });

      setProfileData({
        name: updatedUser.fullName || profileData.name,
        email: updatedUser.email || profileData.email,
        title: updatedUser.title || profileData.title
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Merge user data from backend with default structure
  const userData = user ? {
    ...defaultUserData,
    name: user.fullName || user.name || "",
    email: user.email || "",
    title: user.title || "AI Study Enthusiast",
    stats: user.stats || defaultUserData.stats,
    summaries: user.summaries || [],
    mindMaps: user.mindMaps || [],
    quizzes: user.quizzes || [],
    flashcards: user.flashcards || []
  } : defaultUserData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const handleReadClick = (id) => {
    setOpenFlashcardId((prev) => (prev === id ? null : id));
  };


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  if (!isLoaded) {
    return (
      <div className="max-w-8xl w-full mx-auto pt-20 flex flex-col items-center justify-center min-h-screen bg-[#0a1929]">
        <div className="relative mb-8 pt-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-8 rounded-full opacity-30 bg-gradient-to-r from-blue-600 to-purple-600 blur-xl"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white">Loading Profile</h2>
        <div className="w-full max-w-md relative">
          <Progress value={progress} className="h-2 bg-[#1a2e4c]" />
          <motion.div
            className="h-2 absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${progress / 3}%` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <p className="mt-4 text-blue-300">{progress}% Complete</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="max-w-8xl mx-auto p-6 flex flex-col items-center justify-center min-h-screen bg-[#0a1929]">
        <Card className="p-8 rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f2942] to-[#162a4a] border-[#1e3a5f] text-center">
          <Activity className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Error</h2>
          <p className="text-blue-300 mb-6">{error}</p>
          <Button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-8xl mx-auto p-6 pb-24 bg-[#0a1929] text-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Section */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f2942] to-[#162a4a] border-[#1e3a5f] relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-10 -ml-16 -mb-16"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
              <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-700 ring-2 ring-blue-400 shadow-lg relative z-10" />
            </motion.div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      className="bg-[#152a47] border border-blue-500/30 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={profileData.title}
                      onChange={handleInputChange}
                      className="bg-[#152a47] border border-blue-500/30 rounded-lg px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-blue-500/30 text-blue-300 hover:bg-blue-600/20"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">
                      {userData.name || "User"}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-blue-300 mt-1">
                    <Mail className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <p className="text-blue-400 mt-1">{userData.title}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      onClick={handleEditProfile}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                    >
                      <PenTool className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-600/20 hover:text-red-100"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
        variants={itemVariants}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 0 }}
          whileHover={{ y: -5 }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center"
        >
          <BookOpen className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-2xl font-bold text-white">
            {userData.stats.summaries}
          </span>
          <span className="text-blue-300 text-sm">Summaries</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center"
        >
          <Brain className="w-8 h-8 text-purple-400 mb-2" />
          <span className="text-2xl font-bold text-white">
            {userData.stats.mindMaps}
          </span>
          <span className="text-blue-300 text-sm">Mind Maps</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
          <span className="text-2xl font-bold text-white">
            {userData.stats.quizzes}
          </span>
          <span className="text-blue-300 text-sm">Quizzes</span>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center"
        >
          <Layers className="w-8 h-8 text-amber-400 mb-2" />
          <span className="text-2xl font-bold text-white">
            {userData.stats.flashcards}
          </span>
          <span className="text-blue-300 text-sm">Flashcards</span>
        </motion.div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div variants={itemVariants} className="mt-8">
        <Tabs
          defaultValue="summaries"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="flex space-x-2 p-1 bg-[#152a47]/50 rounded-xl border border-blue-500/20 flex-wrap">
            <TabsTrigger
              value="summaries"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${selectedTab === "summaries"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                : "text-blue-300 hover:bg-blue-800/20"
                }`}
            >
              <BookOpen className="w-4 h-4" />
              Summaries
            </TabsTrigger>
            <TabsTrigger
              value="mindmaps"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${selectedTab === "mindmaps"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                : "text-blue-300 hover:bg-blue-800/20"
                }`}
            >
              <Brain className="w-4 h-4" />
              Mind Maps
            </TabsTrigger>
            <TabsTrigger
              value="quizzes"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${selectedTab === "quizzes"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                : "text-blue-300 hover:bg-blue-800/20"
                }`}
            >
              <CheckCircle className="w-4 h-4" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger
              value="flashcards"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${selectedTab === "flashcards"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                : "text-blue-300 hover:bg-blue-800/20"
                }`}
            >
              <Layers className="w-4 h-4" />
              Flashcards
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="summaries">
              <motion.div
                key="summaries"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6 space-y-4"
              >
                {userData.summaries && userData.summaries.length > 0 ? (
                  userData.summaries.map((summary) => (
                    <motion.div
                      key={summary.id}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoverCard(summary.id)}
                      onHoverEnd={() => setHoverCard(null)}
                      className="bg-[#152a47] rounded-xl border border-blue-500/20 overflow-hidden"
                    >
                      <div className="p-5 relative">
                        {hoverCard === summary.id && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}

                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <h3 className="font-semibold text-lg text-white">
                              {summary.title}
                            </h3>
                            <div className="flex items-center text-sm text-blue-300 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{summary.date}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30"
                          >
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-500/20 relative z-10">
                          <div className="flex space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-blue-300 hover:text-red-400"
                              onClick={() => handleLikeClick(summary.id)}
                            >
                              <motion.div
                                animate={
                                  likeAnimation === summary.id
                                    ? {
                                      scale: [1, 1.5, 1],
                                    }
                                    : {}
                                }
                              >
                                <Heart
                                  className={`w-4 h-4 mr-1 ${likeAnimation === summary.id
                                    ? "fill-red-400 text-red-400"
                                    : ""
                                    }`}
                                />
                              </motion.div>
                              {summary.likes || 0}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-blue-300 hover:text-blue-100"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {summary.comments || 0}
                            </Button>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100"
                          >
                            Read
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <BookOpen className="w-12 h-12 text-blue-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No summaries yet
                    </h3>
                    <p className="text-blue-300 mb-4">
                      Create your first summary to see it here
                    </p>
                    <Button
                      onClick={() => navigate('/summarization')}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      Create Summary
                    </Button>
                  </Card>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="mindmaps">
              <motion.div
                key="mindmaps"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6 space-y-4"
              >
                {userData.mindMaps && userData.mindMaps.length > 0 ? (
                  userData.mindMaps.map((mindMap) => (
                    <motion.div
                      key={mindMap.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#152a47] rounded-xl border border-blue-500/20 overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-white">
                              {mindMap.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-blue-300 mt-1">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{mindMap.date}</span>
                              </span>
                              <span className="flex items-center">
                                <Brain className="w-3 h-3 mr-1" />
                                <span>{mindMap.nodes} nodes</span>
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30"
                          >
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-blue-500/20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100"
                          >
                            Explore
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <Brain className="w-12 h-12 text-purple-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No mind maps yet
                    </h3>
                    <p className="text-blue-300 mb-4">
                      Create your first mind map to visualize connections
                    </p>
                    <Button
                      onClick={() => navigate('/mindmap')}
                      className="bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800"
                    >
                      Create Mind Map
                    </Button>
                  </Card>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="quizzes">
              <motion.div
                key="quizzes"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6 space-y-4"
              >
                {userData.quizzes && userData.quizzes.length > 0 ? (
                  userData.quizzes.map((quiz) => (
                    <motion.div
                      key={quiz.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#152a47] rounded-xl border border-blue-500/20 overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-white">
                              {quiz.title}
                            </h3>
                            <div className="flex items-center text-sm text-blue-300 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{quiz.date}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30"
                          >
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-blue-300">
                              Score
                            </span>
                            <span className="text-sm font-bold text-green-400">
                              {quiz.score} / {quiz.totalQuestions}
                            </span>
                          </div>
                          <div className="relative h-2 bg-[#0f2039] rounded-full overflow-hidden">
                            <motion.div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(quiz.score / quiz.totalQuestions) * 100}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-blue-500/20">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100"
                          >
                            Retake
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <CheckCircle className="w-12 h-12 text-green-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No quizzes yet
                    </h3>
                    <p className="text-blue-300 mb-4">
                      Test your knowledge by taking your first quiz
                    </p>
                    <Button
                      onClick={() => navigate('/quiz')}
                      className="bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800">
                      Take a Quiz
                    </Button>
                  </Card>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="flashcards">
              <motion.div
                key="summaries"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-6 space-y-4"
              >
                {userData.flashcards && userData.flashcards.length > 0 ? (
                  userData.flashcards.map((flashcard) => (
                    <motion.div
                      key={flashcard.id}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoverCard(flashcard.id)}
                      onHoverEnd={() => setHoverCard(null)}
                     className="bg-gradient-to-br from-[#1e2a44] to-[#152a47] rounded-2xl border border-blue-500/10 shadow-md transition-all duration-300 hover:shadow-blue-500/20"
                    >
                      <div className="p-5 relative">
                        {hoverCard === flashcard.id && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}

                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <h3 className="font-semibold text-lg text-white">
                              {flashcard.title}
                            </h3>
                            <div className="flex items-center text-sm text-blue-300 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{flashcard.date}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30"
                          >
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-500/20 relative z-10">
                          <div className="flex space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-blue-300 hover:text-red-400"
                              onClick={() => handleLikeClick(flashcard.id)}
                            >
                              <motion.div
                                animate={
                                  likeAnimation === flashcard.id
                                    ? {
                                      scale: [1, 1.5, 1],
                                    }
                                    : {}
                                }
                              >
                                <Heart
                                  className={`w-4 h-4 mr-1 ${likeAnimation === flashcard.id
                                    ? "fill-red-400 text-red-400"
                                    : ""
                                    }`}
                                />
                              </motion.div>
                              {flashcard.likes || 0}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-blue-300 hover:text-blue-100"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {flashcard.comments || 0}
                            </Button>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100"
                            onClick={() => handleReadClick(flashcard.id)}
                          >
                            {openFlashcardId === flashcard.id ? "Hide" : "Read"}
                          </Button>
                        </div>
                        <AnimatePresence initial={false}>
                          {openFlashcardId === flashcard.id && (
                            <motion.div
                              key="answer"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 text-sm text-white overflow-hidden "
                            >
                              <p>{flashcard.content || "No answer provided."}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>


                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <Layers className="w-12 h-12 text-yellow-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      No Flashcards yet
                    </h3>
                    <p className="text-blue-300 mb-4">
                      Create your first flashcard to see it here
                    </p>
                    <Button
                      onClick={() => navigate('/flashcards')}
                      className="bg-gradient-to-r from-orange-600 to-yellow-400 hover:from-blue-700 hover:to-blue-800">
                      Generate Flashcard
                    </Button>
                  </Card>
                )}
              </motion.div>
            </TabsContent>

          </AnimatePresence>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
