import '../../css/AdminHeader.css';
import { HiMenuAlt3 } from 'react-icons/hi';

const AdminHeader = ({ activeTab, toggleSidebar, toggleMobileMenu, mobileMenuOpen }) => {
    const getPageTitle = () => {
        switch (activeTab) {
            case 'dashboard':
                return 'Dashboard';
            case 'users':
                return 'User Management';
            case 'meetings':
                return 'Meeting Management';
            case 'settings':
                return 'System Settings';
            default:
                return 'Dashboard';
        }
    };

    const getPageDescription = () => {
        switch (activeTab) {
            case 'dashboard':
                return 'Overview of system activity and statistics';
            case 'users':
                return 'Manage users, roles, and permissions';
            case 'meetings':
                return 'View and manage all meetings';
            case 'settings':
                return 'Configure system settings and preferences';
            default:
                return 'Overview of system activity and statistics';
        }
    };

    return (
        <header className="admin-header">
            <div className="admin-header-left">
                <button 
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <HiMenuAlt3 />
                </button>
                <div className="admin-header-title">
                    <h1>{getPageTitle()}</h1>
                    <p>{getPageDescription()}</p>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
