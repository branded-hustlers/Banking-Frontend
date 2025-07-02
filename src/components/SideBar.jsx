import React, { useState } from "react";
import { 
    FaHome, FaUsers, FaExchangeAlt, FaProjectDiagram, 
    FaTasks, FaCog, FaPiggyBank, FaWarehouse, FaBoxes, FaSignOutAlt, 
    FaStar,
    FaUser
    } from "react-icons/fa";

    const Sidebar = ({ user, onLogout, onSidebarToggle }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleMouseEnter = () => {
        setIsCollapsed(false);
        onSidebarToggle?.(false);
    };

    const handleMouseLeave = () => {
        setIsCollapsed(true);
        onSidebarToggle?.(true);
    };

    return (
        <div 
        className={`fixed left-4 top-4 bottom-4 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col 
            transition-all duration-300 ease-in-out 
            ${isCollapsed ? "w-16" : "w-64"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        {/* Logo (B icon with N-Tech text when expanded) */}
        <div className="mb-6 p-4 flex items-center justify-center">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                B
            </div>
            {!isCollapsed && (
                <div className="ml-3 text-xl font-bold text-gray-800">N-Tech</div>
            )}
        </div>



        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
            {/* Directory Section */}
            <div className="mb-6 px-4">
                {!isCollapsed && (
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: '#A0A0A0' }}>
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
                    className="w-full flex items-center p-2 text-sm rounded-md transition-colors group"
                    style={{ color: '#A0A0A0' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#005B96';
                        e.currentTarget.style.backgroundColor = '#D8ECF9';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#A0A0A0';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    >
                    <span className="text-lg" style={{ color: 'inherit' }}>{item.icon}</span>
                    {!isCollapsed && <span className="ml-3" style={{ color: 'inherit' }}>{item.name}</span>}
                    </button>
                ))}
                </div>
            </div>

            {/* Recents Section */}
            <div className="mb-6 px-4">
                {!isCollapsed && (
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: '#A0A0A0' }}>
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
                    className="w-full flex items-center p-2 text-sm rounded-md transition-colors group"
                    style={{ color: '#A0A0A0' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#005B96';
                        e.currentTarget.style.backgroundColor = '#D8ECF9';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#A0A0A0';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    >
                    <span className="text-lg" style={{ color: 'inherit' }}>{item.icon}</span>
                    {!isCollapsed && <span className="ml-3" style={{ color: 'inherit' }}>{item.name}</span>}
                    </button>
                ))}
                </div>
            </div>
        </div>

        {/* Fixed Bottom Settings Button */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100">
            <button 
                className="w-full flex items-center p-2 text-sm rounded-md transition-colors"
                style={{ color: '#A0A0A0' }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#005B96';
                    e.currentTarget.style.backgroundColor = '#D8ECF9';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A0A0A0';
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                <FaCog className="text-lg" style={{ color: 'inherit' }} />
                {!isCollapsed && <span className="ml-3" style={{ color: 'inherit' }}>Settings</span>}
            </button>
        </div>
        </div>
    );
};

export default Sidebar;