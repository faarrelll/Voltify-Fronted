// src/pages/auth/Register.tsx
import React from "react";
import { useNavigate} from "react-router";
import RegisterForm from "../../components/auth/RegisterForm";
import AuthLayout from "../../components/auth/LayoutAuth";
const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/");
  };

  return (
    <AuthLayout showForm={true} onShowForm={() => {}} state={false}>
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </AuthLayout>
  );
};

export default Register;
