import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../components/auth/LayoutAuth";



export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return (
    <AuthLayout showForm={showLoginForm} onShowForm={setShowLoginForm} state>
      <LoginForm onSuccess={handleLoginSuccess} />
    </AuthLayout>
  );
};

export default Login;
