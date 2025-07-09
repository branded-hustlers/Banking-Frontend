import React from 'react';

const ErrorMessage = ({ message, className = '' }) => {
    if (!message) return null;
    
    return (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}>
            <p className="text-sm text-red-600">{message}</p>
        </div>
    );
};

export default ErrorMessage;
