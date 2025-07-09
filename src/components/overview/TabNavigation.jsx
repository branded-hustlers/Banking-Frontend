import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'users', label: 'Users' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{
                            backgroundColor: activeTab === tab.id ? '#EFF8FF' : 'transparent',
                            color: activeTab === tab.id ? '#005B96' : '#6B7280'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation;
