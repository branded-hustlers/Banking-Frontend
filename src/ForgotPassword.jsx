import React, { useState } from 'react';

export default function ForgotPassword({ onBackToLogin, onBackToHome, onTryAnotherWay }) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        
        // Clear error when user starts typing
        if (errors.email) {
            setErrors({});
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!email) {
            newErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Password reset requested for:', email);
            setIsSubmitted(true);
        } catch (error) {
            setErrors({ general: 'Failed to send reset email. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-blue-50 flex flex-col">
                {/* Header with Logo/Back Button */}
                <div className="flex items-center p-6">
                    <button
                        onClick={onBackToHome}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Logo</span>
                    </button>
                </div>

                {/* Success Message */}
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-12 w-full max-w-md text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Email Sent!</h1>
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
                                className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Back to Login
                            </button>
                            
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="w-full text-blue-600 hover:text-blue-800 py-2 font-medium transition-colors"
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
        <div className="min-h-screen bg-blue-50 flex flex-col">
            {/* Header with Logo/Back Button */}
            <div className="flex items-center p-6">
                <button
                    onClick={onBackToHome}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">Logo</span>
                </button>
            </div>

            {/* Main Forgot Password Card */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-12 w-full max-w-md">
                    {/* Back to Login Arrow */}
                    <button
                        onClick={onBackToLogin}
                        className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password?</h1>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-8">
                        Please enter your registered work email address below to reset your password.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                placeholder="Email address"
                                className={`w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        {/* Try Another Way Link */}
                        <div className="text-center">
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                onClick={onTryAnotherWay}
                            >
                                Try another way
                            </button>
                        </div>

                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600">{errors.general}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Sending...
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
