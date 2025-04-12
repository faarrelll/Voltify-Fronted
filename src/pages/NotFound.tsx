// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Halaman tidak ditemukan</p>
      <Link 
        to="/" 
        className="mt-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
      >
        Kembali ke Home
      </Link>
    </div>
  );
};

export default NotFound;