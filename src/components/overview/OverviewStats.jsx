import React from 'react';

const OverviewStats = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '2,847',
            change: '+12%',
            changeType: 'positive',
            icon: '👥'
        },
        {
            title: 'Active Sessions',
            value: '1,234',
            change: '+5%',
            changeType: 'positive',
            icon: '🟢'
        },
        {
            title: 'New Registrations',
            value: '89',
            change: '+23%',
            changeType: 'positive',
            icon: '📈'
        },
        {
            title: 'System Health',
            value: '99.9%',
            change: '+0.1%',
            changeType: 'positive',
            icon: '⚡'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl">{stat.icon}</div>
                        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                            stat.changeType === 'positive' 
                                ? 'text-green-600 bg-green-100' 
                                : 'text-red-600 bg-red-100'
                        }`}>
                            {stat.change}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OverviewStats;
