import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Avatar } from "./ui/Avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  Award, 
  Share2, 
  Heart, 
  MessageSquare, 
  PenTool, 
  BookmarkPlus, 
  Calendar,
  Clock,
  Star,
  TrendingUp,
  Sparkles,
  Moon,
  Activity,
  BarChart2,
  Zap
} from "lucide-react";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("summaries");
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStats, setActiveStats] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [hoverCard, setHoverCard] = useState(null);

  // Enhanced user data
  const userData = {
    name: "Arushi",
    title: "AI Study Enthusiast",
    level: "Advanced",
    memberSince: "March 2025",
    streak: 2,
    badges: ["AI Expert", "100 Days Streak", "Content Creator"],
    stats: {
      summaries: 24,
      mindMaps: 16,
      quizzes: 38,
      totalHours: 156
    },
    summaries: [
      { id: 1, title: "Advanced Neural Networks", date: "2 days ago", likes: 24, comments: 8 },
      { id: 2, title: "Transformer Architecture Explained", date: "1 week ago", likes: 45, comments: 12 },
      { id: 3, title: "The Future of LLMs", date: "2 weeks ago", likes: 67, comments: 23 }
    ],
    mindMaps: [
      { id: 1, title: "Machine Learning Algorithms", date: "3 days ago", nodes: 24 },
      { id: 2, title: "Deep Learning Concepts", date: "1 week ago", nodes: 32 }
    ],
    quizzes: [
      { id: 1, title: "AI Ethics Quiz", date: "1 day ago", score: "92%" },
      { id: 2, title: "Neural Networks Fundamentals", date: "5 days ago", score: "88%" },
      { id: 3, title: "ML Algorithms Mastery", date: "2 weeks ago", score: "95%" }
    ]
  };

  useEffect(() => {
    // Enhanced loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
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

    // Animate stats after page loads
    const statsTimer = setTimeout(() => {
      setActiveStats(true);
    }, 1600);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      clearTimeout(statsTimer);
    };
  }, []);

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  const handleLikeClick = (id) => {
    setLikeAnimation(id);
    setTimeout(() => setLikeAnimation(false), 1000);
  };

  // Enhanced animation variants
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

  // Loading screen with enhanced visual
  if (!isLoaded) {
    return (
      <div className="max-w-4xl w-{800px} mx-auto pt-20 flex flex-col items-center justify-center min-h-screen bg-[#0a1929]">
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
          <Moon className="w-16 h-20 text-blue-400 relative z-10" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-white">Loading Profile</h2>
        <div className="w-full max-w-md relative">
          <Progress value={progress} className="h-2 bg-[#1a2e4c]" />
          <motion.div 
            className="h-2 absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${progress/3}%` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <p className="mt-4 text-blue-300">{progress}% Complete</p>
      </div>
    );
  }

  return (
    <motion.div 
    className="max-w-4xl mx-auto p-6 pb-24 bg-[#0a1929] text-gray-100 min-h-screen"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    >
      {/* Hero Section with enhanced styling */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 rounded-2xl overflow-hidden bg-gradient-to-r from-[#0f2942] to-[#162a4a] border-[#1e3a5f] relative">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-10 -ml-16 -mb-16"></div>
          <motion.div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-5"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative">
            {/* Enhanced Profile Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-70"></div>
              <Avatar className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-700 ring-2 ring-blue-400 shadow-lg relative z-10" />
              <motion.span 
                className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-[#0f2942] z-20"
                animate={{ 
                  boxShadow: ['0 0 0px #4ade80', '0 0 8px #4ade80', '0 0 0px #4ade80']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Enhanced Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold">
                  <Star className="w-3 h-3 mr-1" /> {userData.level}
                </Badge>
              </div>
              <p className="text-blue-300 mb-1">{userData.title}</p>
              
              <div className="flex items-center gap-4 text-sm text-blue-200 mt-1 mb-3">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-blue-400" /> 
                  Member since {userData.memberSince}
                </span>
                <span className="flex items-center">
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <TrendingUp className="w-4 h-4 mr-1 text-blue-400" /> 
                  </motion.div>
                  <span className="font-medium text-blue-300">{userData.streak} day streak</span>
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {userData.badges.map((badge, index) => (
                  <motion.div 
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + (index * 0.15) }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge className="bg-[#1e3a5f] text-blue-200 hover:bg-[#254a79] transition-colors duration-200 border border-blue-500/30">
                      <Award className="w-3 h-3 mr-1 text-blue-400" /> {badge}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border-none shadow-lg shadow-blue-900/20 transition-all duration-200">
                  <PenTool className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
                <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-900/30 transition-colors duration-200">
                  <Share2 className="w-4 h-4 mr-2" /> Share Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {/* Enhanced Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
        variants={itemVariants}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          whileHover={{ 
            y: -5, 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(to bottom right, #152a47, #1a3158)'
          }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
          <BookOpen className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-2xl font-bold text-white">{userData.stats.summaries}</span>
          <span className="text-blue-300 text-sm">Summaries</span>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ 
            y: -5, 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(to bottom right, #152a47, #1a3158)'
          }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute -left-6 -bottom-6 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
          <Brain className="w-8 h-8 text-purple-400 mb-2" />
          <span className="text-2xl font-bold text-white">{userData.stats.mindMaps}</span>
          <span className="text-blue-300 text-sm">Mind Maps</span>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            y: -5, 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(to bottom right, #152a47, #1a3158)'
          }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
          <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
          <span className="text-2xl font-bold text-white">{userData.stats.quizzes}</span>
          <span className="text-blue-300 text-sm">Quizzes</span>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={activeStats ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ 
            y: -5, 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(to bottom right, #152a47, #1a3158)'
          }}
          className="bg-[#152a47] rounded-xl border border-blue-500/20 p-4 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute -left-6 -top-6 w-16 h-16 bg-amber-500/10 rounded-full blur-xl"></div>
          <Clock className="w-8 h-8 text-amber-400 mb-2" />
          <span className="text-2xl font-bold text-white">{userData.stats.totalHours}</span>
          <span className="text-blue-300 text-sm">Study Hours</span>
        </motion.div>
      </motion.div>
      
      {/* Enhanced Content Tabs */}
      <motion.div variants={itemVariants} className="mt-8">
        <Tabs 
          defaultValue="summaries" 
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="flex space-x-2 p-1 bg-[#152a47]/50 rounded-xl border border-blue-500/20">
            <TabsTrigger 
              value="summaries"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedTab === "summaries" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/30" 
                  : "text-blue-300 hover:bg-blue-800/20"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Summaries
            </TabsTrigger>
            <TabsTrigger 
              value="mindmaps"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedTab === "mindmaps" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/30" 
                  : "text-blue-300 hover:bg-blue-800/20"
              }`}
            >
              <Brain className="w-4 h-4" />
              Mind Maps
            </TabsTrigger>
            <TabsTrigger 
              value="quizzes"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedTab === "quizzes" 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-700/30" 
                  : "text-blue-300 hover:bg-blue-800/20"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Quizzes
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
                {userData.summaries.length > 0 ? (
                  userData.summaries.map((summary) => (
                    <motion.div
                      key={summary.id}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      onHoverStart={() => setHoverCard(summary.id)}
                      onHoverEnd={() => setHoverCard(null)}
                      className="bg-[#152a47] rounded-xl shadow-lg border border-blue-500/20 overflow-hidden transition-all duration-200"
                    >
                      <div className="p-5 relative overflow-hidden">
                        {/* Animated highlight effect on hover */}
                        {hoverCard === summary.id && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <h3 className="font-semibold text-lg text-white">{summary.title}</h3>
                            <div className="flex items-center text-sm text-blue-300 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{summary.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30">
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
                                animate={likeAnimation === summary.id ? { 
                                  scale: [1, 1.5, 1],
                                  transition: { duration: 0.5 }
                                } : {}}
                              >
                                <Heart className={`w-4 h-4 mr-1 ${likeAnimation === summary.id ? "fill-red-400 text-red-400" : ""}`} />
                              </motion.div>
                              {summary.likes}
                            </Button>
                            
                            <Button variant="ghost" size="sm" className="flex items-center text-blue-300 hover:text-blue-100">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {summary.comments}
                            </Button>
                          </div>
                          
                          <Button variant="outline" size="sm" className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100">
                            Read
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <BookOpen className="w-12 h-12 text-blue-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No summaries yet</h3>
                    <p className="text-blue-300 mb-4">Create your first summary to see it here</p>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">Create Summary</Button>
                  </Card>
                )}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="mx-auto border-blue-500/30 text-blue-300 hover:bg-blue-600/20">
                    View All Summaries
                  </Button>
                </div>
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
                {userData.mindMaps.length > 0 ? (
                  userData.mindMaps.map((mindMap) => (
                    <motion.div
                      key={mindMap.id}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      onHoverStart={() => setHoverCard(mindMap.id + "mm")}
                      onHoverEnd={() => setHoverCard(null)}
                      className="bg-[#152a47] rounded-xl shadow-lg border border-blue-500/20 overflow-hidden transition-all duration-200"
                    >
                      <div className="p-5 relative">
                        {/* Animated highlight effect on hover */}
                        {hoverCard === mindMap.id + "mm" && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <h3 className="font-semibold text-lg text-white">{mindMap.title}</h3>
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
                          <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30">
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Enhanced mind map visualization */}
                        <div className="h-36 bg-[#0f2039] rounded-lg mt-4 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTQ2N2EiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDE4YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMTggMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0xOCAwYzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wLTE4YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0wLTE4YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0zNiAxOGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMC0xOGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHptMTggMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCAxLjc5MSA0IDQgNCA0LTEuNzkxIDQtNHoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
                          
                          {/* Central node with glowing effect */}
                          <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <motion.div 
                              className="absolute inset-0 rounded-full bg-purple-400 blur-md opacity-70"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 0.4, 0.7]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            <span className="text-xs font-bold text-white">AI</span>
                          </div>
                          
                          {/* Connecting lines */}
                          <div className="absolute w-full h-full z-0">
                            {[30, 90, 150, 210, 270, 330].map((deg) => (
                              <motion.div
                                key={deg}
                                className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-blue-400/30 origin-left"
                                style={{
                                  transform: `rotate(${deg}deg)`,
                                  transformOrigin: 'left center'
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8 }}
                              />
                            ))}
                          </div>
                          
                          {/* Outer nodes */}
                          <div className="absolute w-full h-full z-0">
                            {[30, 90, 150, 210, 270, 330].map((deg, i) => {
                              const distance = 80;
                              const x = 50 + distance * Math.cos(deg * Math.PI / 180);
                              const y = 50 + distance * Math.sin(deg * Math.PI / 180);
                              return (
                                <motion.div
                                  key={deg}
                                  className="absolute w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
                                  style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: 'translate(-50%, -50%)'
                                  }}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ 
                                    delay: 0.1 * i,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 10
                                  }}
                                >
                                  <span className="text-[8px] font-bold text-white">{['NN', 'DL', 'ML', 'NLP', 'CV', 'RL'][i]}</span>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-blue-500/20 relative z-10">
                          <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="flex items-center text-blue-300 hover:text-blue-100">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                          
                          <Button variant="outline" size="sm" className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100">
                            Explore
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <Brain className="w-12 h-12 text-purple-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No mind maps yet</h3>
                    <p className="text-blue-300 mb-4">Create your first mind map to visualize connections</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-700 hover:from-purple-700 hover:to-blue-800">
                      Create Mind Map
                    </Button>
                  </Card>
                )}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="mx-auto border-blue-500/30 text-blue-300 hover:bg-blue-600/20">
                    View All Mind Maps
                  </Button>
                </div>
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
                {userData.quizzes.length > 0 ? (
                  userData.quizzes.map((quiz) => (
                    <motion.div
                      key={quiz.id}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      onHoverStart={() => setHoverCard(quiz.id + "qz")}
                      onHoverEnd={() => setHoverCard(null)}
                      className="bg-[#152a47] rounded-xl shadow-lg border border-blue-500/20 overflow-hidden transition-all duration-200"
                    >
                      <div className="p-5 relative">
                        {/* Animated highlight effect on hover */}
                        {hoverCard === quiz.id + "qz" && (
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <h3 className="font-semibold text-lg text-white">{quiz.title}</h3>
                            <div className="flex items-center text-sm text-blue-300 mt-1">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{quiz.date}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100 hover:bg-blue-800/30">
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {/* Score progress visualization */}
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-blue-300">Score</span>
                            <span className="text-sm font-bold text-green-400">{quiz.score}</span>
                          </div>
                          <div className="relative h-2 bg-[#0f2039] rounded-full overflow-hidden">
                            <motion.div 
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: quiz.score }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-blue-500/20 relative z-10">
                          <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" className="flex items-center text-blue-300 hover:text-blue-100">
                              <Activity className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </div>
                          
                          <Button variant="outline" size="sm" className="text-blue-300 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-100">
                            Retake
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <Card className="p-8 text-center bg-[#152a47] border-blue-500/20">
                    <CheckCircle className="w-12 h-12 text-green-500/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No quizzes yet</h3>
                    <p className="text-blue-300 mb-4">Test your knowledge by taking your first quiz</p>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-700 hover:from-green-700 hover:to-blue-800">
                      Take a Quiz
                    </Button>
                  </Card>
                )}
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="mx-auto border-blue-500/30 text-blue-300 hover:bg-blue-600/20">
                    View All Quizzes
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
      
      {/* Enhanced Activity Streak */}
      <motion.div 
        variants={itemVariants}
        className="mt-12"
      >
        <Card className="bg-[#152a47] border-blue-500/20 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white flex items-center">
                <Zap className="w-5 h-5 text-amber-400 mr-2" />
                Study Streak
              </CardTitle>
              <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold">
                {userData.streak} days
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-blue-300">
                Keep going! You're on fire this week.
              </div>
              <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-100">
                <BarChart2 className="w-4 h-4 mr-1" />
                View Stats
              </Button>
            </div>
            
            {/* Streak visualization */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <motion.div
                  key={day}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: day * 0.1 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <div 
                    className={`w-full h-2 rounded-full mb-1 ${
                      day <= (userData.streak % 7) 
                        ? "bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_6px_0_rgba(251,191,36,0.7)]"
                        : "bg-blue-900/50"
                    }`}
                  />
                  <span className="text-xs text-blue-300">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][day - 1]}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Longest streak indicator */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <div className="text-blue-300">
                <Sparkles className="w-4 h-4 inline mr-1 text-amber-400" />
                Longest streak: <span className="font-medium">64 days</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-300 hover:text-blue-100"
              >
                Share
                <Share2 className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;