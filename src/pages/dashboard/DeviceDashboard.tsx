// src/pages/dashboard/DeviceDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MainLayout from '../../components/layout/MainLayout';
import { deviceService } from '../../services/deviceService';
import { Device, HistoryEntry } from '../../types/device.types';
import ReadingsChart from '../../components/dashboard/ReadingsChart';
import VoltageGauge from '../../components/dashboard/VoltageGauge';
import CurrentGauge from '../../components/dashboard/CurrentGauge';
import PowerGauge from '../../components/dashboard/PowerGauge';
import DeviceInfo from '../../components/dashboard/DeviceInfo';

const DeviceDashboard: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!deviceId) return;
    
    setLoading(true);
    
    // Subscribe to real-time device updates
    const deviceUnsubscribe = deviceService.subscribeToDevice(deviceId, (deviceData) => {
      setDevice(deviceData);
      setLoading(false);
    });
    
    // Subscribe to real-time history updates
    const historyUnsubscribe = deviceService.subscribeToDeviceHistory(deviceId, (historyData) => {
      if (historyData) {
        // Convert object to array and ensure timestamp is a number
        const historyArray = Object.entries(historyData).map(([timestamp, entry]) => {
          if (typeof entry === 'object' && entry !== null) {
            return {
              ...(entry as HistoryEntry),
              timestamp: parseInt(timestamp, 10)
            };
          }
          return null;
        }).filter((item): item is HistoryEntry & { timestamp: number } => item !== null);
        
        setHistoryData(historyArray);
      }
    });
    
    // Cleanup subscriptions when component unmounts
    return () => {
      deviceUnsubscribe();
      historyUnsubscribe();
    };
  }, [deviceId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!device) {
    return (
      <MainLayout>
        <div className="bg-red-100 p-4 rounded-md text-red-700">
          Device not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Device Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time monitoring for {device.info.macAddress}</p>
      </div>
      
      {/* Top Row - Device Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <DeviceInfo device={device} />
        </div>
        
        {/* Voltage Gauge - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <VoltageGauge 
            currentVoltage={device.readings.voltage} 
            targetVoltage={device.settings.targetVoltage}
            tolerance={device.settings.voltageTolerance}
          />
        </div>
      </div>
      
      {/* Middle Row - Current and Power Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CurrentGauge 
          current={device.readings.current}
          maxCurrent={20} // Adjust based on your device specifications
        />
        
        <PowerGauge 
          power={device.readings.power}
          maxPower={4000} // Adjust based on your device specifications
        />
      </div>
      
      {/* Bottom Row - Readings Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Historical Data</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last updated: {new Date(device.readings.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
        
        <ReadingsChart historyData={historyData} />
      </div>
    </MainLayout>
  );
};

export default DeviceDashboard;