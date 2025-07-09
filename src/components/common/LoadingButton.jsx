import React from 'react';

const LoadingButton = ({ 
    isLoading = false, 
    loadingText = 'Loading...', 
    children, 
    type = 'button',
    className = '',
    disabled = false,
    ...props 
}) => {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={`flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {isLoading ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default LoadingButton;
