// src/components/auth/LoginForm.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import logo from "../../assets/images/image-removebg-preview (1).png";
import google from "../../assets/images/google.png";
import fb from "../../assets/images/fb.png";
import mail from "../../assets/images/Icons.png";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, setError, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      // Error sudah dihandle di AuthContext
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("email harus diisi dahulu!");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email);
      setError("Link ubah password sudah dikirim ke emailmu!")
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);  // hilangkan error setelah 5 detik
      }, 5000);
  
      return () => clearTimeout(timer);  // bersihkan timer kalau error berubah sebelum 5 detik
    }
  }, [error, setError]);

  return (
    <div className="relative z-10 flex items-center justify-center h-full px-8">
      <div className="bg-white backdrop-blur-md rounded-xl px-10 py-5 text-black shadow-lg flex flex-col">
        <div className=" flex flex-col items-center">
          <img src={logo} alt="" className="w-[85px]" />
          <p className="py-3 text-[#666666] text-xl">
            Unlimited free access to our resource
          </p>
        </div>
        {error && (
          <div className="bg-black/30 shadow-md backdrop-blur-md rounded-xl text-black text-center py-2">
            {error}
          </div>
        )}
        <div className="flex flex-row items-center">
          <div className="flex flex-col flex-1/2 gap-5 pr-3">
            <p className="text-center mt-7 mb-1">Sign Up</p>
            <button className="flex items-center justify-center px-7 py-3 mx-8 border-1 rounded-3xl text-cente transition-transform duration-300 hover:brightness-110 hover:scale-105">
              <img src={google} alt="" className="inline mr-2 mb-0.5 w-5 " />
              Continue with google
            </button>
            <button className="flex items-center justify-center py-3 mx-8 border-1 rounded-3xl text-center transition-transform duration-300 hover:brightness-110 hover:scale-105">
              <img src={fb} alt="" className="inline mr-2 mb-0.5 w-5" />
              Continue with Facebook
            </button>
            <Link
              to="/register"
              className="flex items-center justify-center px-7 py-3 mx-8 border-1 rounded-3xl text-center transition-transform duration-300 hover:brightness-110 hover:scale-105"
            >
              <img src={mail} alt="" className="inline mr-2 mb-0.5 w-5" />
              Sign Up with email
            </Link>
            <p className="text-[#666666] text-xs mx-8 max-w-[250px] text-center">
              By signing up, you agree to the Terms of Service and acknowledge
              you’ve read our Privacy Policy.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1/2">
            <div className="flex flex-col flex-1/2 gap-5 pl-3 w-full">
              <p className="text-center mt-5">Sign in</p>
              <div className="">
                <label htmlFor="email" className="text-[#666666] text-[13px]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="">
                <label
                  className="text-[#666666] text-[13px]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />

                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-[#666666] text-[13px] text-right underline pt-3 hover:text-black"
                >
                  Forgot your password?
                </button>   
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="border-1 mx-20 py-3 rounded-3xl bg-black text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
