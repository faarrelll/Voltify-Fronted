// src/services/deviceService.ts
import { ref, get, set } from 'firebase/database';
import { database } from '../config/firebase';
import { Device, DeviceSettings } from '../types/device.types';

export const deviceService = {
  // Check if a device exists by MAC address
  checkDeviceExists: async (macAddress: string): Promise<boolean> => {
    const deviceRef = ref(database, `voltage_controller/devices/${macAddress}`);
    const snapshot = await get(deviceRef);
    return snapshot.exists();
  },

  // Get device details by MAC address
  getDeviceDetails: async (macAddress: string): Promise<Device | null> => {
    const deviceRef = ref(database, `voltage_controller/devices/${macAddress}`);
    const snapshot = await get(deviceRef);
    
    if (snapshot.exists()) {
      return snapshot.val() as Device;
    }
    return null;
  },

  // Get device history by MAC address
  getDeviceHistory: async (macAddress: string) => {
    const historyRef = ref(database, `voltage_controller/history/${macAddress}`);
    const snapshot = await get(historyRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  },

  // Update device settings
  updateDeviceSettings: async (macAddress: string, settings: DeviceSettings) => {
    const settingsRef = ref(database, `voltage_controller/devices/${macAddress}/settings`);
    await set(settingsRef, settings);
  }
};