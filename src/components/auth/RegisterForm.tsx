// src/components/auth/RegisterForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/image-removebg-preview (1).png";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, error, setError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      return;
    }

    if (password.length < 6) {
      setError("Password harus minimal 6 karakter");
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password, name);
      if (onSuccess) onSuccess();
    } catch (err) {
      // Error sudah dihandle di AuthContext
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center h-full px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-15 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-col items-center">
          <img src={logo} alt="" className="w-[85px]" />
          <p className="py-3 text-[#666666] text-xl mb-5">Register</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700">
            {error}
          </div>
        )}

        {/* Form inputs for Name and Email in one line */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label
              className="block text-[#666666] text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#666666] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-[#666666] text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#666666] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        {/* Form inputs for Password and Confirm Password in one line */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label
              className="block text-[#666666] text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#666666] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-[#666666] text-xs font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-[#666666] leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="border-1 w-full mt-4 py-3 rounded-3xl bg-black text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
