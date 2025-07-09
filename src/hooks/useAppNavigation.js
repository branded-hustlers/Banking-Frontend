import { useState } from 'react';

export const useAppNavigation = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState(null);

    const navigateToPage = (page) => {
        setCurrentPage(page);
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentPage('dashboard');
        console.log('User logged in:', userData);
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('home');
    };

    const handleNavigate = (page) => {
        const pageMap = {
            'dashboard': 'dashboard',
            'overview': 'overview',
            'reports': 'reports'
        };
        
        if (pageMap[page]) {
            setCurrentPage(pageMap[page]);
        }
    };

    return {
        currentPage,
        user,
        navigateToPage,
        handleLogin,
        handleLogout,
        handleNavigate
    };
};
