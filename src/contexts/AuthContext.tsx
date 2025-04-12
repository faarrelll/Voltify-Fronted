import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../config/firebase";
import { authService } from "../services/authService";
import { User, AuthContextType } from "../types/auth.types";

//Context dengan nilai default
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

//props untuk AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //helper error
  const getErrorMessage = (errorCode: string): string => {
    if (errorCode.includes("auth/email-already-in-use")) {
      return "Email sudah digunakan. Silakan gunakan email lain.";
    } else if (errorCode.includes("auth/weak-password")) {
      return "Password terlalu lemah. Gunakan minimal 6 karakter.";
    } else if (errorCode.includes("auth/invalid-email")) {
      return "Format email tidak valid.";
    } else if (
      errorCode.includes("auth/user-not-found") ||
      errorCode.includes("auth/wrong-password")
    ) {
      return "Email atau password salah.";
    } else if (errorCode.includes("auth/too-many-requests")) {
      return "Terlalu banyak percobaan login gagal. Coba lagi nanti.";
    }
    return "Terjadi kesalahan. Silakan coba lagi.";
  };

  //funsi untuk login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      await authService.login(email, password);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(getErrorMessage(errorMessage));
      throw err;
    }
  };

  // fungsi untuk register
  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    try {
      setError(null);
      await authService.register(email, password, name);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(getErrorMessage(errorMessage));
      throw err;
    }
  };

  //Fungsi untuk logout
  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await authService.logout();
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError("Terjadi kesalahan saat logout: " + errorMessage);
      throw err;
    }
  };

  //fungsi untuk reset passsword
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setError(null);
      await authService.resetPassword(email);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(getErrorMessage(errorMessage));
      throw err;
    }
  };

  //fungsi untuk mendapatkan daftar device user

  const getUserDevices = async () => {
    if (!currentUser) {
      throw new Error("User tidak terautentikasi");
    }

    try {
     return await authService.getUserDevices(currentUser.uid);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError("agal mengambil data device: " + errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (user) {
          //User login
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          });
        } else {
          // User logged out
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  //nilai yang disediakan context
  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    getUserDevices,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


