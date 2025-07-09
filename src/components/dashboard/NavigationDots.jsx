import React from 'react';

const NavigationDots = ({ onNavigationClick }) => {
    const navigationItems = [
        { id: 'dashboard', color: 'blue', title: 'Dashboard', ring: true },
        { id: 'overview', color: 'green', title: 'Overview' },
        { id: 'reports', color: 'purple', title: 'Reports' }
    ];

    return (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
            <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigationClick(item.id)}
                        className={`w-3 h-3 bg-${item.color}-500 hover:bg-${item.color}-600 rounded-full transition-colors shadow-lg ${
                            item.ring ? `ring-2 ring-${item.color}-300` : ''
                        }`}
                        title={item.title}
                        aria-label={`Navigate to ${item.title}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default NavigationDots;
