import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/SideBar.jsx";
import TopNavigation from "./components/TopNavigation.jsx";

const MainDashboard = ({ user, onLogout, onNavigate }) => {
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
        {/* Sidebar (fixed positioned) */}
        <Sidebar user={user} onLogout={onLogout} onSidebarToggle={handleSidebarToggle} />

        {/* Main Content Area (with dynamic left margin based on sidebar state) */}
        <div className={`flex-1 p-6 transition-all duration-300 ease-in-out overflow-hidden ${
            sidebarCollapsed ? "ml-24" : "ml-72"
        }`}>
        
            {/* Top Navigation Bar */}
            <TopNavigation 
                user={user} 
                onLogout={onLogout} 
                onSearchClick={openSearchModal} 
            />

            {/* Banking Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[calc(100vh-140px)] overflow-y-auto">
                {/* GCB MTO Products */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/gcb-logo.png" 
                                alt="GCB" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-yellow-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                GCB
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>GCB MTO Products</h3>
                    <p className="text-xs text-gray-600">
                        Manage and track GCB MTO products seamlessly within the banking system. 
                        GCB your bank for life.
                    </p>
                </div>

                {/* Unity Link(OTC) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/unity-link-logo.svg" 
                                alt="Unity Link" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-blue-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                UL
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>Unity Link(OTC)</h3>
                    <p className="text-xs text-gray-600">
                        Seamless Unity transactions, OTC Direct to Account, and Wallet transfers 
                        all in one place.
                    </p>
                </div>

                {/* RIA(OTC & Direct to Account) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/ria-logo.svg" 
                                alt="RIA" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-purple-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                Ria
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>RIA(OTC & Direct to Account)</h3>
                    <p className="text-xs text-gray-600">
                        Manage and track GCB MTO products seamlessly within the banking system. 
                        GCB your bank for life.
                    </p>
                </div>

                {/* Western Union(OTC) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/western-union-logo.svg" 
                                alt="Western Union" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-yellow-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                WU
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>Western Union(OTC)</h3>
                    <p className="text-xs text-gray-600">
                        Manage and track GCB MTO products seamlessly within the banking system. 
                        GCB your bank for life.
                    </p>
                </div>

                {/* REMIT on EAGLE PAY */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/eagle-pay-logo.svg" 
                                alt="Eagle Pay" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-blue-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                EP
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>REMIT on EAGLE PAY</h3>
                    <p className="text-xs text-gray-600">
                        Manage your money and money exchange eagle pay.
                    </p>
                </div>

                {/* A.O.B */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/aob-logo.svg" 
                                alt="A.O.B" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-orange-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                AOB
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>A.O.B</h3>
                    <p className="text-xs text-gray-600">
                        Manage and track GCB MTO products seamlessly within the banking system. 
                        GCB your bank for life.
                    </p>
                </div>

                {/* MoneyGram(OTC) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/moneygram-logo.svg" 
                                alt="MoneyGram" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-red-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                MG
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>MoneyGram(OTC)</h3>
                    <p className="text-xs text-gray-600">
                        Manage and track GCB MTO products seamlessly within the banking 
                        system for your money transfers.
                    </p>
                </div>

                {/* Transfast(OTC & Other Banks) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-fit">
                    <div className="flex justify-end mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <img 
                                src="/assets/logos/transfast-logo.svg" 
                                alt="Transfast" 
                                className="w-6 h-6 object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <span 
                                className="text-green-600 font-bold text-sm" 
                                style={{ display: 'none' }}
                            >
                                TF
                            </span>
                        </div>
                    </div>
                    <h3 className="text-base font-semibold mb-2" style={{ color: '#005B96' }}>Transfast(OTC & Other Banks)</h3>
                    <p className="text-xs text-gray-600">
                        Manage and track GCB MTO products seamlessly within the banking 
                        system and other banks.
                    </p>
                </div>
            </div>

            {/* Floating Navigation Dots - Right Side */}
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
                <div className="flex flex-col space-y-4">
                    <button
                        onClick={() => handleNavigationClick('dashboard')}
                        className="w-3 h-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-lg ring-2 ring-blue-300"
                        title="Dashboard"
                    ></button>
                    <button
                        onClick={() => handleNavigationClick('overview')}
                        className="w-3 h-3 bg-green-500 hover:bg-green-600 rounded-full transition-colors shadow-lg"
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

export default MainDashboard;