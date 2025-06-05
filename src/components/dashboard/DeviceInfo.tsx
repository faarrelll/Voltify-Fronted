// import React from 'react';
// import { Device } from '../../types/device.types';

// interface DeviceInfoProps {
//   device: Device;
// }

// const DeviceInfo: React.FC<DeviceInfoProps> = ({ device }) => {
//   const { info, status, readings } = device;
  
//   const formatTimestamp = (timestamp: number) => {
//     return new Date(timestamp).toLocaleString();
//   };
  
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md h-full">
//       <h2 className="text-xl font-semibold mb-4">Device Information</h2>
      
//       <div className="mb-4">
//         <div className="flex justify-between items-center mb-2">
//           <span className="font-medium">Status:</span>
//           <span className={`px-2 py-1 rounded-full text-sm ${
//             status.online 
//               ? 'bg-green-100 text-green-800' 
//               : 'bg-red-100 text-red-800'
//           }`}>
//             {status.online ? 'Online' : 'Offline'}
//           </span>
//         </div>
//         <div className="text-sm text-gray-500">
//           Last seen: {formatTimestamp(status.lastSeen)}
//         </div>
//       </div>
      
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <p className="text-gray-600 text-sm">Device Type</p>
//           <p className="font-medium">{info.deviceType}</p>
//         </div>
//         <div>
//           <p className="text-gray-600 text-sm">Firmware</p>
//           <p className="font-medium">{info.firmware}</p>
//         </div>
//         <div>
//           <p className="text-gray-600 text-sm">MAC Address</p>
//           <p className="font-medium">{info.macAddress}</p>
//         </div>
//         <div>
//           <p className="text-gray-600 text-sm">IP Address</p>
//           <p className="font-medium">{info.ipAddress}</p>
//         </div>
//       </div>
      
//       <hr className="my-4" />
      
//       <h3 className="font-medium mb-2">Current Readings</h3>
//       <div className="grid grid-cols-3 gap-2">
//         <div className="bg-gray-50 p-2 rounded">
//           <p className="text-xs text-gray-500">Voltage</p>
//           <p className="font-medium">{parseFloat(readings.voltage.toFixed(2))}  V</p>
//         </div>
//         <div className="bg-gray-50 p-2 rounded">
//           <p className="text-xs text-gray-500">Current</p>
//           <p className="font-medium">{parseFloat(readings.current.toFixed(2))} A</p>
//         </div>
//         <div className="bg-gray-50 p-2 rounded">
//           <p className="text-xs text-gray-500">Power</p>
//           <p className="font-medium">{parseFloat(readings.power.toFixed(2))} W</p>
//         </div>
//         <div className="bg-gray-50 p-2 rounded">
//           <p className="text-xs text-gray-500">Temperature</p>
//           <p className="font-medium">{parseFloat(readings.temperature.toFixed(2))} °C</p>
//         </div>
//         <div className="bg-gray-50 p-2 rounded">
//           <p className="text-xs text-gray-500">Humidity</p>
//           <p className="font-medium">{parseFloat(readings.humidity.toFixed(2))} %</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeviceInfo;

// src/components/dashboard/DeviceInfo.tsx
import React from 'react';
import { Device } from '../../types/device.types';

interface DeviceInfoProps {
  device: Device;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ device }) => {
  const formatLastSeen = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatTemperature = (temp: number) => {
    return `${temp.toFixed(1)}°C`;
  };

  const formatHumidity = (humidity: number) => {
    return `${humidity.toFixed(1)}%`;
  };



  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Device Information</h2>
      
      {/* Device Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Status</span>
          <div className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                device.status.online ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span className={`text-sm font-medium ${
              device.status.online ? 'text-green-600' : 'text-red-600'
            }`}>
              {device.status.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Last seen: {formatLastSeen(device.status.lastSeen)}
        </div>
      </div>

      {/* Device Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Device Type</span>
          <span className="text-sm font-medium">{device.info.deviceType}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Firmware</span>
          <span className="text-sm font-medium">{device.info.firmware}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">IP Address</span>
          <span className="text-sm font-medium font-mono">{device.info.ipAddress}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">MAC Address</span>
          <span className="text-sm font-medium font-mono">{device.info.macAddress}</span>
        </div>
      </div>

      <hr className="my-4" />

      {/* Environmental Readings */}
      <div className="space-y-3 mb-6">
        <h3 className="text-lg font-medium">Environmental</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Temperature</span>
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-lg font-bold text-blue-700 mt-1">
              {formatTemperature(device.readings.temperature)}
            </div>
          </div>

          <div className="bg-cyan-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Humidity</span>
              <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="text-lg font-bold text-cyan-700 mt-1">
              {formatHumidity(device.readings.humidity)}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* System Readings */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">System</h3>
        

        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="text-sm text-gray-600">Relay Status</span>
          <div className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                device.state.relayState ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            <span className={`text-sm font-medium ${
              device.state.relayState ? 'text-green-600' : 'text-gray-600'
            }`}>
              {device.state.relayState ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;