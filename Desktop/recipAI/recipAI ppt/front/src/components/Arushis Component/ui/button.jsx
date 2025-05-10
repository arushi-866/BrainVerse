import React from "react";

export const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      {children}
    </button>
  );
};
