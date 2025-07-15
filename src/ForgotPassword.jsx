import React, { useState } from "react";

export default function ForgotPassword({
  onBackToLogin,
  onBackToHome,
  onTryAnotherWay,
}) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({});
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password reset requested for:", email);
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ general: "Failed to send reset email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#E3F4FF] flex flex-col">
        <div className="p-6">
          <button
            onClick={onBackToHome}
            className="text-[#005B96] font-bold text-lg"
          >
            Logo
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-10 w-full max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Email Sent!
              </h1>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to <br />
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onBackToLogin}
                className="w-52 mx-auto bg-[#005B96] text-white py-2 rounded-md font-semibold hover:bg-[#00497a] transition"
              >
                Back to Login
              </button>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-52 mx-auto text-[#006FBF] hover:underline font-medium text-sm transition"
              >
                Try another email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E3F4FF] flex flex-col">
      <div className="p-6">
        <button
          onClick={onBackToHome}
          className="text-[#005B96] font-bold text-lg"
        >
          Logo
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 w-full max-w-md">
          <button
            onClick={onBackToLogin}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-3 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h1 className="text-2xl font-bold text-[#333333] mb-4 text-left">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Please enter your registered work email address below to reset your
            password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className={`w-full px-5 pt-5 pb-1 text-sm border rounded-2xl transition-all focus:outline-none ${
                  focusedField === "email" || email
                    ? "border-[#005B96]"
                    : "border-gray-300"
                } focus:border-[#005B96]`}
                disabled={isLoading}
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1 text-sm ${
                  focusedField === "email" || email
                    ? "top-1 text-xs text-[#005B96]"
                    : "top-3.5 text-sm text-gray-400"
                }`}
              >
                Email address
              </label>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-[#006FBF] hover:underline"
                onClick={onTryAnotherWay}
              >
                Try another way
              </button>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
                {errors.general}
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-52 bg-[#005B96] text-white py-2 rounded-md font-semibold hover:bg-[#00497a] transition disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
