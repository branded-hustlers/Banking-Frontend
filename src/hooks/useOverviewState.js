import { useState } from 'react';

export const useOverviewState = () => {
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
            operationsBackOffice: false,
            informationTechnology: false,
            complianceAndRisk: false,
            humanResources: false,
            financeAndAccounting: false,
            marketingAndBusinessDevelopment: false,
            legalAndDocumentation: false,
            auditAndInternalControl: false
        }
    });

    const handleFilterSelect = (filter) => {
        setSelectedUsersFilter(filter);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSortToggle = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    };

    const handleFilterModalToggle = () => {
        setFilterModalOpen(!filterModalOpen);
    };

    const handleRowsPerPageChange = (rows) => {
        setRowsPerPage(rows);
    };

    const handleFilterOptionChange = (category, option) => {
        setFilterOptions(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [option]: !prev[category][option]
            }
        }));
    };

    return {
        activeTab,
        setActiveTab,
        sortDropdownOpen,
        setSortDropdownOpen,
        filterModalOpen,
        setFilterModalOpen,
        selectedUsersFilter,
        setSelectedUsersFilter,
        rowsPerPage,
        setRowsPerPage,
        filterOptions,
        setFilterOptions,
        handleFilterSelect,
        handleTabChange,
        handleSortToggle,
        handleFilterModalToggle,
        handleRowsPerPageChange,
        handleFilterOptionChange
    };
};
