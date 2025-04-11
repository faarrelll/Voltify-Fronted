export interface DeviceInfo {
    deviceType: string;
    firmware: string;
    ipAddress: string;
    macAddress: string;
  }
  
  export interface DeviceReadings {
    current: number;
    energy: number;
    frequency: number;
    humidity: number;
    power: number;
    temperature: number;
    timestamp: number;
    voltage: number;
  }
  
  export interface DeviceSettings {
    targetVoltage: number;
    voltageTolerance: number;
    location?: string;
  }
  
  export interface DeviceState {
    relayState: boolean;
    dimmerValue?: number;
  }
  
  export interface DeviceStatus {
    lastSeen: number;
    online: boolean;
  }
  
  export interface Device {
    info: DeviceInfo;
    readings: DeviceReadings;
    settings: DeviceSettings;
    state: DeviceState;
    status: DeviceStatus;
  }
  
  export interface HistoryEntry {
    current: number;
    energy: number;
    frequency: number;
    humidity: number;
    power: number;
    temperature: number;
    voltage: number;
    timestamp?: number;
  }
  
  export interface DeviceHistory {
    [timestamp: string]: HistoryEntry;
  }
  
  export interface DeviceContextType {
    loading: boolean;
    error: string | null;
    devices: { [deviceId: string]: Device };
    selectedDevice: Device | null;
    selectedDeviceId: string | null;
    deviceHistory: HistoryEntry[];
    setSelectedDeviceId: (deviceId: string) => void;
    updateDeviceSettings: (deviceId: string, settings: Partial<DeviceSettings>) => Promise<void>;
    updateDeviceState: (deviceId: string, state: Partial<DeviceState>) => Promise<void>;
    refreshDeviceData: () => Promise<void>;
    addDeviceToUser: (macAddress: string, name: string) => Promise<void>;
  }