// src/services/socialAuthService.ts
import { 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup,
    UserCredential 
  } from 'firebase/auth';
  import { ref, set, get } from 'firebase/database';
  import { auth, database } from '../config/firebase';
  
  export const socialAuthService = {
    // Login dengan Google
    loginWithGoogle: async (): Promise<UserCredential> => {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      
      try {
        const result = await signInWithPopup(auth, provider);
        
        // Check if user exists in database
        const userRef = ref(database, `users/${result.user.uid}`);
        const snapshot = await get(userRef);
        
        if (!snapshot.exists()) {
          // Create new user record
          await set(userRef, {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: Date.now(),
            authProvider: 'google',
            devices: {}
          });
        }
        
        return result;
      } catch (error) {
        console.error('Google login error:', error);
        throw error;
      }
    },
  
    // Login dengan Facebook
    loginWithFacebook: async (): Promise<UserCredential> => {
      const provider = new FacebookAuthProvider();
      provider.addScope('public_profile');
      provider.addScope('email');
      
      try {
        const result = await signInWithPopup(auth, provider);
        
        // Check if user exists in database
        const userRef = ref(database, `users/${result.user.uid}`);
        const snapshot = await get(userRef);
        
        if (!snapshot.exists()) {
          // Create new user record
          await set(userRef, {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: Date.now(),
            authProvider: 'facebook',
            devices: {}
          });
        }
        
        return result;
      } catch (error) {
        console.error('Facebook login error:', error);
        throw error;
      }
    }
  };