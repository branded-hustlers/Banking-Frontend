import React, { useState } from "react";
import Login from "./Login.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import ForgotPasswordByUserId from "./ForgotPasswordByUserId.jsx";
import MainDashboard from "./MainDashboard.jsx";
import Overview from "./Overview.jsx";

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [user, setUser] = useState(null);

    const navigateToPage = (page) => {
        setCurrentPage(page);
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentPage('dashboard'); // Will create dashboard later
        console.log('User logged in:', userData);
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('home');
    };

    const handleNavigate = (page) => {
        if (page === 'dashboard') {
            setCurrentPage('dashboard');
        } else if (page === 'overview') {
            setCurrentPage('overview');
        } else if (page === 'reports') {
            setCurrentPage('reports');
        }
    };

    // Render Login Page
    if (currentPage === 'login') {
        return (
            <Login 
                onLogin={handleLogin}
                onBackToHome={() => navigateToPage('home')}
                onForgotPassword={() => navigateToPage('forgotPassword')}
            />
        );
    }

    // Render Forgot Password Page
    if (currentPage === 'forgotPassword') {
        return (
            <ForgotPassword 
                onBackToLogin={() => navigateToPage('login')}
                onBackToHome={() => navigateToPage('home')}
                onTryAnotherWay={() => navigateToPage('forgotPasswordByUserId')}
            />
        );
    }

    // Render Forgot Password By User ID Page
    if (currentPage === 'forgotPasswordByUserId') {
        return (
            <ForgotPasswordByUserId 
                onBackToLogin={() => navigateToPage('login')}
                onBackToHome={() => navigateToPage('home')}
                onBackToEmailReset={() => navigateToPage('forgotPassword')}
            />
        );
    }

    // Render Main Dashboard Page
    if (currentPage === 'dashboard') {
        return (
            <MainDashboard 
                user={user}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
            />
        );
    }

    // Render Overview Page
    if (currentPage === 'overview') {
        return (
            <Overview 
                user={user}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
            />
        );
    }

    // Render Home Page
    return (
        <div className="p-8 max-w-4xl mx-auto leading-relaxed bg-white min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome To NTech Banking Software</h1>
        <p className="text-gray-700 mb-6">
            Welcome to NTech Banking Software,
            a modernized, next-generation banking system designed to provide you with a seamless,
            secure, and efficient banking experience. Whether you're an individual managing your finances, 
            a business handling transactions, or a financial institution looking for advanced banking tools, 
            our platform has everything you need.
        </p>

        <p className="text-gray-700 mb-6">
            Built with the latest technology. NTech Banking Software offers real-time transactions, 
            intelligent security features, and an intuitive interface that makes banking simple. 
            Our system is accessible across web and mobile platforms, ensuring that you can bank anytime, 
            anywhere, without hassle.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Navigating the System</h3>
        <p className="text-gray-700 mb-6">
            When you log in, you'll be welcomed by an easy-to-use dashboard 
            that gives you quick access to all essential banking services. 
            Below is a breakdown of the key sections within the system:
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Dashboard</h4>
        <p className="text-gray-700 mb-4">
            Your personalized dashboard provides a comprehensive overview of your financial activities.
            Here, you can:
            <ul className="list-disc ml-6 mt-2">
            <li>View your account balances and recent transactions at a glance.</li>
            <li>Receive important alerts and notifications regarding payments, security updates, and offers.</li>
            <li>Access quick-action buttons for fund transfers, bill payments and account management.</li>
            </ul>
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Account Management</h4>
        <p className="text-gray-700 mb-4">
            This section allows you to manage all your bank accounts in one place:
            <ul className="list-disc ml-6 mt-2">
            <li>Open and manage savings, current, and business accounts.</li>
            <li>Track loan applications, credit card usage and investment portfolios.</li>
            <li>Set up automated deposits and withdrawals for better financial planning.</li>
            </ul>
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Payments and Transfer</h4>
        <p className="text-gray-700 mb-4">
            Our payments module is designed for speed and flexibility:
            <ul className="list-disc ml-6 mt-2">
            <li>Local and International Transfers - Send money instantly to bank accounts worldwide.</li>
            <li>Bill Payments - Pay utilities, subscriptions and bills directly from your account.</li>
            <li>Scheduled & Recurring Payments - Set up automated payments to avoid late fees.</li>
            <li>Mobile & QR Payments - Use your smartphone for seamless transactions at partnered merchants.</li>
            </ul>
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Loans & Credit Services</h4>
        <p className="text-gray-700 mb-4">
            Need financial assistance? Our platforms make it easy to apply for and manage credit options:
            <ul className="list-disc ml-6 mt-2">
            <li>Loan Applications - Apply for personal, business or mortgage loans with quick approvals.</li>
            <li>Credit Management - Track outstanding balances and repayment schedules.</li>
            <li>Credit Score Insights - Get reports on your financial health and creditworthiness.</li>
            </ul>
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Report Generation</h4>
        <p className="text-gray-700 mb-4">
            For those who need detailed financial insights, we provide:
            <ul className="list-disc ml-6 mt-2">
            <li>Monthly and yearly account statements for easy record-keeping.</li>
            <li>Spending analytics that help you manage expenses effectively.</li>
            <li>Downloadable reports for tax filing and business financial tracking.</li>
            </ul>
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">How It Works</h3>
        <p className="text-gray-700 mb-6">
            Our banking system is designed with simplicity and security in mind. 
            Here's what makes it stand out:
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Real-Time Banking</h4>
        <p className="text-gray-700 mb-4">
            Transactions are processed instantly, ensuring that your money moves when you need it to. Say goodbye to long processing times-our system ensures real-time updates across accounts.
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Al-Driven Security</h4>
        <p className="text-gray-700 mb-4">
            Security is our top priority. 
            We use advanced fraud detection, multi-factor authentication (MFA), and biometric verification to protect your account from unauthorized access. 
            Every transaction is monitored to detect suspicious activity.
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- Cross-Platform Access</h4>
        <p className="text-gray-700 mb-4">
            Access your bank account seamlessly on multiple devices. 
            Our web-based and mobile-friendly interface ensures a consistent and user-friendly experience across all platforms.
        </p>

        <h4 className="text-xl font-semibold text-gray-700 mt-6 mb-2">-- API Integrations</h4>
        <p className="text-gray-700 mb-4">
            For businesses and financial institutions, our system supports third-party integrations via APIs. 
            Connect with payment gateways, accounting software, and fintech services effortlessly.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Need More Information? Explore Our Documentation</h3>
        <p className="text-gray-700 mb-4">For a more in-depth guide on using specific features, refer to the following resources:
            <ul className="list-disc ml-6 mt-2">
            <li><a href="#" onClick={() => navigateToPage('info')} className="text-blue-600 text-sm hover:underline">User Guide</a> -- Step-by-step instructions on how to navigate the system, manage accounts, and perform transactions.</li>
            <li><a href="#" onClick={() => navigateToPage('info')} className="text-blue-600 text-sm hover:underline">Security & Compliance</a> --  Detailed information on our security policies and compliance with banking regulations.</li>
            <li><a href="#" onClick={() => navigateToPage('info')} className="text-blue-600 text-sm hover:underline">API Documentation</a> -- Technical guide for developers integrating third-party applications with our banking system.</li>
            <li><a href="#" onClick={() => navigateToPage('info')} className="text-blue-600 text-sm hover:underline">FAQs & Support</a> -- Answers to common questions and troubleshooting assistance.</li>
            <li><a href="#" onClick={() => navigateToPage('info')} className="text-blue-600 text-sm hover:underline">Terms & Conditions</a> -- Legal guidelines for using our banking platform.</li>
            </ul>
        </p>
        <p className="text-gray-700 mb-8">If you have any questions or need further assistance, visit our Help Center or contact our Customer Support Team for immediate assistance.</p>

        <div className="text-right mb-8">
            <button 
            onClick={() => navigateToPage('login')} 
            className="bg-blue-600 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition-colors duration-200"
            >
            Get Started
            </button>
        </div>
        </div>
    );
}