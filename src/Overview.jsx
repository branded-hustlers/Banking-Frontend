import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/SideBar.jsx";
import TopNavigation from "./components/TopNavigation.jsx";
import { FaUsers, FaUserTie, FaUniversity, FaUserPlus } from "react-icons/fa";

// Users Sidebar Component
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

const Overview = ({ user, onLogout, onNavigate }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const [usersSidebarCollapsed, setUsersSidebarCollapsed] = useState(true);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [selectedUsersFilter, setSelectedUsersFilter] = useState('All Users');
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [filterOptions, setFilterOptions] = useState({
        users: {
            staff: false,
            accountHolders: false,
            recentlyRegistered: false
        },
        status: {
            activeUsers: false,
            suspendedUsers: false,
            blacklistedUsers: false,
            pendingUsers: false
        },
        departments: {
            executiveManagement: false,
            customerServiceFrontOffice: false,
            loansCredit: false,
            salesMarketing: false,
            productStrategy: false,
            riskAuditCompliance: false,
            itSystems: false,
            transactionProcessingBackOffice: false,
            internationalBanking: false,
            accountManagement: false
        }
    });
    const searchModalRef = useRef(null);
    const sortDropdownRef = useRef(null);
    const filterModalRef = useRef(null);

    const handleSidebarToggle = (collapsed) => {
        setSidebarCollapsed(collapsed);
    };

    const handleUsersSidebarToggle = (collapsed) => {
        setUsersSidebarCollapsed(collapsed);
    };

    const handleUsersFilterSelect = (filter) => {
        setSelectedUsersFilter(filter);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
    };

    // Sample users data
    const usersData = [
        { id: "102403008556", name: "Quateah, Ewuraba", role: "Super Admin", branch: "Kumasi Branch", status: "Active", email: "ewurabaquateah@gmail.com", phone: "0500877524" },
        { id: "102401923617", name: "Agyeman, Kwame", role: "Account Holder", branch: "Kumasi Branch", status: "Active", email: "kwameagyeman@gmail.com", phone: "0501234567" },
        { id: "192229376812", name: "Mensah, Akosua", role: "System Administrator", branch: "Kumasi Branch", status: "Active", email: "akosuamensah@gcb.com.gh", phone: "0567654321" },
        { id: "103407412540", name: "Boateng, Michael", role: "Account Holder", branch: "Kumasi Branch", status: "Active", email: "michaelboateng78@gmail.com", phone: "0247896541" },
        { id: "180788269541", name: "Owusu, Lydia", role: "Auditor", branch: "Takoradi Branch", status: "Blacklisted", email: "lydiaowusu@gcb.com.gh", phone: "0550012345" },
        { id: "174449184532", name: "Frimpong, Nana Yaw", role: "Teller", branch: "Tamale Branch", status: "Active", email: "nanayawfrimpong@gcb.com.gh", phone: "0201122334" },
        { id: "165019376124", name: "Dankwa, Grace", role: "Software Developer", branch: "Tamale Branch", status: "Active", email: "gracedankwa@gcb.com.gh", phone: "0509988776" },
        { id: "156789432112", name: "Asante, Kofi", role: "Manager", branch: "Accra Branch", status: "Active", email: "kofiasante@gcb.com.gh", phone: "0244567890" },
        { id: "143256789098", name: "Adjei, Ama", role: "Customer Service", branch: "Tema Branch", status: "Active", email: "amaadjei@gcb.com.gh", phone: "0266789012" },
        { id: "198765432156", name: "Osei, Samuel", role: "Account Holder", branch: "Cape Coast Branch", status: "Suspended", email: "samuelosei@gmail.com", phone: "0277890123" }
    ];

    // Get displayed users based on rowsPerPage
    const displayedUsers = usersData.slice(0, rowsPerPage);

    // Helper function to render status badge
    const renderStatusBadge = (status) => {
        const statusConfig = {
            'Active': { bgColor: 'bg-green-100', textColor: 'text-green-800', dotColor: 'bg-green-500' },
            'Blacklisted': { bgColor: 'bg-red-100', textColor: 'text-red-800', dotColor: 'bg-red-500' },
            'Suspended': { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', dotColor: 'bg-yellow-500' },
            'Pending': { bgColor: 'bg-gray-100', textColor: 'text-gray-800', dotColor: 'bg-gray-500' }
        };

        const config = statusConfig[status] || statusConfig['Active'];

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                <div className={`w-2 h-2 ${config.dotColor} rounded-full mr-1`}></div>
                {status}
            </span>
        );
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

    const openFilterModal = () => {
        setFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setFilterModalOpen(false);
    };

    const handleFilterChange = (category, option) => {
        setFilterOptions(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [option]: !prev[category][option]
            }
        }));
    };

    const applyFilters = () => {
        console.log('Applying filters:', filterOptions);
        // Here you can implement the actual filtering logic
        closeFilterModal();
    };

    const clearFilters = () => {
        setFilterOptions({
            users: {
                staff: false,
                accountHolders: false,
                recentlyRegistered: false
            },
            status: {
                activeUsers: false,
                suspendedUsers: false,
                blacklistedUsers: false,
                pendingUsers: false
            },
            departments: {
                executiveManagement: false,
                customerServiceFrontOffice: false,
                loansCredit: false,
                salesMarketing: false,
                productStrategy: false,
                riskAuditCompliance: false,
                itSystems: false,
                transactionProcessingBackOffice: false,
                internationalBanking: false,
                accountManagement: false
            }
        });
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
            if (filterModalRef.current && !filterModalRef.current.contains(event.target)) {
                setFilterModalOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setSearchModalOpen(false);
                setSortDropdownOpen(false);
                setFilterModalOpen(false);
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
            {activeTab === 'users' ? (
                <UsersSidebar 
                    user={user} 
                    onLogout={onLogout} 
                    onSidebarToggle={handleUsersSidebarToggle}
                    selectedFilter={selectedUsersFilter}
                    onFilterSelect={handleUsersFilterSelect}
                />
            ) : (
                <Sidebar user={user} onLogout={onLogout} onSidebarToggle={handleSidebarToggle} />
            )}

            {/* Main Content Area */}
            <div className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
                activeTab === 'users' 
                    ? (usersSidebarCollapsed ? "ml-24" : "ml-72")
                    : (sidebarCollapsed ? "ml-24" : "ml-72")
            } ${activeTab === 'users' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                
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
                    <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col h-[calc(100vh-200px)]">
                        {/* Users Page Header - Fixed */}
                        <div className="flex-shrink-0 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{selectedUsersFilter}</h2>
                                    <span className="text-sm text-gray-500">
                                        {selectedUsersFilter === 'All Users' ? 'Showing all users in the system' :
                                        selectedUsersFilter === 'Staff' ? 'Showing staff members only' :
                                        selectedUsersFilter === 'Account Holders' ? 'Showing account holders only' :
                                        'Showing recently registered users'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Rows</span>
                                <select 
                                    value={rowsPerPage} 
                                    onChange={handleRowsPerPageChange}
                                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                                >
                                    <option value={3}>3</option>
                                    <option value={5}>5</option>
                                    <option value={7}>7</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                </select>
                            </div>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={openFilterModal}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                                    >
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

                        {/* Users Table Container - Flexible */}
                        <div className="flex flex-col flex-1 min-h-0">
                            {/* Table Header - Fixed */}
                            <div className="flex-shrink-0 overflow-x-auto">
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
                                </table>
                            </div>

                            {/* Scrollable Table Body */}
                            <div className="flex-1 overflow-y-auto min-h-0">
                                <table className="w-full text-sm">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {displayedUsers.map((user, index) => (
                                            <tr key={user.id}>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.branch}</td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {renderStatusBadge(user.status)}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Fixed Pagination */}
                            <div className="flex-shrink-0 flex items-center justify-between mt-6 pt-4 border-t border-gray-200 bg-white">
                                <div className="text-sm text-gray-700">
                                    Showing 1 - {displayedUsers.length} of {usersData.length} results
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

                {/* Filter Modal */}
                {filterModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div ref={filterModalRef} className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
                                <button
                                    onClick={closeFilterModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 space-y-4">
                                {/* Filter by Users */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Users</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.users.staff}
                                                onChange={() => handleFilterChange('users', 'staff')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Staff</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.users.accountHolders}
                                                onChange={() => handleFilterChange('users', 'accountHolders')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Account Holders</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.users.recentlyRegistered}
                                                onChange={() => handleFilterChange('users', 'recentlyRegistered')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Recently Registered</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Filter by Status */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Status</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.status.activeUsers}
                                                onChange={() => handleFilterChange('status', 'activeUsers')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Active Users</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.status.suspendedUsers}
                                                onChange={() => handleFilterChange('status', 'suspendedUsers')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Suspended Users</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.status.blacklistedUsers}
                                                onChange={() => handleFilterChange('status', 'blacklistedUsers')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Blacklisted Users</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.status.pendingUsers}
                                                onChange={() => handleFilterChange('status', 'pendingUsers')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Pending Users</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Filter by Departments */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Departments</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.executiveManagement}
                                                onChange={() => handleFilterChange('departments', 'executiveManagement')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Executive & Management</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.customerServiceFrontOffice}
                                                onChange={() => handleFilterChange('departments', 'customerServiceFrontOffice')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Customer Service & Front Office</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.loansCredit}
                                                onChange={() => handleFilterChange('departments', 'loansCredit')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Loans & Credit</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.salesMarketing}
                                                onChange={() => handleFilterChange('departments', 'salesMarketing')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Sales & Marketing</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.productStrategy}
                                                onChange={() => handleFilterChange('departments', 'productStrategy')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Product & Strategy</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.riskAuditCompliance}
                                                onChange={() => handleFilterChange('departments', 'riskAuditCompliance')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Risk, Audit & Compliance</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.itSystems}
                                                onChange={() => handleFilterChange('departments', 'itSystems')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">IT & Systems</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.transactionProcessingBackOffice}
                                                onChange={() => handleFilterChange('departments', 'transactionProcessingBackOffice')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Transaction Processing & Back Office</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.internationalBanking}
                                                onChange={() => handleFilterChange('departments', 'internationalBanking')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">International Banking</span>
                                        </label>
                                        <label className="flex items-center border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filterOptions.departments.accountManagement}
                                                onChange={() => handleFilterChange('departments', 'accountManagement')}
                                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                                            />
                                            <span className="ml-2 text-xs text-gray-700">Account Management</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-between items-center p-4 border-t border-gray-200">
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={applyFilters}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Show results
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Overview;
