// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CheckEmail from "./pages/auth/CheckEmail";
import Home from "./pages/Home";
import DeviceDashboard from "./pages/dashboard/DeviceDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/device/:deviceId"
        element={
          <ProtectedRoute>
            <DeviceDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;