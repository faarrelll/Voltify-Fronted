// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { UserDevices } from '../types/auth.types';
import DeviceList from '../components/devices/DeviceList';
import { authService } from '../services/authService';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const [devices, setDevices] = useState<UserDevices>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setLoading(true);
    
    // Only subscribe if we have a user
    if (!currentUser) {
      setLoading(false);
      return;
    }
    
    // Set up real-time subscription to user devices
    const unsubscribe = authService.subscribeToUserDevices(
      currentUser.uid, 
      (userDevices) => {
        setDevices(userDevices);
        setLoading(false);
      }
    );
    
    // Clean up subscription when component unmounts or user changes
    return () => {
      unsubscribe();
    };
  }, [currentUser]);
  
  // We no longer need the fetchDevices function since we're using real-time updates
  
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Your Devices</h1>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DeviceList devices={devices} onDeviceAdded={() => {}} />
      )}
    </MainLayout>
  );
};

export default Home;