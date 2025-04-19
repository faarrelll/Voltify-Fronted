// src/components/devices/DeviceCard.tsx
import React from "react";
import { Link } from "react-router";

interface DeviceCardProps {
  id: string;
  name: string;
  addedAt: number;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ id, name, addedAt }) => {
  // Format the date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Link to={`/device/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-500 mb-4">ID: {id}</p>
        <p className="text-xs text-gray-400">Added: {formatDate(addedAt)}</p>
      </div>
    </Link>
  );
};

export default DeviceCard;