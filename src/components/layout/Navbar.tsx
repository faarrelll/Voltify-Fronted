// src/components/layout/Navbar.tsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
// import { Link } from "react-router";
import logo from "../../assets/images/image-removebg-preview (1).png";

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">Voltify</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {currentUser?.displayName || currentUser?.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;