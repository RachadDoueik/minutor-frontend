import '../../css/AdminHeader.css';

const AdminHeader = ({ activeTab, toggleSidebar }) => {
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
                <div className="admin-header-title">
                    <h1>{getPageTitle()}</h1>
                    <p>{getPageDescription()}</p>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
