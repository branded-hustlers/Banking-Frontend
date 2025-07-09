import React from 'react';

const FormField = ({ 
    type = 'text', 
    name, 
    value, 
    onChange, 
    onFocus, 
    onBlur, 
    label, 
    error, 
    disabled = false, 
    focusedField, 
    className = '' 
}) => {
    const isFieldFocused = focusedField === name;
    const hasValue = value && value.length > 0;
    
    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => onFocus && onFocus(name)}
                onBlur={onBlur}
                className={`w-full px-4 pt-6 pb-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-gray-200'
                }`}
                disabled={disabled}
            />
            <label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    hasValue || isFieldFocused
                        ? 'top-2 text-xs text-blue-600' 
                        : 'top-4 text-base text-gray-400'
                }`}
            >
                {label}
            </label>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default FormField;
