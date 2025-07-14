import React, { useState } from "react";

export default function Login({ onLogin, onBackToHome, onForgotPassword }) {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userId) newErrors.userId = "User ID is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (onLogin) onLogin(formData);
    } catch {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E3F4FF] flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <button
          onClick={onBackToHome}
          className="text-[#005B96] font-bold text-lg"
        >
          Logo
        </button>
      </div>

      {/* Centered Login Box */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 w-full max-w-md">
          {" "}
          {/* Increased from max-w-md to max-w-lg */}
          {/* Heading */}
          <h2 className="text-2xl font-bold text-[#333333] mb-6 text-left">
            Log In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User ID */}
            <div className="relative">
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                onFocus={() => handleFocus("userId")}
                onBlur={handleBlur}
                className={`w-full px-4 pt-5 pb-1 text-sm border rounded-2xl transition-all focus:outline-none
                                    ${
                                      focusedField === "userId" ||
                                      formData.userId
                                        ? "border-[#005B96]"
                                        : "border-gray-300"
                                    } focus:border-[#005B96]`}
                disabled={isLoading}
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-[2px] text-sm
                                    ${
                                      focusedField === "userId" ||
                                      formData.userId
                                        ? "top-1 text-xs text-[#005B96]"
                                        : "top-3.5 text-sm text-gray-400"
                                    }`}
              >
                User ID
              </label>
              {errors.userId && (
                <p className="text-sm text-red-600 mt-1">{errors.userId}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                className={`w-full px-4 pt-5 pb-1 text-sm border rounded-2xl transition-all focus:outline-none
                                    ${
                                      focusedField === "password" ||
                                      formData.password
                                        ? "border-[#005B96]"
                                        : "border-gray-300"
                                    } focus:border-[#005B96]`}
                disabled={isLoading}
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-[2px] text-sm
                                    ${
                                      focusedField === "password" ||
                                      formData.password
                                        ? "top-1 text-xs text-[#005B96]"
                                        : "top-3.5 text-sm text-gray-400"
                                    }`}
              >
                Password
              </label>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-left mt-1">
              <button
                type="button"
                className="text-sm text-[#006FBF] hover:underline"
                onClick={onForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
                {errors.general}
              </div>
            )}

            {/* Login Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-52 bg-[#005B96] text-white py-2 rounded-md font-semibold hover:bg-[#00497a] transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
