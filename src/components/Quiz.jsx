import React, { useState } from 'react';

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (!questions.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Process your text to generate quiz questions</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Question {currentQuestion + 1}</h3>
        <p className="text-lg mb-6">{question.question}</p>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : 'bg-white hover:bg-gray-50'
              } border`}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="flex justify-between items-center">
          <p className={selectedAnswer === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
            {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect. Try again!'}
          </p>
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;