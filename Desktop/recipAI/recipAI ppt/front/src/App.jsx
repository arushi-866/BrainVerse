import React, { useState, useEffect } from "react";
import { ChefHat, Moon, Sun, MessageSquare, User } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Import components
import Navbar from "./components/navbar/Navbar2";
import UserProfile from "./components/Arushis Component/Profile";
// import Contact from "./pages/Contact";
import ChatAssistant from "./components/Arushis Component/Chatbot/ChatAssistant";
import Footer from "./components/Arushis Component/Footer";
import About from "./components/pages/About";
import FAQs from "./components/pages/FAQ";
import Terms from "./components/pages/Terms";
// import Privacy from "./components/pages/PrivacyPolicy";
import MainPage from "./components/Arushis Component/HomePage"; // We'll create this
import Login from "./components/Log In/LogIn";
import SignUp from "./components/Sign Up/SignUp";
import DashboardLayout from './components/Dashboard/DashboardLayout';


// Move ProtectedRoute outside of App component and into its own component
const ProtectedRouteWrapper = ({ children, role }) => {
  return (
    <Routes>
      <Route
        path="*"
        element={<ProtectedRoute role={role}>{children}</ProtectedRoute>}
      />
    </Routes>
  );
};

const ProtectedRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role !== role) {
          navigate('/login');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [navigate, role]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : null;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            border: '1px solid #4CAF50',
            padding: '16px',
            color: '#333333',
          },
        }}
      />
      {/* <Navbar>
        <div className="flex items-center space-x-4">
          <ChefHat className="h-8 w-8 text-emerald-500" />
          <span className="text-2xl font-bold text-emerald-500">RecipAI</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun className="h-5 w-5 text-gray-200" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </button>
          <button onClick={() => setShowChat(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-200" />
          </button>
          <button onClick={() => setShowProfile(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-200" />
          </button>
        </div>
      </Navbar> */}

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<>
            <Navbar>
        <div className="flex items-center space-x-4">
          <ChefHat className="h-8 w-8 text-emerald-500" />
          <span className="text-2xl font-bold text-emerald-500">RecipAI</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun className="h-5 w-5 text-gray-200" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </button>
          <button onClick={() => setShowChat(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-200" />
          </button>
          <button onClick={() => setShowProfile(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <User className="h-5 w-5 text-gray-600 dark:text-gray-200" />
          </button>
        </div>
      </Navbar>
          <MainPage />
          <ChatAssistant/>
      <Footer />

          </>} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          {/* <Route path="/privacy" element={<Privacy />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/dashboard/profile" element={<UserProfile />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRouteWrapper role="user">
                <DashboardLayout />
          <ChatAssistant/>

              </ProtectedRouteWrapper>
            }
          />
        </Routes>
      </div>


      {/* Modals */}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      {showChat && <ChatAssistant onClose={() => setShowChat(false)} />}
    </div>
  );
}

export default App;
