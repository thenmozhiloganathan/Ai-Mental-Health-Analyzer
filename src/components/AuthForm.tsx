import React, { useState } from "react";
import { Mail, Lock, User, Brain } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthFormProps {
  mode: "login" | "register";
  onToggleMode: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let success = false;

      if (mode === "login") {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(
          formData.name,
          formData.email,
          formData.password
        );
      }

      if (!success) {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-blue-100 via-white to-teal-100 
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 transition-colors">
      
      <div className="max-w-md w-full">
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 
            bg-gradient-to-tr from-blue-500 to-teal-400 
            rounded-2xl shadow-lg mb-4 animate-bounce">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            AgapeLight
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            A safe space to reflect, relax, and heal
          </p>
        </div>

        {/* Card */}
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 
          rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
          
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === "login" ? "Good to see you again 🌸" : "Join Us 🎉"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {mode === "login"
                ? "Sign in to continue your mental health journey"
                : "Start your journey to better mental health"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={mode === "register"}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 
                      rounded-lg bg-white/70 dark:bg-gray-800/70
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                      transition-all outline-none text-gray-900 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 
                    rounded-lg bg-white/70 dark:bg-gray-800/70
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    transition-all outline-none text-gray-900 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 
                    rounded-lg bg-white/70 dark:bg-gray-800/70
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    transition-all outline-none text-gray-900 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 
                rounded-lg p-3">
                <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-500 
                text-white py-3 px-4 rounded-lg font-medium shadow-md
                hover:from-blue-700 hover:to-teal-600
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-all duration-300 disabled:opacity-50"
            >
              {isLoading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={onToggleMode}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium transition-colors"
            >
              {mode === "login"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
