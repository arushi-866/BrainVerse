import React, { useState } from 'react';
import { Brain, BookOpen, Map, FileQuestion } from 'lucide-react';
import Navbar from './components/Navbar';
import TextInput from './components/TextInput';
import Summary from './components/Summary';
import MindMap from './components/MindMap';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import Profile from './components/Profile';
import HomePage from './components/HomePage';

function App() {
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('summary');
  const [summary, setSummary] = useState('');
  const [mindMapData, setMindMapData] = useState({ nodes: [], links: [] });
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Simulated AI processing - In production, this would call your backend API
  const processText = () => {
    // Simulate summary generation
    setSummary(`# Key Points\n\n- ${text.slice(0, 100)}...\n\n## Main Ideas\n\n1. First point\n2. Second point`);

    // Simulate mind map data
    setMindMapData({
      nodes: [
        { id: 'main', name: 'Main Topic' },
        { id: 'sub1', name: 'Subtopic 1' },
        { id: 'sub2', name: 'Subtopic 2' }
      ],
      links: [
        { source: 'main', target: 'sub1' },
        { source: 'main', target: 'sub2' }
      ]
    });

    // Simulate quiz generation
    setQuizQuestions([
      {
        question: 'Sample question based on the text?',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correctAnswer: 0
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HomePage></HomePage>
      {/* <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
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

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'summary' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Summary</span>
                </button>
                <button
                  onClick={() => setActiveTab('mindmap')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'mindmap' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Map className="h-5 w-5" />
                  <span>Mind Map</span>
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileQuestion className="h-5 w-5" />
                  <span>Quiz</span>
                </button>
              </div>

              <div className="min-h-[500px]">
                {activeTab === 'summary' && <Summary summary={summary} />}
                {activeTab === 'mindmap' && <MindMap data={mindMapData} />}
                {activeTab === 'quiz' && <Quiz questions={quizQuestions} />}
              </div>
            </div>
          </div>
        </div>
      </main> */}
      <Footer></Footer>
      <Profile></Profile>
    </div>
  );
}

export default App;