import React from 'react';

function TextInput({ value, onChange }) {
  return (
    <div className="w-full">
      <textarea
        className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Paste your study material here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TextInput;