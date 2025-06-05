// src/types/device.types.ts
export interface DeviceInfo {
  deviceType: string;
  firmware: string;
  ipAddress: string;
  macAddress: string;
}

export interface DeviceStatus {
  online: boolean;
  lastSeen: number;
}

export interface DeviceReadings {
  voltage: number;
  current: number;
  power: number;
  frequency: number;
  energy: number;
  temperature: number;
  humidity: number;
  timestamp: number;
}

export interface DeviceSettings {
  targetVoltage: number;
  voltageTolerance: number;
  currentLimit: number;
  powerLimit: number;
  autoRelay: boolean;
  scheduledMode: boolean;
}

export interface DeviceState {
  relayState: boolean;
  scheduledState: boolean;
  alertState: boolean;
  lastAction: string;
  lastActionTime: number;
}

export interface Device {
  id: string;
  info: DeviceInfo;
  status: DeviceStatus;
  readings: DeviceReadings;
  settings: DeviceSettings;
  state: DeviceState;
}

export interface HistoryEntry {
  voltage: number;
  current: number;
  power: number;
  frequency: number;
  energy: number;
  temperature: number;
  humidity: number;
  timestamp: number;
}