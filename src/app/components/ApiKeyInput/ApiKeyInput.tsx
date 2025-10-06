"use client"
import { useState } from 'react';

export default function ApiKeyInput() {
  const [apiKey, setApiKey] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem('gemini-api-key', apiKey);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center">
      <button 
        onClick={() => setIsEditing(!isEditing)}
        className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
        aria-label="API Key"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-2h2v-2h2v-2h2v2h2l2.257-2.257A6 6 0 0121 9z" />
        </svg>
      </button>
      {isEditing && (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Enter your API Key</h3>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#69d2cd]"
            placeholder="Google AI Studio API Key"
          />
          <button
            onClick={handleSave}
            className="mt-2 w-full bg-[#294380] text-white py-2 rounded-md hover:bg-[#3b5fb7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#69d2cd]"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
