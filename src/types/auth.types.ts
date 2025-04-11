export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoUrl?: string | null;
}

export interface UserDevices {
    [deviceId: string]: {
        name:string;
        addedAt:number;
    }
}

export interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getUserDevices: () => Promise<UserDevices>;
    setError: (error: string | null) => void;
  }