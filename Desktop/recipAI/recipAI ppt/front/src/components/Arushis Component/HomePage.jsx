import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Search, 
  Stars, 
  Bot, 
  RefrigeratorIcon, 
  ShieldCheck, 
  Leaf,
  Utensils,
  SparklesIcon,
  Soup,
  Sandwich,
  Pizza,
  Clock,
  Flame,
  Heart,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Hero image placeholder - replace with your actual image
const heroImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

// Feature images
const featureImages = [
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
];

// Recipe images
const recipeImages = [
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80"
];

// Video placeholder - replace with your actual video
const demoVideo = "https://assets.mixkit.co/videos/preview/mixkit-woman-cooking-in-the-kitchen-4153-large.mp4";



const FeatureCard = ({ feature, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.6,
          delay: index * 0.2,
          type: "spring",
          stiffness: 100
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="h-48 overflow-hidden relative">
        <motion.img 
          src={featureImages[index]} 
          alt={feature.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
          <div className="bg-indigo-600 p-3 rounded-full shadow-lg">
            {feature.icon}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white">
          {feature.title}
        </h3>
        <p className="text-gray-300 mb-4">
          {feature.description}
        </p>
        {/* <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-indigo-400 font-medium"
        >
          Learn more <ArrowRight className="ml-2" size={16} />
        </motion.button> */}
      </div>
    </motion.div>
  );
};

const StatItem = ({ stat, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { 
          duration: 0.6,
          delay: index * 0.2,
          type: "spring",
          stiffness: 100
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="text-center p-4"
    >
      <motion.p 
        className="text-5xl font-bold mb-2 text-white"
        whileHover={{ scale: 1.1 }}
      >
        {stat.value}
      </motion.p>
      <p className="text-indigo-200">{stat.label}</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.5, duration: 1 }}
        className="h-1 bg-indigo-400 mt-4 rounded-full"
      />
    </motion.div>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const featureCards = [
    {
      icon: <RefrigeratorIcon className="w-6 h-6 text-indigo-200" />,
      title: "Pantry-Powered Recipes",
      description: "Transform your available ingredients into delicious meals with AI-powered recommendations that reduce food waste and save you money."
    },
    {
      icon: <Leaf className="w-6 h-6 text-indigo-200" />,
      title: "Dietary Flexibility",
      description: "Customize recipes based on dietary preferences, allergies, and health goals. Vegan, keto, gluten-free - we've got you covered."
    },
    {
      icon: <Bot className="w-6 h-6 text-indigo-200" />,
      title: "AI Recipe Assistant",
      description: "Get instant cooking suggestions, step-by-step guidance, and troubleshooting help from our intelligent chatbot."
    }
  ];

  

  const stats = [
    { value: "95%", label: "User Satisfaction" },
    { value: "40%", label: "Food Waste Reduced" },
    { value: "10K+", label: "Recipes Generated" },
    { value: "24/7", label: "AI Assistance" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      quote: "RecipAI has transformed my kitchen! As a working mother, I used to struggle with meal planning. Now I can create delicious meals from whatever I have at home.",
      gender: "women",
      id: 45
    },
    {
      name: "Rahul Patel",
      location: "Bangalore",
      rating: 4,
      quote: "The AI suggestions are amazing! I've discovered so many new recipes I would never have thought of. My only wish is for more regional Indian cuisine options.",
      gender: "men",
      id: 32
    },
    {
      name: "Ananya Gupta",
      location: "Delhi",
      rating: 4,
      quote: "This app has helped me reduce my grocery bill by 25%. The portion sizing recommendations are perfect for my small family.",
      gender: "women",
      id: 28
    },
    ...[
      { name: "Amit Verma", location: "Hyderabad" },
      { name: "Sneha Kapoor", location: "Pune" },
      { name: "Vikram Singh", location: "Chennai" },
      { name: "Neha Joshi", location: "Kolkata" },
      { name: "Suresh Reddy", location: "Jaipur" },
      { name: "Pooja Desai", location: "Ahmedabad" },
      { name: "Rohan Mehta", location: "Lucknow" },
      { name: "Divya Nair", location: "Chandigarh" },
      { name: "Arjun Malhotra", location: "Bhopal" },
      { name: "Kavita Shah", location: "Nagpur" }
    ].map((user, i) => ({
      name: user.name,
      location: user.location,
      rating: Math.floor(Math.random() * 2) + 4,
      quote: "This is a fantastic app! It has changed the way I cook and plan meals.",
      gender: i % 2 === 0 ? "men" : "women",
      id: i + 60
    }))
  ];
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
            className="absolute text-indigo-300 opacity-30"
            style={{
              fontSize: `${Math.random() * 20 + 10}px`
            }}
          >
            {i % 3 === 0 ? <Utensils /> : i % 3 === 1 ? <ChefHat /> : <Leaf />}
          </motion.div>
        ))}
      </motion.div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 h-{100%} pt-24 pb-16 relative z-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            type: "spring", 
            stiffness: 50 
          }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Hero Content */}
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                bounce: 0.5
              }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  transition: { 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }
                }}
              >
                {/* <ChefHat 
                  className="text-indigo-400" 
                  size={40} 
                  strokeWidth={2.5} 
                /> */}
              </motion.div>
              <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400">
                RecipAI
              </h1>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-bold text-white"
            >
              Transform Ingredients <span className="text-indigo-400">Into Culinary Magic</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-300 text-lg"
            >
              Discover personalized recipes using ingredients you already have. Reduce waste, save money, and enjoy cooking with our AI-powered culinary assistant.
            </motion.p>

            {/* Get Started Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-gradient-to-r 
                  from-indigo-600 
                  to-teal-500
                  text-white 
                  px-8 
                  py-4 
                  rounded-full 
                  font-bold 
                  shadow-lg
                  hover:shadow-xl
                  transition 
                  duration-300
                "
              >
                Get Started - It's Free!
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-transparent
                  border-2
                  border-indigo-400
                  text-indigo-400 
                  px-8 
                  py-4 
                  rounded-full 
                  font-bold 
                  shadow-lg
                  hover:shadow-xl
                  hover:bg-indigo-400/10
                  transition 
                  duration-300
                "
              >
                Create Account
              </motion.button>
            </motion.div>

            {/* Recipe Generation Results */}
            <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2 text-indigo-400"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }
                    }}
                  >
                    <SparklesIcon />
                  </motion.div>
                  <span>Generating magical recipes from your ingredients...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
            className="hidden md:flex justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="
                w-full 
                max-w-md 
                h-[32rem]
                rounded-3xl 
                shadow-2xl 
                transform 
                transition 
                duration-300
                flex 
                items-center 
                justify-center
                relative
                overflow-hidden
                border-8
                border-gray-800
              "
            >
              <motion.img 
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                src={heroImage} 
                alt="RecipAI Hero" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-white"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="text-yellow-400" fill="currentColor" />
                    <span className="font-medium">4.9 (2K+ reviews)</span>
                  </div>
                  <h3 className="text-2xl font-bold">"RecipAI changed how I cook!"</h3>
                  <p className="text-white/90">- Sarah, Home Cook</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-600 to-teal-500 py-16 text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <StatItem key={index} stat={stat} index={index} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold text-white mb-4"
          >
            Why <span className="text-indigo-400">RecipAI</span> Stands Out
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Our AI-powered platform revolutionizes how you cook, reduce food waste, and enjoy personalized culinary experiences.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featureCards.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Video Demo Section */}
      {/* <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                See RecipAI <span className="text-indigo-400">in Action</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Watch our 60-second demo to see how easy it is to transform random ingredients into delicious meals with our AI chef.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-gradient-to-r 
                  from-indigo-600 
                  to-teal-500
                  text-white 
                  px-8 
                  py-4 
                  rounded-full 
                  font-bold 
                  shadow-lg
                  hover:shadow-xl
                  transition 
                  duration-300
                  flex
                  items-center
                "
              >
                <Play className="mr-2" size={18} fill="currentColor" />
                Watch Full Demo
              </motion.button>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  src={demoVideo}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1556910638-90b6a9b6b8d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  loop
                />
              </div>
              {!isVideoPlaying && (
                <motion.button
                  onClick={toggleVideoPlay}
                  className="
                    absolute 
                    inset-0 
                    m-auto 
                    w-20 
                    h-20 
                    bg-gray-800/90
                    rounded-full 
                    flex 
                    items-center 
                    justify-center
                    shadow-xl
                  "
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play className="text-indigo-400" size={32} fill="currentColor" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Testimonials Section */}
      <motion.div 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-20 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">
          What Our <span className="text-indigo-400">Users Say</span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Don't just take our word for it - hear from home cooks who transformed their kitchen experience.
        </p>
      </div>

      <motion.div 
        className="flex space-x-8 p-4"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[300px]"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={i < testimonial.rating ? "text-yellow-400" : "text-gray-600"} 
                  size={16} 
                  fill={i < testimonial.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-gray-300 mb-6 italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-700 mr-4 overflow-hidden">
                <img 
                  src={`https://randomuser.me/api/portraits/${testimonial.gender}/${testimonial.id}.jpg`} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-20"
      >
        <motion.div 
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.3 }
          }}
          className="
            bg-gradient-to-r 
            from-indigo-600 
            to-teal-500 
            text-white 
            rounded-3xl 
            p-12 
            text-center 
            shadow-2xl 
            relative
            overflow-hidden
          "
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute inset-0 overflow-hidden opacity-20"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '150%',
                  height: '300px',
                  background: `linear-gradient(${i * 30}deg, transparent, rgba(255,255,255,0.3), transparent)`,
                  transformOrigin: '0 0'
                }}
              />
            ))}
          </motion.div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-indigo-100">
              Join thousands of home cooks who are reducing food waste, saving money, and discovering new favorite recipes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-white 
                  text-indigo-600 
                  px-8 
                  py-4 
                  rounded-full 
                  font-bold 
                  shadow-lg
                  hover:shadow-xl
                  transition 
                  duration-300
                  flex
                  items-center
                  justify-center
                "
              >
                Get Started - It's Free!
              </motion.button>
              {/* <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  bg-transparent
                  border-2
                  border-white
                  text-white 
                  px-8 
                  py-4 
                  rounded-full 
                  font-bold 
                  shadow-lg
                  hover:shadow-xl
                  hover:bg-white/10
                  transition 
                  duration-300
                  flex
                  items-center
                  justify-center
                "
              >
                <Play className="mr-2" size={18} />
                Watch Demo
              </motion.button> */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;