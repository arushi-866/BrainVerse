import React from 'react';
import ReactMarkdown from 'react-markdown';

function Summary({ summary }) {
  if (!summary) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Process your text to see the AI-generated summary</p>
      </div>
    );
  }

  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{summary}</ReactMarkdown>
    </div>
  );
}

export default Summary;