import React, { useState } from 'react';

export default function Login({ onLogin, onBackToHome, onForgotPassword }) {
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFocus = (fieldName) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField('');
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.userId) {
            newErrors.userId = 'User ID is required';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, accept any valid userId/password
            console.log('Login attempt:', formData);
            
            if (onLogin) {
                onLogin(formData);
            }
        } catch (error) {
            setErrors({ general: 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

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

            {/* Main Login Card */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-12 w-full max-w-md">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-12">Log In</h1>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* User ID Field */}
                        <div className="relative">
                            <input
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('userId')}
                                onBlur={handleBlur}
                                className={`w-full px-4 pt-6 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.userId ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                                }`}
                                disabled={isLoading}
                            />
                            <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                formData.userId || focusedField === 'userId'
                                    ? 'top-2 text-xs text-blue-600' 
                                    : 'top-4 text-base text-gray-400'
                            }`}>
                                User ID
                            </label>
                            {errors.userId && (
                                <p className="mt-1 text-sm text-red-600">{errors.userId}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={handleBlur}
                                className={`w-full px-4 pt-6 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                                }`}
                                disabled={isLoading}
                            />
                            <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                formData.password || focusedField === 'password'
                                    ? 'top-2 text-xs text-blue-600' 
                                    : 'top-4 text-base text-gray-400'
                            }`}>
                                Password
                            </label>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-left">
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                                onClick={onForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600">{errors.general}</p>
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
