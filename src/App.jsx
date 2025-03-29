import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter from here
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Summary from "./components/Summary";
import MindMap from "./components/MindMap";
import Quiz from "./components/Quiz";
import FlashCards from "./components/FlashCards";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import TextInput from "./components/TextInput";
import About from "./pages/About";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [mindMapData, setMindMapData] = useState({ nodes: [], links: [] });
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Simulated AI processing - Replace with backend API call in production
  const processText = () => {
    setSummary(`# Key Points\n\n- ${text.slice(0, 100)}...\n\n## Main Ideas\n\n1. First point\n2. Second point`);
    setMindMapData({
      nodes: [
        { id: "main", name: "Main Topic" },
        { id: "sub1", name: "Subtopic 1" },
        { id: "sub2", name: "Subtopic 2" },
      ],
      links: [
        { source: "main", target: "sub1" },
        { source: "main", target: "sub2" },
      ],
    });
    setQuizQuestions([
      {
        question: "Sample question based on the text?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: 0,
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/summary" element={<Summary summary={summary} />} />
        <Route path="/mindmap" element={<MindMap data={mindMapData} />} />
        <Route path="/quiz" element={<Quiz questions={quizQuestions} />} />
        <Route path="/flashcards" element={<FlashCards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About></About>}></Route>
        <Route
          path="/input"
          element={
            <div className="container mx-auto px-4 py-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Input Your Study Material</h2>
                <TextInput value={text} onChange={setText} />
                <button
                  onClick={processText}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Process Text
                </button>
              </div>
            </div>
          }
        />
      </Routes>
      <Footer>
        <Routes>
          <Route path="/about" element={<About></About>}></Route>
        </Routes>
        </Footer>
    </div>
  );
}

export default App;
