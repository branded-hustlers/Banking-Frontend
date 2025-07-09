import React, { useState, useRef, useEffect } from "react";

const TopNavigation = ({ user, onLogout, onSearchClick }) => {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleDropdownOptionClick = (option) => {
        setProfileDropdownOpen(false);
        if (option === 'logout') {
            onLogout();
        }
        // Handle other options as needed
        console.log(`Selected: ${option}`);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <header className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        onClick={onSearchClick}
                        readOnly
                        className="block w-80 pl-10 pr-3 py-2 border-0 bg-white rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded text-xs text-gray-600">
                        <span></span>
                        <span>2024-01-22</span>
                    </div>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded text-xs text-gray-600">
                        <span></span>
                        <span>06:00:01</span>
                    </div>
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={toggleProfileDropdown}
                        className="flex items-center space-x-3 px-3 py-2 bg-white rounded-lg border border-gray-200 transition-colors hover:shadow-md"
                        style={{ 
                            backgroundColor: profileDropdownOpen ? '#005B96' : '#FFFFFF'
                        }}
                        onMouseEnter={(e) => {
                            if (!profileDropdownOpen) {
                                e.currentTarget.style.backgroundColor = '#005B96';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!profileDropdownOpen) {
                                e.currentTarget.style.backgroundColor = '#FFFFFF';
                            }
                        }}
                    >
                        {/* Profile Image/Avatar */}
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            <img 
                                src="gcb-logo.png" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Dropdown Arrow */}
                        <svg 
                            className={`w-4 h-4 transition-all duration-200 ${
                                profileDropdownOpen ? 'rotate-180' : ''
                            }`}
                            style={{ 
                                color: profileDropdownOpen ? '#FFFFFF' : '#9CA3AF'
                            }}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {profileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <button
                                onClick={() => handleDropdownOptionClick('account')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                My Account
                            </button>
                            <button
                                onClick={() => handleDropdownOptionClick('support')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Help & Support
                            </button>
                            <hr className="my-1 border-gray-200" />
                            <button
                                onClick={() => handleDropdownOptionClick('logout')}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopNavigation;