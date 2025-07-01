import React from "react";
import Sidebar from "./components/SideBar.jsx"; // Import from components folder with correct filename

const MainDashboard = ({ user, onLogout }) => {
    return (
        <div className="flex h-screen bg-blue-50">
        {/* Sidebar (fixed positioned) */}
        <Sidebar user={user} onLogout={onLogout} />

        {/* Main Content Area (with left margin to account for floating sidebar) */}
        <div className="flex-1 overflow-y-auto p-6 ml-24">
            {/* Top Navigation Bar */}
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
                            className="block w-80 pl-10 pr-3 py-2 border-0 bg-white rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded text-xs text-gray-600">
                            <span>📊</span>
                            <span>000</span>
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded text-xs text-gray-600">
                            <span>📅</span>
                            <span>2024-01-22</span>
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 bg-white rounded text-xs text-gray-600">
                            <span>⏰</span>
                            <span>06:00:01</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            {user?.userId ? user.userId.charAt(0).toUpperCase() : 'U'}
                        </span>
                    </div>
                </div>
            </header>

        </div>
        </div>
    );
};

export default MainDashboard;