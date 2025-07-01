import React, { useState } from 'react';

const Sidebar = ({ user, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'accounts', label: 'Accounts', icon: '🏦' },
        { id: 'transfers', label: 'Transfers', icon: '💸' },
        { id: 'payments', label: 'Payments', icon: '💳' },
        { id: 'loans', label: 'Loans', icon: '📄' },
        { id: 'reports', label: 'Reports', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className={`bg-blue-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            {/* Header */}
            <div className="p-4 border-b border-blue-800">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div>
                            <h2 className="text-xl font-bold">NTech Bank</h2>
                            <p className="text-blue-200 text-sm">Banking System</p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                        <svg 
                            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* User Info */}
            {!isCollapsed && user && (
                <div className="p-4 border-b border-blue-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                                {user.userId ? user.userId.charAt(0).toUpperCase() : 'U'}
                            </span>
                        </div>
                        <div>
                            <p className="font-medium">{user.userId || 'User'}</p>
                            <p className="text-blue-200 text-sm">Customer</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800 transition-colors text-left"
                                title={isCollapsed ? item.label : ''}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!isCollapsed && <span>{item.label}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-blue-800">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-600 transition-colors text-left"
                    title={isCollapsed ? 'Logout' : ''}
                >
                    <span className="text-lg">🚪</span>
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
