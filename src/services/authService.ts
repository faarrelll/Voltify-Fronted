// src/services/authService.ts (berisi logika API ke Firebase)
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../config/firebase';
import { UserDevices } from '../types/auth.types';

export const authService = {
  // Login dengan email dan password
  login: async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  // Registrasi pengguna baru
  register: async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile dengan nama
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name
      });
    }
    
    // Buat user data di Realtime Database
    await set(ref(database, `users/${userCredential.user.uid}`), {
      displayName: name,
      email: email,
      createdAt: Date.now(),
      devices: {}
    });
    
    return userCredential;
  },

  // Logout
  logout: () => signOut(auth),

  // Reset password
  resetPassword: (email: string) => sendPasswordResetEmail(auth, email),

  // Mendapatkan devices milik user
  getUserDevices: async (userId: string): Promise<UserDevices> => {
    const snapshot = await get(ref(database, `users/${userId}/devices`));
    if (snapshot.exists()) {
      return snapshot.val() as UserDevices;
    }
    return {};
  },

  // Menambahkan device ke user
  addDeviceToUser: async (userId: string, deviceId: string, deviceName: string) => {
    await set(ref(database, `users/${userId}/devices/${deviceId}`), {
      name: deviceName,
      addedAt: Date.now()
    });
  }
};