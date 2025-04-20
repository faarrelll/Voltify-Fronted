import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router";
import logo from "../../assets/images/image-removebg-preview (1).png";
import bg from "../../assets/images/Rectangle 5.png";

interface AuthLayoutProps {
  showForm: boolean;
  onShowForm: (state: boolean) => void;
  state: boolean;
  children: React.ReactNode;
}

const LayoutAuth: React.FC<AuthLayoutProps> = ({
  showForm,
  onShowForm,
  state,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar Auth */}
      <div className="w-full h-16 bg-white flex flex-row justify-between items-center pl-6 pr-6">
        <div className="flex flex-row justify-center items-center gap-5">
          <img src={logo} alt="Logo" className="w-[40px]" />
        </div>
        <div className="flex flex-row justify-center items-center gap-8">
          <select
            id="dropdown"
            className="border-none bg-transparent text-gray-700 px-4 py-2 focus:outline-none focus:ring-0"
          >
            <option value="option1">English (United State)</option>
            <option value="option2">Indonesia</option>
          </select>
          {state ? (
            <button
              onClick={() => onShowForm(true)} // Menampilkan form jika onShowForm ada
              className="border border-black text-black px-4 py-2 rounded-xl transition-all duration-300 hover:bg-black hover:text-white"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")} // Menavigasi ke halaman login jika state false
              className="border border-none text-blue-400 px-4 py-2 rounded-xl  transition-transform duration-300 hover:brightness-110 hover:scale-105"
            >
              Already Have Account?
            </button>
          )}
        </div>
      </div>

      {/* Hero Section / Form Section */}
      <div className="flex-1 relative overflow-hidden">
        <img
          src={bg}
          alt="Background"
          className="absolute inset-0 w-full h-full z-0 object-cover md:object-fill"
        />
        <AnimatePresence>
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex items-center justify-center md:justify-start h-full px-8"
            >
              <div className="bg-white/30 backdrop-blur-md rounded-xl px-10 py-36 max-w-lg text-black shadow-lg">
                <h1 className="text-3xl font-bold mb-4">
                  Stabilize your system, simplify your life.
                </h1>
                <p className="mb-6 text-md">
                Unlock efficiency and peace of mind.
                Manage your projects smarter, faster, and stress-free.
                </p>
                <Link
                  to={"/register"}
                  className="bg-black text-white px-6 py-2 rounded-full transition-transform duration-300 hover:brightness-110 hover:scale-105"
                >
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LayoutAuth;
