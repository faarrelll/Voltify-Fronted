// src/components/layout/SideBar.tsx
import React from "react";
import { Link } from "react-router";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Devices
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;