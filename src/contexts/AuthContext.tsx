import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../config/firebase";
import { authService } from "../services/authService";
import { socialAuthService } from "../services/socialAuthService";
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

  // Helper error yang lebih comprehensive
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string => {
    const errorCode = error.code || error.message || error;
    
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email ini sudah terdaftar. Silakan gunakan email lain atau coba login.";
      case "auth/weak-password":
        return "Password terlalu lemah. Gunakan minimal 6 karakter dengan kombinasi huruf dan angka.";
      case "auth/invalid-email":
        return "Format email tidak valid. Mohon periksa kembali email Anda.";
      case "auth/user-not-found":
        return "Email tidak terdaftar. Silakan daftar terlebih dahulu.";
      case "auth/wrong-password":
        return "Password salah. Silakan coba lagi.";
      case "auth/too-many-requests":
        return "Terlalu banyak percobaan login gagal. Coba lagi dalam beberapa menit.";
      case "auth/network-request-failed":
        return "Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.";
      case "auth/operation-not-allowed":
        return "Operasi ini tidak diizinkan. Hubungi administrator.";
      case "auth/user-disabled":
        return "Akun ini telah dinonaktifkan. Hubungi administrator.";
      case "auth/popup-closed-by-user":
        return "Login dibatalkan. Popup ditutup sebelum login selesai.";
      case "auth/account-exists-with-different-credential":
        return "Email ini sudah terdaftar dengan metode login yang berbeda.";
      case "auth/popup-blocked":
        return "Popup diblokir oleh browser. Izinkan popup untuk melanjutkan.";
      default:
        if (errorCode.includes("auth/")) {
          return `Error: ${errorCode.replace("auth/", "").replace(/-/g, " ")}`;
        }
        return "Terjadi kesalahan. Silakan coba lagi.";
    }
  };

  //funsi untuk login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      await authService.login(email, password);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
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
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    }
  };

  //Fungsi untuk logout
  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await authService.logout();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
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
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    }
  };

  // Fungsi untuk login dengan Google
  const loginWithGoogle = async (): Promise<void> => {
    try {
      setError(null);
      await socialAuthService.loginWithGoogle();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    }
  };

  // Fungsi untuk login dengan Facebook
  const loginWithFacebook = async (): Promise<void> => {
    try {
      setError(null);
      await socialAuthService.loginWithFacebook();
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
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
      const errorMessage = getErrorMessage(err);
      setError("Gagal mengambil data device: " + errorMessage);
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
    loginWithGoogle,
    loginWithFacebook,
    getUserDevices,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};