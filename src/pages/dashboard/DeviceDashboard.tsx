import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MainLayout from '../../components/layout/MainLayout';
import { deviceService } from '../../services/deviceService';
import { Device, HistoryEntry } from '../../types/device.types';
import ReadingsChart from '../../components/dashboard/ReadingsChart';
import VoltageGauge from '../../components/dashboard/VoltageGauge';
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
          {'Device not found'}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Device Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Device Info Card */}
        <div className="col-span-1">
          <DeviceInfo device={device} />
        </div>
        
        {/* Voltage Gauge */}
        <div className="col-span-1 md:col-span-2">
          <VoltageGauge 
            currentVoltage={device.readings.voltage} 
            targetVoltage={device.settings.targetVoltage}
            tolerance={device.settings.voltageTolerance}
          />
        </div>
      </div>
      
      {/* Readings Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sensor Readings</h2>
        <ReadingsChart historyData={historyData} />
      </div>
    </MainLayout>
  );
};

export default DeviceDashboard;