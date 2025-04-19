import React from 'react';
import { Device } from '../../types/device.types';

interface DeviceInfoProps {
  device: Device;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ device }) => {
  const { info, status, readings } = device;
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold mb-4">Device Information</h2>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Status:</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            status.online 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status.online ? 'Online' : 'Offline'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Last seen: {formatTimestamp(status.lastSeen)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 text-sm">Device Type</p>
          <p className="font-medium">{info.deviceType}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Firmware</p>
          <p className="font-medium">{info.firmware}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">MAC Address</p>
          <p className="font-medium">{info.macAddress}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">IP Address</p>
          <p className="font-medium">{info.ipAddress}</p>
        </div>
      </div>
      
      <hr className="my-4" />
      
      <h3 className="font-medium mb-2">Current Readings</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-500">Voltage</p>
          <p className="font-medium">{readings.voltage} V</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-500">Current</p>
          <p className="font-medium">{readings.current} A</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-500">Power</p>
          <p className="font-medium">{readings.power} W</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-500">Energy</p>
          <p className="font-medium">{readings.energy} kWh</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-500">Temperature</p>
          <p className="font-medium">{readings.temperature} °C</p>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-gray-500">Humidity</p>
          <p className="font-medium">{readings.humidity} %</p>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;