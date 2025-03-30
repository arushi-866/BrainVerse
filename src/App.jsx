import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import MindMap from "./components/MindMap";
import Quiz from "./components/Quiz";
import FlashCards from "./components/FlashCards";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import About from "./pages/About";
import Dashboard from "./components/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { ProtectedRoute } from './utils/ProtectedRoute';
import Summarizer from "./components/Summarizer";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [mindMapData, setMindMapData] = useState({ nodes: [], links: [] });
  const [quizQuestions, setQuizQuestions] = useState([]);



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <Summarizer></Summarizer>
      {/* Add padding to prevent overlapping */}
      <div className="flex-grow pt-16 ">
      <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/summary" element={<Summary summary={summary} />} /> */}
          <Route path="/mindmap" element={<MindMap data={mindMapData} />} />
          <Route path="/quiz" element={<Quiz questions={quizQuestions} />} />
          <Route path="/flashcards" element={<FlashCards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;