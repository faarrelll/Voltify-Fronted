// src/components/devices/DeviceList.tsx
import React, { useState } from "react";
import { UserDevices } from "../../types/auth.types";
import DeviceCard from "./DeviceCard";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/authService";

interface DeviceListProps {
  devices: UserDevices;
  onDeviceAdded: () => void; // Keeping this for backward compatibility
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  const [newDeviceId, setNewDeviceId] = useState("");
  const [newDeviceName, setNewDeviceName] = useState("");
  const [isAddingDevice, setIsAddingDevice] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newDeviceId || !newDeviceName) {
      setError("Please enter both MAC address and device name");
      return;
    }

    try {
      setIsLoading(true);
      if (currentUser) {
        await authService.addDeviceToUser(currentUser.uid, newDeviceId, newDeviceName);
        setSuccess(`Device "${newDeviceName}" added successfully!`);
        
        // Reset form
        setNewDeviceId("");
        setNewDeviceName("");
        
        // Close the form after a delay
        setTimeout(() => {
          setIsAddingDevice(false);
          setSuccess(null);
        }, 2000);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to add device. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deviceCount = Object.keys(devices).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {deviceCount} {deviceCount === 1 ? "Device" : "Devices"}
        </h2>
        <button
          onClick={() => {
            setIsAddingDevice(!isAddingDevice);
            setError(null);
            setSuccess(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isAddingDevice ? "Cancel" : "Add Device"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {isAddingDevice && (
        <div className="mb-6 p-4 bg-white rounded-md shadow-sm">
          <h3 className="text-lg font-medium mb-4">Add New Device</h3>
          <form onSubmit={handleAddDevice}>
            <div className="mb-4">
              <label
                htmlFor="deviceId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                MAC Address
              </label>
              <input
                type="text"
                id="deviceId"
                value={newDeviceId}
                onChange={(e) => setNewDeviceId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., e4:65:b8:d9:95:94"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="deviceName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Device Name
              </label>
              <input
                type="text"
                id="deviceName"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Living Room Controller"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {isLoading ? "Adding..." : "Add Device"}
            </button>
          </form>
        </div>
      )}

      {deviceCount === 0 ? (
        <div className="text-center py-12 bg-white rounded-md shadow-sm">
          <p className="text-gray-500">
            You don't have any devices yet. Add your first device to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(devices).map(([deviceId, device]) => (
            <DeviceCard
              key={deviceId}
              id={deviceId}
              name={device.name}
              addedAt={device.addedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceList;