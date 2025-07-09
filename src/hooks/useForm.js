import { useState } from 'react';

export const useForm = (initialValues = {}, validators = {}) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
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
        
        Object.keys(validators).forEach(field => {
            const validator = validators[field];
            const value = formData[field];
            
            if (validator.required && (!value || value.trim() === '')) {
                newErrors[field] = validator.requiredMessage || `${field} is required`;
            } else if (value && validator.validate) {
                const customError = validator.validate(value);
                if (customError) {
                    newErrors[field] = customError;
                }
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const setFieldError = (field, error) => {
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    const clearErrors = () => {
        setErrors({});
    };

    const resetForm = () => {
        setFormData(initialValues);
        setErrors({});
        setFocusedField('');
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        focusedField,
        handleInputChange,
        handleFocus,
        handleBlur,
        validateForm,
        setFieldError,
        clearErrors,
        resetForm
    };
};
