import React from 'react';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold text-primary">Home Server Dashboard</h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <a 
              href="#" 
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Settings
            </a>
          </li>
          <li>
            <button 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
} 