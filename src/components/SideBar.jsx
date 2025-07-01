import React, { useState } from "react";
import { 
    FaHome, FaUsers, FaExchangeAlt, FaProjectDiagram, 
    FaTasks, FaCog, FaPiggyBank, FaWarehouse, FaBoxes, FaSignOutAlt, 
    FaStar,
    FaUser
    } from "react-icons/fa";

    const Sidebar = ({ user, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div 
        className={`fixed left-4 top-4 bottom-4 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col 
            transition-all duration-300 ease-in-out 
            ${isCollapsed ? "w-16" : "w-64"}`}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        >
        {/* Logo (Centered, icon-only when collapsed) */}
        <div className="mb-6 p-4 flex justify-center">
            {isCollapsed ? (
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                B
            </div>
            ) : (
            <div className="h-10 w-auto text-xl font-bold text-gray-800">BankLogo</div>
            )}
        </div>

        {/* User Info Section */}
        {!isCollapsed && user && (
            <div className="mb-6 mx-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.userId ? user.userId.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">{user.userId || 'User'}</p>
                        <p className="text-xs text-gray-500">Customer</p>
                    </div>
                </div>
            </div>
        )}

        {/* Directory Section */}
        <div className="mb-6 px-4">
            {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Directory
            </h3>
            )}
            <div className="space-y-1">
            {[
                { name: "Home", icon: <FaHome /> },
                { name: "Interactions", icon: <FaExchangeAlt /> },
                { name: "Customer", icon: <FaUser /> },
                { name: "Workflow", icon: <FaProjectDiagram /> },
                { name: "Tasks", icon: <FaTasks /> },
                { name: "Preferences", icon: <FaStar /> },
            ].map((item) => (
                <button
                key={item.name}
                className="w-full flex items-center p-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </button>
            ))}
            </div>
        </div>

        {/* Recents Section */}
        <div className="mb-6 px-4">
            {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Recents
            </h3>
            )}
            <div className="space-y-1">
            {[
                { name: "Savings", icon: <FaPiggyBank /> },
                { name: "Vault Operations", icon: <FaWarehouse /> },
                { name: "Batches", icon: <FaBoxes /> },
            ].map((item) => (
                <button
                key={item.name}
                className="w-full flex items-center p-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
                </button>
            ))}
            </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto p-4 space-y-1">
            <button className="w-full flex items-center p-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                <FaCog className="text-lg" />
                {!isCollapsed && <span className="ml-3">Settings</span>}
            </button>
            
        </div>
        </div>
    );
};

export default Sidebar;