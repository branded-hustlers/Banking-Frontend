import React from 'react';
import { Modal } from '../common/Modal.jsx';

const FilterModal = ({ isOpen, onClose, filterOptions, onFilterChange }) => {
    const filterCategories = [
        {
            title: 'User Types',
            key: 'users',
            options: [
                { key: 'staff', label: 'Staff' },
                { key: 'accountHolders', label: 'Account Holders' },
                { key: 'recentlyRegistered', label: 'Recently Registered' }
            ]
        },
        {
            title: 'Status',
            key: 'status',
            options: [
                { key: 'activeUsers', label: 'Active Users' },
                { key: 'suspendedUsers', label: 'Suspended Users' },
                { key: 'blacklistedUsers', label: 'Blacklisted Users' },
                { key: 'pendingUsers', label: 'Pending Users' }
            ]
        },
        {
            title: 'Departments',
            key: 'departments',
            options: [
                { key: 'executiveManagement', label: 'Executive Management' },
                { key: 'customerServiceFrontOffice', label: 'Customer Service (Front Office)' },
                { key: 'operationsBackOffice', label: 'Operations (Back Office)' },
                { key: 'informationTechnology', label: 'Information Technology' },
                { key: 'complianceAndRisk', label: 'Compliance and Risk' },
                { key: 'humanResources', label: 'Human Resources' },
                { key: 'financeAndAccounting', label: 'Finance and Accounting' },
                { key: 'marketingAndBusinessDevelopment', label: 'Marketing and Business Development' },
                { key: 'legalAndDocumentation', label: 'Legal and Documentation' },
                { key: 'auditAndInternalControl', label: 'Audit and Internal Control' }
            ]
        }
    ];

    const handleApplyFilters = () => {
        onClose();
    };

    const handleClearFilters = () => {
        filterCategories.forEach(category => {
            category.options.forEach(option => {
                if (filterOptions[category.key][option.key]) {
                    onFilterChange(category.key, option.key);
                }
            });
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Filter Users</h2>
                
                <div className="space-y-6">
                    {filterCategories.map((category) => (
                        <div key={category.key}>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">{category.title}</h3>
                            <div className="space-y-2">
                                {category.options.map((option) => (
                                    <label 
                                        key={option.key}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filterOptions[category.key][option.key] || false}
                                            onChange={() => onFilterChange(category.key, option.key)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleClearFilters}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handleApplyFilters}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default FilterModal;
