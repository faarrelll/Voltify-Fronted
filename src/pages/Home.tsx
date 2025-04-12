// src/pages/Home.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Voltify Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-300">
              Welcome, {currentUser?.displayName || currentUser?.email}
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Device dashboard akan segera diimplementasikan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;