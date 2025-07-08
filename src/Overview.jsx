import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/SideBar.jsx";
import TopNavigation from "./components/TopNavigation.jsx";

const Overview = ({ user, onLogout, onNavigate }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const searchModalRef = useRef(null);
    const sortDropdownRef = useRef(null);

    const handleSidebarToggle = (collapsed) => {
        setSidebarCollapsed(collapsed);
    };

    const openSearchModal = () => {
        setSearchModalOpen(true);
    };

    const closeSearchModal = () => {
        setSearchModalOpen(false);
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    };

    const closeSortDropdown = () => {
        setSortDropdownOpen(false);
    };

    const handleSortOption = (option) => {
        console.log(`Selected sort option: ${option}`);
        closeSortDropdown();
        // Here you can implement the actual sorting logic
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
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setSortDropdownOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setSearchModalOpen(false);
                setSortDropdownOpen(false);
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
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'overview' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'users' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Users
                        </button>
                        <button 
                            onClick={() => setActiveTab('departments')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'departments' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Departments
                        </button>
                        <button 
                            onClick={() => setActiveTab('branches')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'branches' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Branches
                        </button>
                        <button 
                            onClick={() => setActiveTab('services')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'services' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Services
                        </button>
                        <button 
                            onClick={() => setActiveTab('revenue')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'revenue' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Revenue
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'security' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Security
                        </button>
                        <button 
                            onClick={() => setActiveTab('transactions')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'transactions' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Transactions
                        </button>
                        <button 
                            onClick={() => setActiveTab('logs')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'logs' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Logs & Reports
                        </button>
                        <button 
                            onClick={() => setActiveTab('notifications')}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                activeTab === 'notifications' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            Notifications
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <>
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
                <div className="grid grid-cols-3 gap-6">
                    {/* Pending Approvals - Takes up 2 columns */}
                    <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Pending Approvals</h3>
                            <p className="text-sm text-gray-500">View loan requests, high-value transfers, or any approvals pending admin action</p>
                        </div>
                        
                        <div className="w-full">
                            <table className="w-full text-xs">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ID</th>
                                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">User</th>
                                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">Type</th>
                                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Amount</th>
                                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Status</th>
                                        <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-2 py-2 text-xs text-gray-900">REQ001</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">
                                            <div className="truncate" title="Nana Yaw Osei Appomasu Assante">Nana Yaw Osei...</div>
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900">Loan Request</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">15,000</td>
                                        <td className="px-2 py-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 text-xs">
                                            <div className="flex space-x-1">
                                                <button className="text-green-600 hover:text-green-900" title="Approve">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                                <button className="text-red-600 hover:text-red-900" title="Reject">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-xs text-gray-900">REQ002</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">
                                            <div className="truncate" title="Aloma Serwaa Boateng">Aloma Serwaa...</div>
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900">Credit Card App</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">5,500</td>
                                        <td className="px-2 py-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 text-xs">
                                            <div className="flex space-x-1">
                                                <button className="text-green-600 hover:text-green-900" title="Approve">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                                <button className="text-red-600 hover:text-red-900" title="Reject">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-xs text-gray-900">REQ003</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">
                                            <div className="truncate" title="Kofi Owusu Mensah">Kofi Owusu...</div>
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900">Transfer</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">25,000</td>
                                        <td className="px-2 py-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 text-xs">
                                            <div className="flex space-x-1">
                                                <button className="text-green-600 hover:text-green-900" title="Approve">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                                <button className="text-red-600 hover:text-red-900" title="Reject">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-xs text-gray-900">REQ004</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">
                                            <div className="truncate" title="Akosua Adjei Danso">Akosua Adjei...</div>
                                        </td>
                                        <td className="px-2 py-2 text-xs text-gray-900">Transfer</td>
                                        <td className="px-2 py-2 text-xs text-gray-900">2,500</td>
                                        <td className="px-2 py-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1"></div>
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-2 py-2 text-xs">
                                            <div className="flex space-x-1">
                                                <button className="text-green-600 hover:text-green-900" title="Approve">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                                <button className="text-red-600 hover:text-red-900" title="Reject">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Activities - Takes up 1 column */}
                    <div className="col-span-1 bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                            <p className="text-sm text-gray-500">View user activities, flagged activities, departmental changes or updates</p>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">New user added to system</p>
                                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Details</button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">3 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Multiple failed login attempts detected</p>
                                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Details</button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">7 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Samuel Obeng logged in from Accra, Ghana</p>
                                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Details</button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Grace Adjoa updated her profile information</p>
                                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Details</button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">GHC5000 transferred from ACC: 1920239910 to...</p>
                                        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Details</button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </>
                )}

                {/* Users Tab Content */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        {/* Users Page Header */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Rows</span>
                                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                    <option>7</option>
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                </select>
                            </div>
                                <div className="flex items-center space-x-2">
                                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                        Filter
                                    </button>
                                    <div className="relative" ref={sortDropdownRef}>
                                        <button 
                                            onClick={toggleSortDropdown}
                                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center space-x-1"
                                        >
                                            <span>Sort by</span>
                                            <svg className={`w-4 h-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        {sortDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleSortOption('User ID/Acc. No.')}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        User ID/Acc. No.
                                                    </button>
                                                    <button
                                                        onClick={() => handleSortOption('Full Name')}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Full Name
                                                    </button>
                                                    <button
                                                        onClick={() => handleSortOption('Role')}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Role
                                                    </button>
                                                    <button
                                                        onClick={() => handleSortOption('Branch')}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Branch
                                                    </button>
                                                    <hr className="my-1 border-gray-200" />
                                                    <button
                                                        onClick={() => handleSortOption('Ascending')}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Ascending
                                                    </button>
                                                    <button
                                                        onClick={() => handleSortOption('Descending')}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Descending
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                                        New User
                                    </button>
                                </div>
                            </div>
                            
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID/ Acc. No.</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">102403008556</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Quateah, Ewuraba</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Super Admin</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Kumasi Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">ewurabaquateah@gmail.com</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0500877524</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">102401923617</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Agyeman, Kwame</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Account Holder</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Kumasi Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">kwameagyeman@gmail.com</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0501234567</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">192229376812</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Mensah, Akosua</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">System Administrator</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Kumasi Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">akosuamensah@gcb.com.gh</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0567654321</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">103407412540</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Boateng, Michael</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Account Holder</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Kumasi Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">michaelboateng78@gmail.com</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0247896541</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">180788269541</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Owusu, Lydia</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Auditor</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Takoradi Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                                                Blacklisted
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">lydiaowusu@gcb.com.gh</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0550012345</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">174449184532</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Frimpong, Nana Yaw</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Teller</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Tamale Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">nanayawfrimpong@gcb.com.gh</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0201122334</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">165019376124</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Dankwa, Grace</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Software Developer</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Tamale Branch</td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">gracedankwa@gcb.com.gh</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">0509988776</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-700">
                                Showing 1 - 7 of 2,956 results
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                                    &lt;
                                </button>
                                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
                                    1
                                </button>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    2
                                </button>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    3
                                </button>
                                <span className="px-3 py-1 text-sm text-gray-500">...</span>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    423
                                </button>
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
