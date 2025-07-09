import React, { useState } from "react";
import { FaUsers, FaUserTie, FaUniversity, FaUserPlus } from "react-icons/fa";

const UsersSidebar = ({ user, onLogout, onSidebarToggle, selectedFilter, onFilterSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoverTimeout, setHoverTimeout] = useState(null);

    const handleMouseEnter = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        const timeout = setTimeout(() => {
            setIsExpanded(true);
            onSidebarToggle(false);
        }, 200);
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        const timeout = setTimeout(() => {
            setIsExpanded(false);
            onSidebarToggle(true);
        }, 200);
        setHoverTimeout(timeout);
    };

    const usersFilterOptions = [
        { id: 'all', label: 'All Users', icon: <FaUsers /> },
        { id: 'staff', label: 'Staff', icon: <FaUserTie /> },
        { id: 'accountHolders', label: 'Account Holders', icon: <FaUniversity /> },
        { id: 'recentlyRegistered', label: 'Recently Registered', icon: <FaUserPlus /> }
    ];

    return (
        <div 
            className={`fixed left-4 top-4 bottom-4 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col 
                transition-all duration-300 ease-in-out 
                ${isExpanded ? "w-64" : "w-16"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Logo/Header */}
            <div className="mb-6 p-4 flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    U
                </div>
                {isExpanded && (
                    <div className="ml-3 text-xl font-bold text-gray-800">Users</div>
                )}
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
                {/* Filter Options */}
                <div className="mb-6 px-4">
                    {isExpanded && (
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: '#A0A0A0' }}>
                            User Filters
                        </h3>
                    )}
                    <div className="space-y-1">
                        {usersFilterOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => onFilterSelect(option.label)}
                                className={`w-full flex items-center p-2 text-sm rounded-md transition-colors group ${
                                    selectedFilter === option.label
                                        ? 'text-blue-700 bg-blue-100'
                                        : 'text-gray-500'
                                }`}
                                style={{ 
                                    color: selectedFilter === option.label ? '#005B96' : '#A0A0A0',
                                    backgroundColor: selectedFilter === option.label ? '#D8ECF9' : 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedFilter !== option.label) {
                                        e.currentTarget.style.color = '#005B96';
                                        e.currentTarget.style.backgroundColor = '#D8ECF9';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedFilter !== option.label) {
                                        e.currentTarget.style.color = '#A0A0A0';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span className="text-lg" style={{ color: 'inherit' }}>{option.icon}</span>
                                {isExpanded && (
                                    <span className="ml-3" style={{ color: 'inherit' }}>{option.label}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="p-4">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    style={{ color: '#A0A0A0' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#A0A0A0';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'inherit' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {isExpanded && (
                        <span className="ml-3 text-sm" style={{ color: 'inherit' }}>Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default UsersSidebar;
