// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { UserDevices } from '../types/auth.types';
import DeviceList from '../components/devices/DeviceList';

const Home: React.FC = () => {
  const { currentUser, getUserDevices } = useAuth();
  const [devices, setDevices] = useState<UserDevices>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  const fetchDevices = async () => {
    try {
      setLoading(true);
      if (currentUser) {
        const userDevices = await getUserDevices();
        setDevices(userDevices);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDevices();
  }, [currentUser, getUserDevices]);
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Your Devices</h1>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DeviceList devices={devices} onDeviceAdded={fetchDevices} />
      )}
    </MainLayout>
  );
};

export default Home;