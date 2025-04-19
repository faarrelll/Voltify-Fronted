// src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-4 shadow-inner text-center text-gray-600 text-sm">
      <p>© {new Date().getFullYear()} Voltify. All rights reserved.</p>
    </footer>
  );
};

export default Footer;