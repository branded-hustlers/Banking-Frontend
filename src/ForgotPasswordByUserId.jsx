import React, { useState } from "react";

export default function ForgotPasswordByUserId({
  onBackToLogin,
  onBackToHome,
  onBackToEmailReset,
}) {
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    setUserId(e.target.value);
    if (errors.userId) setErrors({});
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField("");

  const validateForm = () => {
    const newErrors = {};
    if (!userId) newErrors.userId = "User ID is required";
    else if (userId.length < 3)
      newErrors.userId = "User ID must be at least 3 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Password reset requested for User ID:", userId);
      setIsSubmitted(true);
    } catch (error) {
      setErrors({
        general: "Failed to process reset request. Please try again.",
      });
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
          <div className="bg-white rounded-2xl p-10 w-full max-w-lg text-center">
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
                Reset Request Sent!
              </h1>
              <p className="text-gray-600 mb-6">
                We've processed your password reset request for <br />
                <span className="font-medium">{userId}</span>
              </p>
              <p className="text-sm text-gray-500">
                Please contact your system administrator or check your
                registered email for further instructions.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onBackToLogin}
                className="w-52 bg-[#005B96] text-white py-2 rounded-md font-semibold hover:bg-[#00497a] transition"
              >
                Back to Login
              </button>
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-52 text-[#006FBF] hover:underline font-medium text-sm transition"
              >
                Try another User ID
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
            onClick={onBackToEmailReset}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-3 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Back
          </button>

          <h1 className="text-2xl font-bold text-[#333333] mb-4 text-left">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Enter your User ID to receive a new password and reset your
            password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="userId"
                value={userId}
                onChange={handleInputChange}
                onFocus={() => handleFocus("userId")}
                onBlur={handleBlur}
                className={`w-full px-5 pt-5 pb-1 text-sm border rounded-2xl transition-all focus:outline-none ${
                  focusedField === "userId" || userId
                    ? "border-[#005B96]"
                    : "border-gray-300"
                } focus:border-[#005B96]`}
                disabled={isLoading}
              />
              <label
                className={`absolute left-4 transition-all duration-200 pointer-events-none bg-white px-1 text-sm ${
                  focusedField === "userId" || userId
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

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-[#006FBF] hover:underline font-medium"
                onClick={onBackToEmailReset}
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
                    Processing...
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
