import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/SideBar.jsx";
import TopNavigation from "./components/TopNavigation.jsx";

const Overview = ({ user, onLogout, onNavigate }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const searchModalRef = useRef(null);

    const handleSidebarToggle = (collapsed) => {
        setSidebarCollapsed(collapsed);
    };

    const openSearchModal = () => {
        setSearchModalOpen(true);
    };

    const closeSearchModal = () => {
        setSearchModalOpen(false);
    };

    const handleNavigationClick = (page) => {
        console.log(`Navigating to: ${page}`);
        if (onNavigate) {
            onNavigate(page);
        }
    };

    // Close search modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
                setSearchModalOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setSearchModalOpen(false);
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
        <div className="flex h-screen bg-blue-50">
            {/* Sidebar */}
            <Sidebar user={user} onLogout={onLogout} onSidebarToggle={handleSidebarToggle} />

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ease-in-out ${
                sidebarCollapsed ? "ml-24" : "ml-72"
            }`}>
                
                {/* Top Navigation Bar */}
                <TopNavigation 
                    user={user} 
                    onLogout={onLogout} 
                    onSearchClick={openSearchModal} 
                />

                {/* Navigation Tabs */}
                <div className="mb-6">
                    <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium">
                            Overview
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Users
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Departments
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Branches
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Services
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Revenue
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Security
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Transactions
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Logs & Reports
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md text-sm font-medium">
                            Notifications
                        </button>
                    </div>
                </div>

                {/* System Overview Section */}
                <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">System Overview</h2>
                    <p className="text-sm text-gray-600 mb-6">Track users, approvals, deposits and withdrawals in real time.</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-5 gap-6">
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Users</h3>
                            <p className="text-2xl font-bold text-gray-800">2,956</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Approvals</h3>
                            <p className="text-2xl font-bold text-gray-800">388</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Deposits</h3>
                            <p className="text-2xl font-bold text-gray-800">17,064</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Withdrawals</h3>
                            <p className="text-2xl font-bold text-gray-800">3,567</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">Security Warnings</h3>
                            <p className="text-2xl font-bold text-red-600">81</p>
                        </div>
                    </div>
                </div>

                {/* Charts and Data Section */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Transactions Chart */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Transactions</h3>
                            <select className="text-xs border border-gray-200 rounded px-2 py-1">
                                <option>This year</option>
                                <option>This month</option>
                                <option>This week</option>
                            </select>
                        </div>
                        <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center">
                            <div className="text-gray-400 text-sm">Transactions Chart</div>
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h3>
                        <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center">
                            <div className="text-gray-400 text-sm">Revenue Pie Chart</div>
                        </div>
                    </div>

                    {/* System Performance */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Performance</h3>
                        <div className="space-y-3">
                            <div className="text-xs text-gray-500 mb-2">API STATUS</div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">GCB MTO Products</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">UnityLink(OTC)</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">MoneyGram(OTC)</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Transfast</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">REMIT on Eagle Pay</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">RIA(OTC)</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Western Union(OTC)</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">A.O.B</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Online</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Tersens Banking Cloud</span>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                        <span className="text-xs text-gray-600">Offline</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Pending Approvals */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
                        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                            <div className="text-gray-400 text-sm">Pending Approvals List</div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
                        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                            <div className="text-gray-400 text-sm">Recent Activities List</div>
                        </div>
                    </div>
                </div>

                {/* Floating Navigation Dots - Right Side */}
                <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => handleNavigationClick('dashboard')}
                            className="w-3 h-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-lg"
                            title="Dashboard"
                        ></button>
                        <button
                            onClick={() => handleNavigationClick('overview')}
                            className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors shadow-lg ring-2 ring-green-300"
                            title="Overview"
                        ></button>
                        <button
                            onClick={() => handleNavigationClick('reports')}
                            className="w-3 h-3 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors shadow-lg"
                            title="Reports"
                        ></button>
                    </div>
                </div>

                {/* Search Modal/Overlay */}
                {searchModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div ref={searchModalRef} className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative">
                            {/* Close Button */}
                            <button
                                onClick={closeSearchModal}
                                className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Search Input */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        autoFocus
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Search Content */}
                            <div className="p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
                                <div className="mb-6">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Find sub banking systems by name and add them to your<br />
                                    homescreen for easy access
                                </p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Overview;
