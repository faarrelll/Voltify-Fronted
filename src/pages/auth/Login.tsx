import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../components/auth/LayoutAuth";

interface loginState{
  state: boolean;
}

export const Login: React.FC<loginState> = ({state}) => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(state);

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
